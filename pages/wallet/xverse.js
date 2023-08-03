import React from 'react'
import { Container, Breadcrumb, Button, Alert, Image } from 'react-bootstrap';
import Head from 'next/head';
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { DEFAULT_FEE_RATE, SENDS_ENABLED } from '../../components/WalletConfig/constance';
import UnisatLogo from '../../public/media/unisat-logo.svg';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import SelectFeeRateModal from '../../components/modals/SelectFeeRateModal';
import SentModal from '../../components/modals/SentModal';
import BeginSendModal from '../../components/modals/BeginSendModal';
import UtxoModal from '../../components/modals/UtxoModal';
import UtxoInfo from '../../components/UtxoInfo';
import ReceiveAddressModal from '../../components/modals/ReceiveAddressModal';
import { BsBoxArrowInDownLeft } from "react-icons/bs"
import TestnetSwitch from '../../components/TestnetSwitch';
import { getAddress, signTransaction } from 'sats-connect'


const unisat = () => {
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
    const [unisatInstalled, setUnisatInstalled] = useState(false);
    const [connected, setConnected] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [publicKey, setPublicKey] = useState("");
    const [address, setAddress] = useState("");
    const [testnet, setTestnet] = useState(false)



    const getAddressOptions = {
        payload: {
            purposes: ['ordinals', 'payment'],
            message: 'Address for receiving Ordinals and payments',
            network: {
                type: 'Mainnet'
            },
        },
        onFinish: (response) => {
            console.log(response)
        },
        onCancel: () => alert('Request canceled'),
    }



    useEffect(() => {
        async function fetchUtxosForAddress() {
            console.log('address', address)
            const addr = await getAddress(getAddressOptions);
            if (!address) return
            console.log('address', address)
            // const addr = await getAddress(getAddressOptions);
            setAddress(addr)
            console.log('addr', addr)
            const mempoolUrl = testnet ? 'https://mempool.space/testnet/api' : 'https://mempool.space/api';
            const response = await axios.get(`${mempoolUrl}/address/${address}/utxo`)

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

    }, []);




    return (
        <div>
            <Head>
                <title>Ordimint - UXverse Wallet</title>
                <meta name="description" content="Securely manage your Bitcoin Ordinals with Ordimint's seamless Ledger hardware wallet integration, ensuring top-notch security and convenience for your inscriptions." />
                <meta name="keywords" content="Bitcoin, Ordinals, Ledger, Hardware Wallet, Integration, Security, Digital Assets, Digital Artefacts" />
            </Head>

            <div style={{ position: "absolute", left: 50 }}>

                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/wallet">Wallets</Breadcrumb.Item>
                        <Breadcrumb.Item active>Unisat Wallet</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </div>
            <Container className="main-container d-flex flex-column text-center align-items-center justify-content-center">
                <TestnetSwitch />
                <h2 className="text-center m-4">Xverse Wallet</h2>
                {
                    publicKey ?
                        <div style={{ zIndex: 5 }}>
                            <Button variant="primary" size="lg" className="mx-3 shadowed-orange-small" onClick={() => setShowReceiveAddressModal(true)}>
                                Receive <BsBoxArrowInDownLeft />
                            </Button>
                        </div>
                        :
                        <>
                            <div>
                                <Alert variant="light">
                                    It seems like your Unisat wallet is not installed.
                                </Alert>
                                <br />


                            </div>
                        </>
                }
                <br /><br />
                {publicKey &&
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
                unisatAddress={address}

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
                unisatPublicKey={publicKey}
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


        </div >
    )

}
export default unisat
