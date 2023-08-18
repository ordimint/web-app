import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import { BIP32Factory } from 'bip32';
import { Buffer } from 'buffer';
const ECPair = ECPairFactory(ecc);
const bip39 = require('bip39');
const bip32 = BIP32Factory(ecc);
bitcoin.initEccLib(ecc);
import { getAddress } from 'sats-connect'


function toXOnly(key) {
    return key.length === 33 ? key.slice(1, 33) : key;
}

// Module-level variables to store the address and public key
let address = null;
let publicKey = null;



export async function connectHiro(testnet) {

    const addr = await window.btc?.request('getAddresses',
        testnet ? 'Testnet' : 'Mainnet',
    );
    console.log('addr', addr);

    // Find the p2tr address in the addresses array
    const p2trAddress = addr?.result?.addresses?.find(address => address.type === 'p2tr');

    console.log('p2trAddress', p2trAddress);
    if (p2trAddress && p2trAddress.address) {
        address = p2trAddress.address;
        publicKey = p2trAddress.publicKey;
    }
}

export const getHiroPubkey = async () => {
    if (!publicKey) {
        throw new Error("Public key not set. Make sure you've connected to Hiro.");
    }
    return publicKey;
};

export const getAddressInfoHiro = async () => {
    if (!address) {
        throw new Error("Address not set. Make sure you've connected to Hiro.");
    }
    return address;
};
