import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Alert, Breadcrumb } from 'react-bootstrap';
// import * as bitcoin from 'bitcoinjs-lib'
// import * as ecc from 'tiny-secp256k1'
// import ECPairFactory from 'ecpair';
// import { IoIosCopy } from "react-icons/io";
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
import { DEFAULT_FEE_RATE, INSCRIPTION_SEARCH_DEPTH, SENDS_ENABLED } from '../../components/WalletConfig/constance';
import { generateWallet, restoreWallet, getOrdimintAddress } from '../../components/WalletConfig/ordimintWalletFunctions';
import Footer from '../../components/Footer';
import { TestnetContext } from '../../contexts/TestnetContext';
import TestnetSwitch from '../../components/TestnetSwitch';
// const ECPair = ECPairFactory(ecc);
// const bip39 = require('bip39');
// const { BIP32Factory } = require('bip32')
// const bip32 = BIP32Factory(ecc)


// bitcoin.initEccLib(ecc)



const OrdimintWallet = () => {
    const { testnet } = React.useContext(TestnetContext);
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

            const addr = await getOrdimintAddress(ordimintPubkey, testnet)
            setAddress(addr)

            const mempoolUrl = testnet ? 'https://mempool.space/testnet/api' : 'https://mempool.space/api';
            const response = await axios.get(`${mempoolUrl}/address/${addr}/utxo`)

            const tempInscriptionsByUtxo = {}
            setOwnedUtxos(response.data)
            for (const utxo of response.data) {
                tempInscriptionsByUtxo[`${utxo.txid}:${utxo.vout}`] = utxo
                // if (!utxo.status.confirmed) continue
                let currentUtxo = utxo
                console.log('utxo', utxo)

                console.log(`Checking utxo ${currentUtxo.txid}:${currentUtxo.vout}`)
                try {
                    const explorerUrl = testnet ? 'https://testnet.ordimint.com' : 'https://explorer.ordimint.com';
                    const res = await axios.get(`${explorerUrl}/output/${currentUtxo.txid}:${currentUtxo.vout}`)
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

    }, [ordimintPubkey, address, testnet]);

    const handleGenerateWallet = async (testnet) => {
        const { newPrivateKey, newAddress, mnemonic, newOrdimintPubkey } = await generateWallet(testnet);
        setPrivateKey(newPrivateKey);
        setAddress(newAddress);
        setSeedPhrase(mnemonic);
        setOrdimintPubkey(newOrdimintPubkey);
        handleGenerateWalletModalShow();
    };

    const handleRestoreWallet = async (event, testnet) => {
        try {
            const { restoredAddress, restoredPubkey, restoredPrivateKey } = await restoreWallet(event, testnet);
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
                <TestnetSwitch />
                <h1 className='m-3'>Ordimint Wallet</h1>
                {
                    address ?
                        <div style={{ zIndex: 5 }}>
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
                                <div id="ordimint-wallet-buttons">
                                    <Button
                                        id="generate-wallet-button"
                                        size='lg'
                                        onClick={() => handleGenerateWallet(testnet)}>
                                        Generate Wallet
                                    </Button>

                                    <Button variant="secondary"
                                        size='lg'
                                        onClick={handleRestoreWalletModalShow}>
                                        Restore Wallet
                                    </Button>


                                    <a href="#" onClick={(e) => {
                                        e.preventDefault(); // Prevents the default action of the link
                                        ShowWalletInfoModal();
                                    }}>
                                        How does it work?
                                    </a>
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
                            testnet={testnet}
                            utxosReady={utxosReady}
                            ownedUtxos={ownedUtxos}
                            setShowUtxoModal={setShowUtxoModal}
                            setCurrentUtxo={setCurrentUtxo}
                            inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
                        />
                    </div>}

            </Container>



            <RestoreWalletModal
                showRestoreWalletModal={showRestoreWalletModal}
                handleRestoreWalletModalClose={handleRestoreWalletModalClose}
                restoreWallet={(e) => handleRestoreWallet(e, testnet)}
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
                testnet={testnet}
                showReceiveAddressModal={showReceiveAddressModal}
                setShowReceiveAddressModal={setShowReceiveAddressModal}
                ordimintAddress={address}

            />
            <UtxoModal
                setShowBeginSendModal={setShowBeginSendModal}
                setShowUtxoModal={setShowUtxoModal}
                showUtxoModal={showUtxoModal}
                currentUtxo={currentUtxo}
                testnet={testnet}
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
                testnet={testnet}
                setShowUtxoModal={setShowUtxoModal}
                inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
            />
            <SelectFeeRateModal
                testnet={testnet}
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
                testnet={testnet}
                ordimintPubkey={ordimintPubkey}
                privateKey={privateKey}
                destinationBtcAddress={destinationBtcAddress}
                setSentTxid={setSentTxid}
                inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
            />
            <SentModal
                testnet={testnet}
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


