import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Alert, Spinner } from 'react-bootstrap';
import * as bitcoin from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1'
import ECPairFactory from 'ecpair';
import { IoIosCopy } from "react-icons/io";
import UtxoModal from './modals/UtxoModal';
import { BsBoxArrowInDownLeft } from "react-icons/bs"
import UtxoInfo from './UtxoInfo';
import ReceiveAddressModal from './modals/ReceiveAddressModal';
import ConfirmationModal from './modals/ConfirmationModal';
import SelectFeeRateModal from './modals/SelectFeeRateModal';
import SentModal from './modals/SentModal';
import BeginSendModal from './modals/BeginSendModal';
import axios from 'axios';
import { TESTNET, DEFAULT_FEE_RATE, INSCRIPTION_SEARCH_DEPTH, SENDS_ENABLED } from './WalletConfig/constance';


const ECPair = ECPairFactory(ecc);
const bip39 = require('bip39');
const { BIP32Factory } = require('bip32')
const bip32 = BIP32Factory(ecc)


bitcoin.initEccLib(ecc)



const OrdimintWallet = () => {
    const [ordimintPubkey, setOrdimintPubkey] = useState(null);
    const [privateKey, setPrivateKey] = useState(null);
    const [address, setAddress] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [seedPhrase, setSeedPhrase] = useState('');

    const handleShowModal = () => setShowModal(true);
    const [seedDownloaded, setSeedDownloaded] = React.useState(false);
    const [showReceiveAddressModal, setShowReceiveAddressModal] = useState(false);
    const [ownedUtxos, setOwnedUtxos] = useState([]);
    const [utxosReady, setUtxosReady] = useState(false)
    const [inscriptionUtxosByUtxo, setInscriptionUtxosByUtxo] = useState({})
    const [currentUtxo, setCurrentUtxo] = useState(null)
    const [showUtxoModal, setShowUtxoModal] = useState(false)
    const [showBeginSendModal, setShowBeginSendModal] = useState(false)
    const [isBtcInputAddressValid, setIsBtcInputAddressValid] = useState(true);
    const [destinationBtcAddress, setDestinationBtcAddress] = useState('')
    const [showSelectFeeRateModal, setShowSelectFeeRateModal] = useState(false)
    const [showConfirmSendModal, setShowConfirmSendModal] = useState(false)
    const [sendFeeRate, setSendFeeRate] = useState(DEFAULT_FEE_RATE)
    const [showSentModal, setShowSentModal] = useState(false)
    const [sentTxid, setSentTxid] = useState(null)

    const [showRestoreWalletModal, setShowRestoreWalletModal] = useState(false);

    const handleRestoreWalletModalClose = () => setShowRestoreWalletModal(false);
    const handleRestoreWalletModalShow = () => setShowRestoreWalletModal(true);


    useEffect(() => {
        async function fetchUtxosForAddress() {
            if (!address) return
            const response = await axios.get(`https://mempool.space/api/address/${address}/utxo`)
            const tempInscriptionsByUtxo = {}
            setOwnedUtxos(response.data)
            for (const utxo of response.data) {
                tempInscriptionsByUtxo[`${utxo.txid}:${utxo.vout}`] = utxo
                // if (!utxo.status.confirmed) continue
                let currentUtxo = utxo
                console.log('utxo', utxo)

                console.log(`Checking utxo ${currentUtxo.txid}:${currentUtxo.vout}`)
                try {
                    const res = await axios.get(`https://explorer.ordimint.com/output/${currentUtxo.txid}:${currentUtxo.vout}`)
                    const inscriptionId = res.data.match(/<a href=\/inscription\/(.*?)>/)?.[1]
                    const [txid, vout] = inscriptionId.split('i')
                    currentUtxo = { txid, vout }
                } catch (err) {
                    console.log(`Error from explorer.ordimint.com: ${err}`)
                }
                tempInscriptionsByUtxo[`${utxo.txid}:${utxo.vout}`] = currentUtxo
                const newInscriptionsByUtxo = {}
                Object.assign(newInscriptionsByUtxo, tempInscriptionsByUtxo)
                setInscriptionUtxosByUtxo(newInscriptionsByUtxo)
                setUtxosReady(true)
            }
            setInscriptionUtxosByUtxo(tempInscriptionsByUtxo)
            setUtxosReady(true)
        }

        fetchUtxosForAddress()
    }, [ordimintPubkey, address]);


    function toXOnly(key) {
        return key.length === 33 ? key.slice(1, 33) : key;
    }

    const generateWallet = () => {
        // const keyPair = ECPair.makeRandom();
        // const newPrivateKey = keyPair.toWIF();
        // setOrdimintPubkey((Buffer.from(keyPair.publicKey, 'hex')).toString('hex'));
        // console.log(`newPrivateKey: ${newPrivateKey}`);
        // console.log(`keyPair.publicKey: ${keyPair.publicKey}`);
        // const pubkeyBuffer = Buffer.from(keyPair.publicKey, 'hex')
        // console.log(`pubkeyBuffer: ${pubkeyBuffer.toString('hex')}`);

        // const newAddress = bitcoin.payments.p2tr({ pubkey: toXOnly(Buffer.from(keyPair.publicKey, 'hex')) }).address;
        // setPrivateKey(newPrivateKey);
        // setAddress(newAddress);

        // const seed = crypto.getRandomValues(new Uint8Array(16));
        // const mnemonic = bip39.entropyToMnemonic(Buffer.from(seed).toString('hex'));
        // setSeedPhrase(mnemonic);
        // handleShowModal();
        // alert(`Address: ${newAddress}\nPrivate Key: ${newPrivateKey}`);
        const entropy = crypto.getRandomValues(new Uint8Array(16));
        const mnemonic = bip39.entropyToMnemonic(Buffer.from(entropy).toString('hex'));
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const root = bip32.fromSeed(seed);
        const path = "m/86'/0'/0'/0/0"; // You can change the path if necessary
        const keyPair = root.derivePath(path);
        const newPrivateKey = keyPair.toWIF();

        setOrdimintPubkey((Buffer.from(keyPair.publicKey, 'hex')).toString('hex'));
        // console.log(`newPrivateKey: ${newPrivateKey}`);
        // console.log(`keyPair.publicKey: ${keyPair.publicKey}`);
        const pubkeyBuffer = Buffer.from(keyPair.publicKey, 'hex');
        // console.log(`pubkeyBuffer: ${pubkeyBuffer.toString('hex')}`);

        const newAddress = bitcoin.payments.p2tr({ pubkey: toXOnly(Buffer.from(keyPair.publicKey, 'hex')) }).address;
        setPrivateKey(newPrivateKey);
        setAddress(newAddress);

        setSeedPhrase(mnemonic);
        handleShowModal();
        // alert(`Address: ${newAddress}\nPrivate Key: ${newPrivateKey}`);
    };

    const downloadPrivateKey = () => {
        if (!privateKey) {
            alert('Please generate a wallet first!');
            return;
        }

        const fileContent = `Ordimint-Key: ${privateKey}\n`;
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ordimint-wallet.txt';
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setSeedDownloaded(true);
        }, 100);
    };

    const handleCloseAndDownload = () => {
        if (!seedDownloaded) {
            downloadPrivateKey();
            setShowModal(false);
        }
        else {
            setShowModal(false);
        }
    };



    const copySeedPhrase = async () => {
        if (!seedPhrase) {
            alert('Please generate a wallet first!');
            return;
        }
        try {
            await navigator.clipboard.writeText(seedPhrase);
            alert('Seed phrase copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy seed phrase: ', err);
            alert('Failed to copy seed phrase. Please try again.');
        }
    };

    const restoreWallet = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const privateKeyContent = e.target.result;
            const privateKeyMatch = privateKeyContent.match(/Ordimint-Key: (\S+)/);

            if (!privateKeyMatch || !privateKeyMatch[1]) {
                alert('Invalid private key file');
                return;
            }

            try {
                const restoredPrivateKey = privateKeyMatch[1].trim();
                const restoredKeyPair = ECPair.fromWIF(restoredPrivateKey);
                console.log(`restoredKeyPair.publicKey: ${restoredKeyPair.publicKey}`);
                const restoredAddress = bitcoin.payments.p2tr({ pubkey: toXOnly(Buffer.from(restoredKeyPair.publicKey, 'hex')) }).address;
                setOrdimintPubkey((Buffer.from(restoredKeyPair.publicKey, 'hex')).toString('hex'));
                setAddress(restoredAddress);
                setPrivateKey(restoredPrivateKey);
                handleRestoreWalletModalClose();
            } catch (err) {
                alert('Error restoring wallet: ' + err.message);
            }
        };



        reader.readAsText(file);
    };

    return (


        <div className="container mt-5">
            <Container className="main-container d-flex flex-column text-center align-items-center justify-content-center">
                {
                    address ?
                        <div>
                            <Button variant="primary" size="lg" className="mx-3 shadowed-orange-small"
                                onClick={async () =>
                                    setShowReceiveAddressModal(true)}>
                                Receive<BsBoxArrowInDownLeft />
                            </Button>
                        </div>
                        :
                        <>
                            <div>
                                <Alert variant="light">
                                    Seems like you have no wallet yet. Please generate one.<br />
                                </Alert>
                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" onClick={generateWallet}>Generate Wallet</Button>
                                    <Button variant="secondary" onClick={handleRestoreWalletModalShow}>Restore Wallet</Button>
                                </div>

                            </div>
                        </>
                }
                <br /><br />
                {address &&
                    <div>
                        <UtxoInfo
                            utxosReady={utxosReady}
                            ownedUtxos={ownedUtxos}
                            setShowUtxoModal={setShowUtxoModal}
                            setCurrentUtxo={setCurrentUtxo}
                            inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
                        />
                    </div>}
            </Container>


            <Modal show={showRestoreWalletModal} onHide={handleRestoreWalletModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Restore Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <input
                            type="file"
                            className="d-none"
                            id="restoreWalletFile"
                            accept=".txt"
                            onChange={restoreWallet}
                        />
                        <Button variant="primary" size="lg" onClick={() => document.getElementById('restoreWalletFile').click()}>
                            Choose Private Key File
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleRestoreWalletModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>Wallet Backup</Modal.Title>
                    {/* Comment out the close button */}
                    {/* <Button variant="close" onClick={handleCloseModal}>
            &times;
          </Button> */}
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p>Here's your seed phrase:</p>

                    </div>
                    <pre className="seed-phrase-ordimint-wallet">{seedPhrase}
                        <Button variant="link" onClick={copySeedPhrase}>
                            <IoIosCopy color="white" />
                        </Button>
                    </pre>
                    <p>
                        <strong>Important:</strong> Store this seed phrase safely! It is the
                        only way to recover your wallet if you lose your private key.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={downloadPrivateKey}>
                        Download Seed Phrase
                    </Button>
                    {/* Change the onClick prop to handleCloseAndDownload */}
                    <Button variant="primary" onClick={handleCloseAndDownload}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <ReceiveAddressModal
                showReceiveAddressModal={showReceiveAddressModal}
                setShowReceiveAddressModal={setShowReceiveAddressModal}
                ordimintAddress={address}

            />
            <UtxoModal
                setShowBeginSendModal={setShowBeginSendModal}
                setShowUtxoModal={setShowUtxoModal}
                showUtxoModal={showUtxoModal}
                currentUtxo={currentUtxo}
                SENDS_ENABLED={SENDS_ENABLED}
                inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
            />
            <BeginSendModal
                showBeginSendModal={showBeginSendModal}
                setShowBeginSendModal={setShowBeginSendModal}
                currentUtxo={currentUtxo}
                setIsBtcInputAddressValid={setIsBtcInputAddressValid}
                setDestinationBtcAddress={setDestinationBtcAddress}
                setShowSelectFeeRateModal={setShowSelectFeeRateModal}
                isBtcInputAddressValid={isBtcInputAddressValid}
                TESTNET={TESTNET}
                setShowUtxoModal={setShowUtxoModal}
                inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
            />
            <SelectFeeRateModal
                showSelectFeeRateModal={showSelectFeeRateModal}
                setShowSelectFeeRateModal={setShowSelectFeeRateModal}
                currentUtxo={currentUtxo}
                sendFeeRate={sendFeeRate}
                setSendFeeRate={setSendFeeRate}
                setShowBeginSendModal={setShowBeginSendModal}
                setShowConfirmSendModal={setShowConfirmSendModal}
                inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
            />
            <ConfirmationModal
                setShowConfirmSendModal={setShowConfirmSendModal}
                showConfirmSendModal={showConfirmSendModal}
                setShowSelectFeeRateModal={setShowSelectFeeRateModal}
                setShowSentModal={setShowSentModal}
                sendFeeRate={sendFeeRate}
                currentUtxo={currentUtxo}
                ordimintPubkey={ordimintPubkey}
                privateKey={privateKey}
                destinationBtcAddress={destinationBtcAddress}
                setSentTxid={setSentTxid}
                inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
            />
            <SentModal
                showSentModal={showSentModal}
                setShowSentModal={setShowSentModal}
                sentTxid={sentTxid}
            />
        </div>
    );
};

export default OrdimintWallet;


