import React from 'react'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Breadcrumb } from 'react-bootstrap';
import Head from 'next/head';
import { BsBoxArrowInDownLeft } from "react-icons/bs"
import Alert from 'react-bootstrap/Alert';
import ReceiveAddressModal from '../../components/modals/ReceiveAddressModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import SelectFeeRateModal from '../../components/modals/SelectFeeRateModal';
import SentModal from '../../components/modals/SentModal';
import BeginSendModal from '../../components/modals/BeginSendModal';
import UtxoModal from '../../components/modals/UtxoModal';
import UtxoInfo from '../../components/UtxoInfo';
import { DEFAULT_FEE_RATE, INSCRIPTION_SEARCH_DEPTH, SENDS_ENABLED } from '../../components/WalletConfig/constance';
import { getLedgerPubkey, getAddressInfoLedger } from '../../components/WalletConfig/connectLedger';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { TestnetContext } from '../../contexts/TestnetContext';
import TestnetSwitch from '../../components/TestnetSwitch';


const LedgerWallet = () => {
    const { testnet } = React.useContext(TestnetContext);
    const [ledgerPublicKey, setLedgerPublicKey] = useState(null);
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

    useEffect(() => {
        async function fetchUtxosForLedger() {
            if (!ledgerPublicKey) {
                console.log("Connect on load", ledgerPublicKey)
                await connectOnLoad()
                return
            }
            if (!address) {
                await setAddress(await (await getAddressInfoLedger(ledgerPublicKey, false, testnet)).address)
                return
            }
            console.log('address', address)
            const mempoolUrl = testnet ? 'https://mempool.space/testnet/api' : 'https://mempool.space/api';
            const response = await axios.get(`${mempoolUrl}/address/${address}/utxo`)
            console.log('response', response)
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
                    console.log(`Error from Ordinal Explorer`)
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

        fetchUtxosForLedger()


    }, [ledgerPublicKey, address])


    async function connectOnLoad() {

        setLedgerPublicKey(await getLedgerPubkey(false))

    }

    return (
        <div>
            <Head>
                <title>Ordimint - Ledger Hardware Wallet Integration</title>
                <meta name="description" content="Securely manage your Bitcoin Ordinals with Ordimint's seamless Ledger hardware wallet integration, ensuring top-notch security and convenience for your inscriptions." />
                <meta name="keywords" content="Bitcoin, Ordinals, Ledger, Hardware Wallet, Integration, Security, Digital Assets, Digital Artefacts" />
            </Head>

            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/wallet">Wallets</Breadcrumb.Item>
                    <Breadcrumb.Item active>Ledger Wallet</Breadcrumb.Item>
                </Breadcrumb>
            </Container>


            <Container className="main-container d-flex flex-column text-center align-items-center justify-content-center">
                <TestnetSwitch />
                <h1 className="text-center m-3">Ledger Wallet</h1>
                {
                    ledgerPublicKey ?
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
                                    Connect your Ledger to your computer and open the Bitcoin app.<br></br>
                                    You should use Chrome browser or Microsoft Edge.
                                </Alert>
                                <Spinner>

                                    <span className="sr-only"></span>
                                </Spinner>
                                <p>Connecting....</p>
                                {/* <Button
                                    variant="primary"
                                    size="lg"
                                    className="mx-3 shadowed-orange-small"
                                    onClick={async () => {
                                        setLedgerPublicKey(await connectWallet())
                                    }}><img src={ledgerLogo} height="35" alt="Alby Logo" />Connect wallet</Button> */}

                                <br />
                            </div>
                        </>
                }
                <br /><br />
                {ledgerPublicKey &&
                    <div>
                        <Alert variant="light">
                            The transactions and Ordinals will not be visible in your Ledger Live app.
                            This is to prevent interference with your existing accounts and to avoid accidentally sending funds to your Ordinal account or you send your Ordinal accidentally to another account.
                            So don't worry, your Ordinals are safu.
                        </Alert>
                        <UtxoInfo
                            utxosReady={utxosReady}
                            ownedUtxos={ownedUtxos}
                            setShowUtxoModal={setShowUtxoModal}
                            setCurrentUtxo={setCurrentUtxo}
                            inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
                        />
                    </div>}
            </Container>


            <ReceiveAddressModal
                testnet={testnet}
                showReceiveAddressModal={showReceiveAddressModal}
                setShowReceiveAddressModal={setShowReceiveAddressModal}
                ledgerPublicKey={ledgerPublicKey}
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
                ledgerPublicKey={ledgerPublicKey}
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


        </div>
    )
}

export default LedgerWallet
