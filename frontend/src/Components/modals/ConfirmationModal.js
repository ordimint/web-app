import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import UtxoImage from '../UtxoImage';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import { serializeTaprootSignature } from "bitcoinjs-lib/src/psbt/bip371.js";
import { outputValue, getAddressInfoNostr } from '../WalletConfig/utils';
import { TESTNET } from '../WalletConfig/constance';
import * as bitcoin from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1'
import { getAddressInfoLedger, signSchnorrLedger } from '../WalletConfig/connectLedger';

import ECPairFactory from 'ecpair';
const axios = require('axios')
const ECPair = ECPairFactory(ecc);

bitcoin.initEccLib(ecc)

export default function ConfirmationModal({
  showConfirmSendModal,
  setShowConfirmSendModal,
  setShowSelectFeeRateModal,
  setShowSentModal,
  currentUtxo,
  sendFeeRate,
  setSentTxid,
  nostrPublicKey,
  ledgerPublicKey,
  destinationBtcAddress,
  inscriptionUtxosByUtxo
}) {
  function toXOnly(key) {
    return key.length === 33 ? key.slice(1, 33) : key;
  }

  async function sendUtxo() {
    var inputAddressInfo, publicKey, sig;

    if (nostrPublicKey) {
      inputAddressInfo = getAddressInfoNostr(nostrPublicKey)
    } else if (ledgerPublicKey) {
      inputAddressInfo = await getAddressInfoLedger(ledgerPublicKey, false)
    }

    const psbt = new bitcoin.Psbt({ network: TESTNET ? bitcoin.networks.testnet : bitcoin.networks.bitcoin })

    if (nostrPublicKey) {
      publicKey = Buffer.from(await window.nostr.getPublicKey(), 'hex')
    }
    else if (ledgerPublicKey) {
      const pubkeyBuffer = Buffer.from(ledgerPublicKey, 'hex')
      const pubkey = ECPair.fromPublicKey(pubkeyBuffer)
      publicKey = Buffer.from(pubkey.publicKey, 'hex').slice(1)
    }

    const inputParams = {
      hash: currentUtxo.txid,
      index: currentUtxo.vout,
      witnessUtxo: {
        value: currentUtxo.value,
        script: inputAddressInfo.output
      },
      tapInternalKey: toXOnly(publicKey)
    };

    psbt.addInput(inputParams)

    psbt.addOutput({
      address: destinationBtcAddress,
      value: outputValue(currentUtxo, sendFeeRate)
    })

    const sigHash = psbt.__CACHE.__TX.hashForWitnessV1(0, [inputAddressInfo.output], [currentUtxo.value], bitcoin.Transaction.SIGHASH_DEFAULT)

    console.log(sigHash)

    if (nostrPublicKey) {
      sig = await window.nostr.signSchnorr(sigHash.toString('hex'))
    } else if (ledgerPublicKey) {
      sig = await signSchnorrLedger(sigHash)
    }
    psbt.updateInput(0, {
      tapKeySig: serializeTaprootSignature(Buffer.from(sig, 'hex'))
    })
    psbt.finalizeAllInputs()
    const tx = psbt.extractTransaction()
    const hex = tx.toBuffer().toString('hex')
    const fullTx = bitcoin.Transaction.fromHex(hex)
    console.log(hex)
    const res = await axios.post(`https://mempool.space/api/tx`, hex).catch(err => {
      console.error(err)
      alert(err)
      return null
    })
    if (!res) return false

    setSentTxid(fullTx.getId())
    return true
  }

  return (
    <Modal show={showConfirmSendModal} onHide={() => setShowConfirmSendModal(false)} className="py-5">
      <Modal.Header closeButton className="p-4">
        <Modal.Title>Confirm Send</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Container fluid>
          <div className='send-confirmation'>
            {currentUtxo && <UtxoImage utxo={currentUtxo} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />}

            <b>Sending:</b>
            <div className='bitcoin-address'>
              {currentUtxo && `${currentUtxo.txid}:${currentUtxo.vout}`}
            </div>

            <div>
              <b>Fee Rate:</b> {sendFeeRate} sat/vbyte
            </div>

            <b>Destination:</b>
            <div className='bitcoin-address'>
              {destinationBtcAddress}
            </div>

            <div>
              <b>Output Value:</b> {currentUtxo && outputValue(currentUtxo, sendFeeRate)} sats
            </div>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setShowConfirmSendModal(false)
        }}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={() => {
          setShowConfirmSendModal(false)
          setShowSelectFeeRateModal(true)
        }}>
          Back
        </Button>
        <Button variant="primary" onClick={async () => {
          const success = await sendUtxo().catch(err => {
            console.error(err)
            alert(err)
            return false
          })
          setShowConfirmSendModal(false)
          if (!success) return
          setShowSentModal(true)
        }}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
