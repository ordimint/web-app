
import { listen } from "@ledgerhq/logs";
import AppBtc from "@ledgerhq/hw-app-btc";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import * as bitcoin from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1'
import * as secp256k1 from "secp256k1";
import ECPairFactory from 'ecpair';
import { TESTNET } from './constance'

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
    const addrInfo = bitcoin.payments.p2tr({ internalPubkey: toXOnly(Buffer.from(ledgerPublicKey, 'hex')), network: TESTNET ? bitcoin.networks.testnet : bitcoin.networks.bitcoin })
    console.log(`addrInfo: ${addrInfo.address}`)

    return addrInfo
}


export const signLedger = async (psbt, txData) => {
    const transport = await TransportWebUSB.create();
    console.log("Transport created", transport)
    listen(log => console.log(log))
    const newTx = psbt.__CACHE.__TX;
    // console.log("newTx", newTx)
    // console.log("PSBT", psbt)
    // console.log("txData", txData)
    const path = "86'/0'/100'/0/0";
    const DEFAULT_LOCK_TIME = 0;
    const utxo = bitcoin.Transaction.fromHex(txData.txHex)
    console.log("utxo", utxo)
    try {
        // console.log("Creating appBtc:")
        // console.log("psbt cache new tx", psbt.__CACHE.__TX)
        const appBtc = new AppBtc({ transport, currency: "bitcoin" });

        const inLedgerTx = await splitTransaction(appBtc, utxo);
        const outLedgerTx = await splitTransaction(appBtc, psbt.__CACHE.__TX);
        const outputScriptHex = await appBtc.serializeTransactionOutputs(outLedgerTx).toString('hex');

        // console.log("outputScriptHex", outputScriptHex)
        // console.log("inLedgerTx", inLedgerTx)
        // console.log("outLedgerTx", outLedgerTx)
        // console.log("redem script", txData.redeemScript.toString('hex'))

        const ledgerTxSignatures = await appBtc.createPaymentTransaction({
            inputs: [[inLedgerTx, txData.inputIndex]],
            associatedKeysets: [path],
            outputScriptHex: outputScriptHex,
            lockTime: DEFAULT_LOCK_TIME,
            segwit: newTx.hasWitnesses(),
            additionals: ["bech32m"],
            transactionVersion: psbt.data.globalMap.unsignedTx.tx.version,
            sigHashType: bitcoin.Transaction.SIGHASH_ALL,
            useTrustedInputForSegwit: true,
        });
        console.log("ledgerTxSignatures", ledgerTxSignatures)
        return ledgerTxSignatures;
    } catch (e) {
        console.log(e)
        console.log(e.message);
        alert("Error connecting to Ledger", e.message)
    }

    function splitTransaction(ledger, tx) {
        return ledger.splitTransaction(tx.toHex(), tx.hasWitnesses());
    }

}




