import * as bitcoin from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1'

import { ASSUMED_TX_BYTES } from './constance'

bitcoin.initEccLib(ecc)

export const outputValue = (currentUtxo, sendFeeRate) => {
  return currentUtxo.value - sendFeeRate * ASSUMED_TX_BYTES
}

export const ordinalsUrl = (utxo, testnet) => {
  const baseUrl = testnet ? 'https://testnet.ordimint.com' : 'https://explorer.ordimint.com';
  return `${baseUrl}/output/${utxo.txid}:${utxo.vout}`;
}

export const ordinalsImageUrl = (utxo, testnet) => {
  const baseUrl = testnet ? 'https://testnet.ordimint.com' : 'https://explorer.ordimint.com';
  return `${baseUrl}/content/${utxo.txid}i${utxo.vout}`;
}

export const cloudfrontUrl = (utxo) => {
  return `https://d2v3k2do8kym1f.cloudfront.net/minted-items/${utxo.txid}:${utxo.vout}`
}

export const shortenStr = (str) => {
  if (!str) return ""
  return str.substring(0, 8) + "..." + str.substring(str.length - 8, str.length)
}

export const getAddressInfoNostr = (nostrPublicKey, testnet) => {
  const pubkeyBuffer = Buffer.from(nostrPublicKey, 'hex')
  const addrInfo = bitcoin.payments.p2tr({ pubkey: pubkeyBuffer, network: testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin })
  return addrInfo
}

export const connectWallet = async () => {
  if (window.nostr && window.nostr.enable) {
    await window.nostr.enable()
  } else {
    alert("Oops, it looks like you haven't set up your Nostr key yet or you don't have the Alby browser extension. Go to your Alby Account Settings and create or import a Nostr key.")
    return
  }
  return await window.nostr.getPublicKey()
}
