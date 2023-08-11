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

function getAddressOptionsFunc(testnet) {
    return {
        payload: {
            purposes: ['ordinals', 'payment'],
            message: 'Address for receiving Ordinals and payments',
            network: {
                type: testnet ? 'Testnet' : 'Mainnet',
            },
        },
        onFinish: (response) => {
            console.log(response);
            publicKey = response.addresses[0].publicKey;
            address = response.addresses[0].address;
            console.log('address', address);
            console.log('publicKey', publicKey);
        },
        onCancel: () => alert('Request canceled'),
    };
}

export async function connectXverse(testnet) {
    await getAddress(getAddressOptionsFunc(testnet));
}

export const getXversePubkey = async () => {
    if (!publicKey) {
        throw new Error("Public key not set. Make sure you've connected to Xverse.");
    }
    return publicKey;
};

export const getAddressInfoXverse = async () => {
    if (!address) {
        throw new Error("Address not set. Make sure you've connected to Xverse.");
    }
    return address;
};
