import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Head from 'next/head';
import { Breadcrumb } from 'react-bootstrap';
import { BsBoxArrowInDownLeft } from "react-icons/bs"
import ReceiveAddressModal from '../../components/modals/ReceiveAddressModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import SelectFeeRateModal from '../../components/modals/SelectFeeRateModal';
import SentModal from '../../components/modals/SentModal';
import Image from 'next/image';
import BeginSendModal from '../../components/modals/BeginSendModal';
import UtxoModal from '../../components/modals/UtxoModal';
import AlbyLogo from '../../public/media/alby_icon_yellow.svg';
import UtxoInfo from '../../components/UtxoInfo';
import { getAddressInfoNostr, connectWallet } from '../../components/WalletConfig/utils';
import { DEFAULT_FEE_RATE, INSCRIPTION_SEARCH_DEPTH, SENDS_ENABLED } from '../../components/WalletConfig/constance';
import { TestnetContext } from '../../contexts/TestnetContext';
import TestnetSwitch from '../../components/TestnetSwitch';


const axios = require('axios')

export default function NostrWallet() {
    const { testnet } = React.useContext(TestnetContext);
    const [nostrPublicKey, setNostrPublicKey] = useState(null);
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
    const [address, setAddress] = useState(null)

    async function fetchUtxosForAddress() {
        if (!nostrPublicKey || !address) return
        const mempoolUrl = testnet ? 'https://mempool.space/testnet/api' : 'https://mempool.space/api';
        const response = await axios.get(`${mempoolUrl}/address/${address}/utxo`)
        const tempInscriptionsByUtxo = {}
        // console.log('response.data', response.data)
        setOwnedUtxos(response.data)
        for (const utxo of response.data) {
            tempInscriptionsByUtxo[`${utxo.txid}:${utxo.vout}`] = utxo
            // if (!utxo.status.confirmed) continue
            let currentUtxo = utxo
            // console.log('utxo', utxo)

            // console.log(`Checking utxo ${currentUtxo.txid}:${currentUtxo.vout}`)
            try {
                const explorerUrl = testnet ? 'https://testnet.ordimint.com' : 'https://explorer.ordimint.com';
                const res = await axios.get(`${explorerUrl}/output/${currentUtxo.txid}:${currentUtxo.vout}`)
                const match = res.data.match(/<a href=\/inscription\/(.*?)>/);
                const inscriptionId = match ? match[1] : null;

                if (inscriptionId) {
                    const [txid, vout] = inscriptionId.split('i')
                    currentUtxo = { txid, vout }
                } else {
                    console.log('Match not found');
                    // handle the case when match is not found
                }

            } catch (err) {
                console.log(`Error fetching UTXO: ${err}`)
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

    useEffect(() => {
        connectOnLoad().then(() => { });
    }, [nostrPublicKey, testnet]);

    useEffect(() => {
        fetchUtxosForAddress();
    }, [address]);


    async function connectOnLoad() {
        const pubKey = await connectWallet()
        setNostrPublicKey(pubKey)
        const addr = await getAddressInfoNostr(pubKey, testnet).address
        setAddress(addr)
    }


    return (
        <>
            <Head>
                <title>Ordimint - Alby Browser Extension Wallet Integration</title>
                <meta name="description" content="Effortlessly manage your Bitcoin Ordinals with Ordimint's Alby browser extension wallet integration, offering a seamless and user-friendly experience for your Inscriptions." />
                <meta name="keywords" content="Bitcoin, Ordinals, Alby, Browser Extension, Wallet, Integration, Digital Assets, Digital Artefacts" />
            </Head>
            <div style={{ position: "absolute", left: 50 }}>

                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/wallet">Wallets</Breadcrumb.Item>
                        <Breadcrumb.Item active>Alby Wallet</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </div>

            <Container className="main-container d-flex flex-column text-center align-items-center justify-content-center">


                <TestnetSwitch />
                <h1 className="text-center m-3">Alby Wallet</h1>

                {
                    nostrPublicKey ?
                        <div style={{ zIndex: 5 }}>
                            <Button variant="primary" size="lg" className="mx-3 shadowed-orange-small" onClick={() => setShowReceiveAddressModal(true)}>
                                Receive <BsBoxArrowInDownLeft />
                            </Button>
                        </div>
                        :
                        <>
                            <div>
                                {/* <Alert variant="light">
                                    Connect your wallet via the <a href="https://getalby.com/" target="_blank"
                                        rel="noopener noreferrer"><img src={AlbyLogo} height="20" alt="Alby Logo" /> getAlby</a> browser extension.
                                    You are in full control of your privat keys.
                                </Alert> */}
                                <br />
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="mx-3 shadowed-orange-small"
                                    onClick={async () => {
                                        setNostrPublicKey(await connectWallet())
                                    }}><Image src={AlbyLogo} height="20" width="20" alt="Alby Logo" /> use Alby Wallet</Button>

                            </div>
                        </>
                }
                <br /><br />
                {nostrPublicKey &&
                    <div>
                        <UtxoInfo
                            testnet={testnet}
                            utxosReady={utxosReady}
                            ownedUtxos={ownedUtxos}
                            setShowUtxoModal={setShowUtxoModal}
                            setCurrentUtxo={setCurrentUtxo}
                            inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
                        />
                    </div>
                }

            </Container>


            <ReceiveAddressModal
                testnet={testnet}
                showReceiveAddressModal={showReceiveAddressModal}
                setShowReceiveAddressModal={setShowReceiveAddressModal}
                nostrPublicKey={nostrPublicKey}

            />
            <UtxoModal
                setShowBeginSendModal={setShowBeginSendModal}
                setShowUtxoModal={setShowUtxoModal}
                showUtxoModal={showUtxoModal}
                currentUtxo={currentUtxo}
                SENDS_ENABLED={SENDS_ENABLED}
                testnet={testnet}
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
                showSelectFeeRateModal={showSelectFeeRateModal}
                setShowSelectFeeRateModal={setShowSelectFeeRateModal}
                currentUtxo={currentUtxo}
                sendFeeRate={sendFeeRate}
                testnet={testnet}
                setSendFeeRate={setSendFeeRate}
                setShowBeginSendModal={setShowBeginSendModal}
                setShowConfirmSendModal={setShowConfirmSendModal}
                inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
            />
            <ConfirmationModal
                testnet={testnet}
                setShowConfirmSendModal={setShowConfirmSendModal}
                showConfirmSendModal={showConfirmSendModal}
                setShowSelectFeeRateModal={setShowSelectFeeRateModal}
                setShowSentModal={setShowSentModal}
                sendFeeRate={sendFeeRate}
                currentUtxo={currentUtxo}
                nostrPublicKey={nostrPublicKey}
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
        </>
    )
}
