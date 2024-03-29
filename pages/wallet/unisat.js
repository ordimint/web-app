import React from 'react'
import { Container, Breadcrumb, Button, Alert, Image } from 'react-bootstrap';
import Head from 'next/head';
import { useEffect, useRef, useState, useContext } from "react";
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
import TestnetSwitch from '../../components/TestnetSwitch';
import { BsBoxArrowInDownLeft } from "react-icons/bs"
import { TestnetContext } from '../../contexts/TestnetContext';





const unisat = () => {
    const { testnet, setTestnet } = useContext(TestnetContext)
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
    const [balance, setBalance] = useState({
        confirmed: 0,
        unconfirmed: 0,
        total: 0,
    });
    const [network, setNetwork] = useState("");

    const getBasicInfo = async () => {
        const unisat = window.unisat;
        const [address] = await unisat.getAccounts();
        setAddress(address);

        const publicKey = await unisat.getPublicKey();
        setPublicKey(publicKey);

        const balance = await unisat.getBalance();
        setBalance(balance);

        const network = await unisat.getNetwork();
        setNetwork(network);
    };

    const selfRef = useRef({
        accounts: [],
    });

    const self = selfRef.current;
    const handleAccountsChanged = (_accounts) => {
        if (self.accounts[0] === _accounts[0]) {
            // prevent from triggering twice
            return;
        }
        self.accounts = _accounts;
        if (_accounts.length > 0) {
            setAccounts(_accounts);
            setConnected(true);

            setAddress(_accounts[0]);

            getBasicInfo();
        } else {
            setConnected(false);
        }
    };

    const handleNetworkChanged = (network) => {
        setNetwork(network);
        getBasicInfo();
    };

    async function getNetwork() {
        var unisat = window.unisat;
        const network = await unisat.getNetwork();
        setNetwork(network);
        if (network === "livenet") {
            setTestnet(false);
        } else {
            setTestnet(true);
        }
        return testnet;
    }

    async function checkUnisat() {
        var unisat = window.unisat;
        await unisat.requestAccounts();
        for (let i = 1; i < 10 && !unisat; i += 1) {
            await new Promise((resolve) => setTimeout(resolve, 10000 * i));
            unisat = window.unisat;
        }

        if (unisat) {
            setUnisatInstalled(true);
        } else if (!unisat)
            return;

        unisat.getAccounts().then((accounts) => {
            handleAccountsChanged(accounts);
        });


        unisat.on("accountsChanged", handleAccountsChanged);
        unisat.on("networkChanged", handleNetworkChanged);

        return () => {
            unisat.removeListener("accountsChanged", handleAccountsChanged);
            unisat.removeListener("networkChanged", handleNetworkChanged);
        };
    }

    async function switchNetwork() {
        var unisat = window.unisat;
        try {
            await unisat.switchNetwork(testnet ? "testnet" : "livenet");
        } catch (e) {
            console.log(e);
        }
    }

    async function getUnisatAddressAsync() {
        var unisat = window.unisat;
        const address = await unisat.getAccounts()
        // console.log(address[0]);
        setAddress(address[0]);
    }

    async function fetchUtxosForAddress() {
        if (!address) return

        const mempoolUrl = testnet ? 'https://mempool.space/testnet/api' : 'https://mempool.space/api';

        const response = await axios.get(`${mempoolUrl}/address/${address}/utxo`)

        const tempInscriptionsByUtxo = {}
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

    ///////////////////Use Effects for handling the events asynchronusly/////////////////////

    useEffect(() => {
        if (!publicKey) return;
        switchNetwork().then(() => {
            getUnisatAddressAsync();
        });


    }, [testnet]);


    useEffect(() => {

        // console.log("Is testnet:", testnet);
        // console.log("network:", network);
        // console.log("unisatInstalled:", unisatInstalled);
        // console.log("connected:", connected);

        getNetwork().then(() => {
            checkUnisat()
            fetchUtxosForAddress()
        })

    }, [publicKey, address]);


    return (
        <div>
            <Head>
                <title>Ordimint - Unisat Wallet</title>
                <meta name="description" content="Securely manage your Bitcoin Ordinals with Ordimint's seamless Ledger hardware wallet integration, ensuring top-notch security and convenience for your inscriptions." />
                <meta name="keywords" content="Bitcoin, Ordinals, Ledger, Hardware Wallet, Integration, Security, Digital Assets, Digital Artefacts" />
            </Head>



            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/wallet">Wallets</Breadcrumb.Item>
                    <Breadcrumb.Item active>Unisat Wallet</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <Container className="main-container d-flex flex-column text-center align-items-center justify-content-center">
                <TestnetSwitch />
                <h2 className="text-center m-4">Unisat Wallet</h2>

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
                address={address}

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
                address={address}
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
