import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import { BIP32Factory } from 'bip32';
import { Buffer } from 'buffer';
const ECPair = ECPairFactory(ecc);
const bip39 = require('bip39');
const bip32 = BIP32Factory(ecc);
bitcoin.initEccLib(ecc);



function toXOnly(key) {
    return key.length === 33 ? key.slice(1, 33) : key;
}




export const connectUnisat = async () => {
    let unisat = window.unisat;

    for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 10000 * i));
        unisat = window.unisat;
    }

    if (unisat) {
        const publicKey = await unisat.getPublicKey();
        console.log("publicKey", publicKey)
        return publicKey;
    } else if (!unisat)
        Alert("Unisat not installed", "Please install Unisat to use this feature", "error");
}



export const getUnisatPubkey = async (unisat) => {

    const publicKey = await unisat.getPublicKey();
    console.log("publicKey", publicKey)
    return publicKey;
};

export const getAddressInfoUnisat = async () => {
    let unisat = window.unisat;
    var address;
    try {
        address = await unisat.getAccounts();
        return address[0];
    } catch (err) {
        console.log('Error getting address Info: ' + err.message);
    }

};

