import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Alert, Breadcrumb } from 'react-bootstrap';
import * as bitcoin from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1'
import ECPairFactory from 'ecpair';
import { IoIosCopy } from "react-icons/io";
import UtxoModal from '../../components/modals/UtxoModal';
import { BsBoxArrowInDownLeft } from "react-icons/bs"
import UtxoInfo from '../../components/UtxoInfo';
import ReceiveAddressModal from '../../components/modals/ReceiveAddressModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import SelectFeeRateModal from '../../components/modals/SelectFeeRateModal';
import SentModal from '../../components/modals/SentModal';
import BeginSendModal from '../../components/modals/BeginSendModal';
import axios from 'axios';
import OrdimintWalletInfo from '../../components/modals/OrdimintWalletInfo';
import GenerateWalletModal from '../../components/modals/GenerateWalletModal';
import RestoreWalletModal from '../../components/modals/RestoreWalletModal';
import { TESTNET, DEFAULT_FEE_RATE, INSCRIPTION_SEARCH_DEPTH, SENDS_ENABLED } from '../../components/WalletConfig/constance';
import { generateWallet, restoreWallet } from '../../components/WalletConfig/ordimintWalletFunctions';
import Footer from '../../components/Footer';

// const ECPair = ECPairFactory(ecc);
// const bip39 = require('bip39');
// const { BIP32Factory } = require('bip32')
// const bip32 = BIP32Factory(ecc)


// bitcoin.initEccLib(ecc)



const OrdimintWallet = () => {
    const [ordimintPubkey, setOrdimintPubkey] = useState(null);
    const [privateKey, setPrivateKey] = useState(null);
    const [address, setAddress] = useState(null);
    const [seedPhrase, setSeedPhrase] = useState('');

    const [showGenerateWalletModal, setShowGenerateWalletModal] = useState(false);
    const closeGenerateWalletModal = () => setShowGenerateWalletModal(false);
    const handleGenerateWalletModalShow = () => setShowGenerateWalletModal(true);


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

    const [showWalletInfoModal, setShowWalletInfoModal] = useState(false);
    const handleWalletInfoModalClose = () => setShowWalletInfoModal(false);
    const ShowWalletInfoModal = () => setShowWalletInfoModal(true);

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

    const handleGenerateWallet = async () => {
        const { newPrivateKey, newAddress, mnemonic, newOrdimintPubkey } = await generateWallet();
        setPrivateKey(newPrivateKey);
        setAddress(newAddress);
        setSeedPhrase(mnemonic);
        setOrdimintPubkey(newOrdimintPubkey);
        handleGenerateWalletModalShow();
    };

    const handleRestoreWallet = async (event) => {
        try {
            const { restoredAddress, restoredPubkey, restoredPrivateKey } = await restoreWallet(event);
            setAddress(restoredAddress);
            setPrivateKey(restoredPrivateKey);
            setOrdimintPubkey(restoredPubkey);

            handleRestoreWalletModalClose();
        } catch (error) {
            console.error('Error:', error);

        }
    };




    return (

        <div className="container mt-5">
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/wallet">Wallets</Breadcrumb.Item>
                    <Breadcrumb.Item active>Ordimint Wallet</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <Container className="main-container d-flex flex-column text-center align-items-center justify-content-center">
                <h1 className='m-3'>Ordimint Wallet</h1>
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
                                    Seems like your wallet is not connected.
                                    <br />
                                    Please generate one or use your wallet backup file.<br />

                                </Alert>
                                <div className="d-flex justify-content-evenly">
                                    <Button variant="primary" onClick={handleGenerateWallet}>Generate Wallet</Button>

                                    <Button variant="secondary" onClick={handleRestoreWalletModalShow}>Restore Wallet</Button>
                                </div>
                                <div className='mt-3'>
                                    <Button variant="secondary" onClick={ShowWalletInfoModal}>How does it work?</Button>
                                </div>
                                <div>

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
                <Footer />
            </Container>



            <RestoreWalletModal
                showRestoreWalletModal={showRestoreWalletModal}
                handleRestoreWalletModalClose={handleRestoreWalletModalClose}
                restoreWallet={(e) => handleRestoreWallet(e)}
            // setOrdimintPubkey={setOrdimintPubkey}
            // setAddress={setAddress}
            // setPrivateKey={setPrivateKey}
            />


            <GenerateWalletModal
                showModal={showGenerateWalletModal}
                closeModal={closeGenerateWalletModal}
                seedPhrase={seedPhrase}
                privateKey={privateKey}
            />

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
            <OrdimintWalletInfo
                handleClose={handleWalletInfoModalClose}
                show={showWalletInfoModal}

            />
        </div>
    );
};

export default OrdimintWallet;


