import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import { BIP32Factory } from 'bip32';
import { Buffer } from 'buffer';
const ECPair = ECPairFactory(ecc);
const bip39 = require('bip39');
const bip32 = BIP32Factory(ecc);
bitcoin.initEccLib(ecc);

const crypto =
    typeof window !== 'undefined' && window.crypto
        ? window.crypto
        : require('crypto').webcrypto;

function toXOnly(key) {
    return key.length === 33 ? key.slice(1, 33) : key;
}

export const getOrdimintAddress = async (pubkey) => {
    const address = await bitcoin.payments.p2tr({ pubkey: toXOnly(Buffer.from(pubkey, 'hex')) }).address;
    return address;
}

export const generateWallet = async () => {
    const entropy = crypto.getRandomValues(new Uint8Array(16));
    const mnemonic = bip39.entropyToMnemonic(Buffer.from(entropy).toString('hex'));
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed);
    const path = "m/86'/0'/0'";
    const keyPair = root.derivePath(path);
    const newPrivateKey = keyPair.toWIF();
    const newOrdimintPubkey = await (Buffer.from(keyPair.publicKey, 'hex')).toString('hex');
    const newAddress = await bitcoin.payments.p2tr({ pubkey: toXOnly(Buffer.from(keyPair.publicKey, 'hex')) }).address;

    return {
        newOrdimintPubkey,
        newPrivateKey,
        newAddress,
        mnemonic,
    };
};



export const restoreWallet = (event) => {
    return new Promise(async (resolve, reject) => {
        let restoredPrivateKey, restoredKeyPair, restoredAddress, restoredPubkey;
        const file = event.target.files[0];
        if (!file) {
            reject('No file provided');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const privateKeyContent = e.target.result;

            const privateKeyMatch = privateKeyContent.match(/Ordimint-Key: (\S+)/);

            if (!privateKeyMatch || !privateKeyMatch[1]) {
                reject('Invalid private key file');
                return;
            }

            try {
                restoredPrivateKey = privateKeyMatch[1].trim()
                restoredKeyPair = ECPair.fromWIF(restoredPrivateKey)
                restoredAddress = await bitcoin.payments.p2tr({ pubkey: toXOnly(Buffer.from(restoredKeyPair.publicKey, 'hex')) }).address
                restoredPubkey = await Buffer.from(restoredKeyPair.publicKey, 'hex').toString('hex');
                resolve({ restoredPrivateKey, restoredKeyPair, restoredAddress, restoredPubkey });
            } catch (err) {
                reject('Error restoring wallet: ' + err.message);
            }
        };

        reader.readAsText(file);
    });
};



// const restoreWallet = (event) => {
    //     const file = event.target.files[0];
    //     if (!file) {
    //         return;
    //     }

    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         const privateKeyContent = e.target.result;
    //         const privateKeyMatch = privateKeyContent.match(/Ordimint-Key: (\S+)/);

    //         if (!privateKeyMatch || !privateKeyMatch[1]) {
    //             alert('Invalid private key file');
    //             return;
    //         }

    //         try {
    //             const restoredPrivateKey = privateKeyMatch[1].trim();
    //             const restoredKeyPair = ECPair.fromWIF(restoredPrivateKey);
    //             console.log(`restoredKeyPair.publicKey: ${restoredKeyPair.publicKey}`);
    //             const restoredAddress = bitcoin.payments.p2tr({ pubkey: toXOnly(Buffer.from(restoredKeyPair.publicKey, 'hex')) }).address;
    //             setOrdimintPubkey((Buffer.from(restoredKeyPair.publicKey, 'hex')).toString('hex'));
    //             setAddress(restoredAddress);
    //             setPrivateKey(restoredPrivateKey);
    //             handleRestoreWalletModalClose();
    //         } catch (err) {
    //             alert('Error restoring wallet: ' + err.message);
    //         }
    //     };

    //     reader.readAsText(file);
    // };

       // const downloadPrivateKey = () => {
    //     if (!privateKey) {
    //         alert('Please generate a wallet first!');
    //         return;
    //     }

    //     const fileContent = `Ordimint-Key: ${privateKey}\n`;
    //     const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = 'ordimint-wallet.txt';
    //     document.body.appendChild(link);
    //     link.click();

    //     setTimeout(() => {
    //         document.body.removeChild(link);
    //         URL.revokeObjectURL(url);
    //         setSeedDownloaded(true);
    //     }, 100);
    // };

       // const generateWallet = () => {

    //     const entropy = crypto.getRandomValues(new Uint8Array(16));
    //     const mnemonic = bip39.entropyToMnemonic(Buffer.from(entropy).toString('hex'));
    //     const seed = bip39.mnemonicToSeedSync(mnemonic);
    //     const root = bip32.fromSeed(seed);
    //     const path = "m/86'/0'/0'";
    //     const keyPair = root.derivePath(path);
    //     const newPrivateKey = keyPair.toWIF();

    //     setOrdimintPubkey((Buffer.from(keyPair.publicKey, 'hex')).toString('hex'));

    //     const newAddress = bitcoin.payments.p2tr({ pubkey: toXOnly(Buffer.from(keyPair.publicKey, 'hex')) }).address;
    //     setPrivateKey(newPrivateKey);
    //     setAddress(newAddress);

    //     setSeedPhrase(mnemonic);
    //     handleShowModal();
    //     // alert(`Address: ${newAddress}\nPrivate Key: ${newPrivateKey}`);
    // };


