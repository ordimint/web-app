
import { listen } from "@ledgerhq/logs";
import AppBtc from "@ledgerhq/hw-app-btc";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import * as bitcoin from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1'
import * as secp256k1 from "secp256k1";
import ECPairFactory from 'ecpair';

const ECPair = ECPairFactory(ecc);

bitcoin.initEccLib(ecc)

function toXOnly(key) {
    return key.length === 33 ? key.slice(1, 33) : key;
}


export const getLedgerPubkey = async (ledgerVerify) => {

    const transport = await TransportWebUSB.create();
    console.log("Transport created", transport)
    // listen(log => console.log(log))
    try {
        const appBtc = new AppBtc({ transport, currency: "bitcoin" });
        const { publicKey } = await appBtc.getWalletPublicKey(
            "86'/0'/100'/0/0",
            { verify: ledgerVerify, format: "bech32m" }
        );

        const pubkeyBuffer = Buffer.from(publicKey, 'hex')
        const pubkey = ECPair.fromPublicKey(pubkeyBuffer)
        transport.close()
        return pubkey.publicKey.toString('hex')

    } catch (e) {
        console.log(e)
        console.log("Error connecting to Ledger", e.message);
        alert("Error connecting to Ledger", e.message || e)
    }

}


export const getAddressInfoLedger = async (ledgerPublicKey, verify) => {
    if (verify) {
        const transport = await TransportWebUSB.create();
        try {
            const appBtc = new AppBtc({ transport, currency: "bitcoin" });
            await appBtc.getWalletPublicKey(
                "86'/0'/100'/0/0",
                { verify: true, format: "bech32m" }
            );
        } catch (e) {
            console.log(e)
            console.log("Error connecting to Ledger", e.message);
            alert("Error connecting to Ledger", e.message)
        }
        transport.close()
    }
    console.log(`Ledger pub: ${ledgerPublicKey}`)
    const addrInfo = bitcoin.payments.p2tr({ internalPubkey: toXOnly(Buffer.from(ledgerPublicKey, 'hex')) })
    console.log(`addrInfo: ${addrInfo.address}`)

    return addrInfo
}


export const signSchnorrLedger = async (sigHash) => {
    const transport = await TransportWebUSB.create();
    const sigHashBuffer = Buffer.from(sigHash, 'hex')
    console.log("Transport created", transport)
    // listen(log => console.log(log))
    try {
        console.log("Creating appBtc:", sigHashBuffer)
        const appBtc = new AppBtc({ transport, currency: "bitcoin" });
        appBtc.createPaymentTransactionNew(sigHashBuffer)

    } catch (e) {
        console.log(e)
        console.log("Error connecting to Ledger", e.message);
        alert("Error connecting to Ledger", e.message)
    }

    // const signature = await secp256k1.schnorr.sign(
    //     Buffer.from(secp256k1.utils.hexToBytes(sigHash)),
    //     secp256k1.utils.hexToBytes(this.privateKey)
    // );
    // const signedHex = secp256k1.utils.bytesToHex(signature);
    // return signedHex;
}


