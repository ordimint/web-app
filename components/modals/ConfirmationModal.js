import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import UtxoImage from '../UtxoImage';
import Container from 'react-bootstrap/esm/Container';
import { serializeTaprootSignature } from "bitcoinjs-lib/src/psbt/bip371.js";
import { outputValue, getAddressInfoNostr } from '../WalletConfig/utils';
import { signTransaction } from 'sats-connect';
import * as bitcoin from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1'
import { getAddressInfoLedger, signLedger } from '../WalletConfig/connectLedger';
import ECPairFactory from 'ecpair';

import { getInscriptionData, getInscriptionID } from '../../public/functions/ordinalFunctions';
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
  unisatPublicKey,
  xversePublicKey,
  hiroPublicKey,
  address,
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
    var inputAddressInfo, publicKey, sig, txHex, fullTx, hex, sighashType;

    if (nostrPublicKey) {
      inputAddressInfo = getAddressInfoNostr(nostrPublicKey, testnet)
      console.log("inputAddressInfo nostr", inputAddressInfo)
    }

    if (ledgerPublicKey) {
      inputAddressInfo = await getAddressInfoLedger(ledgerPublicKey, false, testnet)
      txHex = await axios.get(`https://${testnet ? 'mempool.space/testnet' : 'mempool.space'}/api/tx/${currentUtxo.txid}/hex`);
    }

    if (ordimintPubkey) {
      inputAddressInfo = await bitcoin.payments.p2tr({ pubkey: toXOnly(Buffer.from(ordimintPubkey, 'hex')), network: testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin })
      console.log("Adress Info Ordimint Address info", inputAddressInfo)
    }
    if (unisatPublicKey) {
      inputAddressInfo = await bitcoin.payments.p2tr({ internalPubkey: toXOnly(Buffer.from(unisatPublicKey, 'hex')), network: testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin })
      console.log("Adress Info Unisat Address info", inputAddressInfo)
    }

    if (xversePublicKey) {
      inputAddressInfo = await bitcoin.payments.p2tr({ internalPubkey: toXOnly(Buffer.from(xversePublicKey, 'hex')), network: testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin })
      console.log("Adress Info Xverse Address info", inputAddressInfo)
    }
    if (hiroPublicKey) {
      inputAddressInfo = await bitcoin.payments.p2tr({ internalPubkey: toXOnly(Buffer.from(hiroPublicKey, 'hex')), network: testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin })
      console.log("Adress Info Hiro Address info", inputAddressInfo)
    }

    const psbt = new bitcoin.Psbt({ network: testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin })

    if (nostrPublicKey) {
      sighashType = bitcoin.Transaction.SIGHASH_ALL
      publicKey = Buffer.from(await window.nostr.getPublicKey(), 'hex')
      console.log("Public Key Nostr:", publicKey);
    }

    if (ledgerPublicKey) {
      sighashType = bitcoin.Transaction.SIGHASH_ALL
      const pubkeyBuffer = Buffer.from(ledgerPublicKey, 'hex')
      const pubkey = ECPair.fromPublicKey(pubkeyBuffer)
      publicKey = Buffer.from(pubkey.publicKey, 'hex').slice(1)
    }

    if (ordimintPubkey) {
      sighashType = bitcoin.Transaction.SIGHASH_ALL
      publicKey = Buffer.from(ordimintPubkey, 'hex');
      console.log("Public Key Ordimint:", publicKey);
    }

    if (unisatPublicKey) {
      sighashType = bitcoin.Transaction.SIGHASH_ALL
      publicKey = Buffer.from(unisatPublicKey, 'hex');
      console.log("Public Key Unisat:", publicKey);
    }

    if (xversePublicKey) {
      sighashType = bitcoin.Transaction.SIGHASH_ALL
      publicKey = Buffer.from(xversePublicKey, 'hex');
      console.log("Public Key Xverse:", publicKey);
    }
    if (hiroPublicKey) {
      sighashType = bitcoin.Transaction.SIGHASH_ALL
      publicKey = Buffer.from(hiroPublicKey, 'hex');
      console.log("Public Key Hiro:", publicKey);
    }

    const inputParams = {
      hash: currentUtxo.txid,
      index: currentUtxo.vout,
      witnessUtxo: {
        value: currentUtxo.value,
        script: inputAddressInfo.output
      },
      tapInternalKey: toXOnly(publicKey),
      sighashType: sighashType,
    };

    psbt.addInput(inputParams)

    psbt.addOutput({
      address: destinationBtcAddress,
      value: outputValue(currentUtxo, sendFeeRate)
    })

    const sigHash = psbt.__CACHE.__TX.hashForWitnessV1(0, [inputAddressInfo.output], [currentUtxo.value], bitcoin.Transaction.SIGHASH_DEFAULT)

    if (nostrPublicKey) {
      console.log("PSBT: Nostr", psbt);
      console.log("SigHash:", sigHash);
      const psbtHex = await psbt.toHex()
      console.log("PSBT Hex:", psbtHex);
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
      console.log("PSBT: Ordimint", psbt);
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

    // if (unisatPublicKey) {
    //   const psbtForUnisat = await psbt.toHex()
    //   console.log("PSBT for Unisat in Hex:", psbtForUnisat);
    //   console.log("PSBT for Unisat:", psbt);
    //   try {

    //     const signedPsbtHex = await window.unisat.signPsbt(psbtForUnisat);
    //     console.log("Signed PSBT Hex:", signedPsbtHex);
    //     const signedPsbt = bitcoin.Psbt.fromHex(signedPsbtHex);
    //     console.log("Signed PSBT:", signedPsbt);
    //     psbt.finalizeAllInputs()
    //     try {
    //       let res = await window.unisat.pushPsbt(signedPsbtHex);
    //       console.log(res)
    //     } catch (e) {
    //       console.log(e);
    //     }

    //     psbt.updateInput(0, {
    //       tapKeySig: serializeTaprootSignature(Buffer.from(signedPsbtHex, 'hex'))
    //     })

    //     const tx = psbt.extractTransaction()
    //     hex = tx.toBuffer().toString('hex')
    //     fullTx = bitcoin.Transaction.fromHex(hex)
    //     const decodedTx = bitcoin.Transaction.fromHex(hex);
    //     console.log("Decoded transaction:", decodedTx);
    //     console.log(hex)


    //     console.log(hex);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }


    if (unisatPublicKey) {
      try {
        console.log("UTXO", currentUtxo)
        const inscriptionID = await getInscriptionData(currentUtxo)
        console.log("Inscription ID:", inscriptionID.id);
        const txid = await window.unisat.sendInscription(destinationBtcAddress, inscriptionID.id, { feeRate: sendFeeRate });
        console.log("Transaction sent with ID", { txid })
      } catch (e) {
        console.log(e);
        alert(e.message);
        return false;
      }
    }

    if (xversePublicKey) {
      const psbtB64 = psbt.toBase64()
      const signPsbtOptions = {
        payload: {
          network: {
            type: testnet ? 'Testnet' : 'Mainnet',
          },
          message: 'Sign Transaction',
          psbtBase64: psbtB64,
          broadcast: true,
          allowedSighash: [bitcoin.Transaction.SIGHASH_ALL],
          inputsToSign: [{
            address: inputAddressInfo.address,
            signingIndexes: [0],
            sigHash: bitcoin.Transaction.SIGHASH_ALL,
          }],
        },
        onFinish: (response) => {
          setSentTxid(response.txId)
        },

        onCancel: () => alert('Canceled'),
      }
      let res; // Declare `res` outside the try-catch block

      try {
        res = await signTransaction(signPsbtOptions);
      } catch (e) {
        console.log(e);
        alert(e.message);
        return false; // Return false if there's an error in the try block
      }

      return res ? true : false; // Return based on the value of `res`
    }

    if (hiroPublicKey) {
      var signingResponse;
      const requestParams = {
        publicKey: hiroPublicKey,
        hex: psbt.toHex(),
        allowedSighash: [bitcoin.Transaction.SIGHASH_ALL],
        signAtIndex: 0,
        broadcast: true,
      };
      try {
        signingResponse = await window.btc.request('signPsbt', requestParams);
        console.log(signingResponse);  // Or process the result as required
      } catch (error) {
        alert("Error signing PSBT:", error);
        return false;
      }


    }

    let result_mempool;
    if (!unisatPublicKey && !xversePublicKey && !hiroPublicKey) {
      result_mempool = await axios.post(`https://${testnet ? 'mempool.space/testnet' : 'mempool.space'}/api/tx`, hex).catch(err => {
        console.log(result_mempool);
        console.error(err);
      });
    }
    if (!result_mempool) return false

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
