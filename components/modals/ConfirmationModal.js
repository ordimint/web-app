import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import UtxoImage from '../UtxoImage';
import Container from 'react-bootstrap/esm/Container';
import { serializeTaprootSignature } from "bitcoinjs-lib/src/psbt/bip371.js";
import { outputValue, getAddressInfoNostr } from '../WalletConfig/utils';

import * as bitcoin from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1'
import { getAddressInfoLedger, signLedger } from '../WalletConfig/connectLedger';

import ECPairFactory from 'ecpair';
const secp256k1 = require('@noble/secp256k1');
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
  inscriptionUtxosByUtxo,
  privateKey,
  testnet,
  ordimintPubkey,
}) {
  function toXOnly(key) {
    if (key.length === 33) {
      return key.slice(1, 33);
    } else if (key.length === 32) {
      return key;
    } else {
      throw new Error('Invalid public key length');
    }
  }


  async function sendUtxo() {
    var inputAddressInfo, publicKey, sig, txHex, fullTx, hex;

    if (nostrPublicKey) {
      inputAddressInfo = getAddressInfoNostr(nostrPublicKey, testnet)
    }

    if (ledgerPublicKey) {
      inputAddressInfo = await getAddressInfoLedger(ledgerPublicKey, false, testnet)
      txHex = await axios.get(`https://${testnet ? 'mempool.space/testnet' : 'mempool.space'}/api/tx/${currentUtxo.txid}/hex`);
      // console.log("inputAddressInfo redeem output", inputAddressInfo)
      // console.log("txHex", txHex)
    }

    if (ordimintPubkey) {
      inputAddressInfo = await bitcoin.payments.p2tr({ pubkey: toXOnly(Buffer.from(ordimintPubkey, 'hex')), network: testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin })
      console.log("Adress Info Ordimint Address info", inputAddressInfo)
    }

    const psbt = new bitcoin.Psbt({ network: testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin })

    if (nostrPublicKey) {
      publicKey = Buffer.from(await window.nostr.getPublicKey(), 'hex')
      console.log("Public Key Nostr:", publicKey);
    }

    if (ledgerPublicKey) {
      const pubkeyBuffer = Buffer.from(ledgerPublicKey, 'hex')
      const pubkey = ECPair.fromPublicKey(pubkeyBuffer)
      publicKey = Buffer.from(pubkey.publicKey, 'hex').slice(1)
    }

    if (ordimintPubkey) {

      publicKey = Buffer.from(ordimintPubkey, 'hex');
      console.log("Public Key Ordimint:", publicKey);
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

    if (nostrPublicKey) {
      sig = await window.nostr.signSchnorr(sigHash.toString('hex'))
      psbt.updateInput(0, {
        tapKeySig: serializeTaprootSignature(Buffer.from(sig, 'hex'))
      })

      psbt.finalizeAllInputs()
      const tx = psbt.extractTransaction()
      hex = tx.toBuffer().toString('hex')
      fullTx = bitcoin.Transaction.fromHex(hex)
      console.log(hex)
    }

    if (ordimintPubkey) {
      sig = await signSchnorrOrdimintWallet(sigHash.toString('hex'), privateKey)
      console.log("Ordimint signature:", sig);
      psbt.updateInput(0, {
        tapKeySig: serializeTaprootSignature(Buffer.from(sig, 'hex'))
      })



      psbt.finalizeAllInputs()
      const tx = psbt.extractTransaction()
      hex = tx.toBuffer().toString('hex')
      fullTx = bitcoin.Transaction.fromHex(hex)

      const decodedTx = bitcoin.Transaction.fromHex(hex);
      console.log("Decoded transaction:", decodedTx);
      console.log(hex)
    }

    if (ledgerPublicKey) {
      const txData = {
        txHex: txHex.data,
        sigHash: sigHash.toString('hex'),
        inputIndex: currentUtxo.vout,
        inputValue: currentUtxo.value,
        redeemScript: inputAddressInfo.output,
      }
      hex = await signLedger(psbt, txData)
      fullTx = bitcoin.Transaction.fromHex(hex)
    }



    const res = await axios.post(`https://${testnet ? 'mempool.space/testnet' : 'mempool.space'}/api/tx`, hex).catch(err => {
      console.error(err);
      return null;
    });

    if (!res) return false

    setSentTxid(fullTx.getId())
    return true
  }

  async function signSchnorrOrdimintWallet(sigHash, privateKey) {
    privateKey = ECPair.fromWIF(privateKey).privateKey.toString('hex')
    const signature = await secp256k1.schnorr.sign(
      Buffer.from(secp256k1.utils.hexToBytes(sigHash)),
      secp256k1.utils.hexToBytes(privateKey)
    );
    const signedHex = secp256k1.utils.bytesToHex(signature);
    return signedHex;
  }

  return (
    <Modal show={showConfirmSendModal} onHide={() => setShowConfirmSendModal(false)} className="py-5">
      <Modal.Header closeButton className="p-4">
        <Modal.Title>Confirm Send</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Container fluid>
          <div className='send-confirmation'>
            <div className='modal-preview-in-utxomodal'>
              {currentUtxo && <UtxoImage utxo={currentUtxo} testnet={testnet} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />}
            </div>
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
            // alert(err)
            return false
          })
          setShowConfirmSendModal(false)
          if (!success) return
          setShowSentModal(true)
        }}>
          {ledgerPublicKey ? 'Confirm on Ledger' : 'Confirm'}

        </Button>
      </Modal.Footer>
    </Modal>
  )
}
