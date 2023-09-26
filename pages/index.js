import { React, useEffect, useContext } from 'react';
import { io } from "socket.io-client";

import InvoiceModal from '../components/modals/InvoiceModal';
import { validate, Network } from 'bitcoin-address-validation'
import { Container } from "react-bootstrap";
import { useState } from "react";
import AlertModal from '../components/modals/AlterModal';
import FeeRange from '../components/MultistepCheckout/FeeRange';
import ReceiveAddressModal from '../components/modals/ReceiveAddressModal';
import { getAddressInfoNostr, connectWallet } from '../components/WalletConfig/utils';
import { getLedgerPubkey, getAddressInfoLedger } from '../components/WalletConfig/connectLedger';
import { getUnisatPubkey, getAddressInfoUnisat, connectUnisat } from '../components/WalletConfig/unisatWalletFunctions';
import { getXversePubkey, getAddressInfoXverse, connectXverse } from '../components/WalletConfig/xverseWalletFunctions';
import { getHiroPubkey, getAddressInfoHiro, connectHiro } from '../components/WalletConfig/hiroWalletFunctions';
import ContentSelector from '../components/MultistepCheckout/ContentSelector';
import Head from 'next/head';
import { useRouter } from 'next/router';
import GenerateWalletModal from '../components/modals/GenerateWalletModal';
import RestoreWalletModal from '../components/modals/RestoreWalletModal';
import SelectWalletModal from '../components/modals/SelectWalletModal';
import { generateWallet, restoreWallet, getOrdimintAddress } from '../components/WalletConfig/ordimintWalletFunctions';
import PreviewModal from '../components/modals/PreviewModal';
import { TestnetContext } from '../contexts/TestnetContext';
import WalletSelect from '../components/MultistepCheckout/WalletSelect';
import { useRef } from 'react';
import MultiStep from '../components/MultistepCheckout/MultiStep';
import Overview from '../components/MultistepCheckout/Overview';


var socket = io.connect(process.env.REACT_APP_socket_port);
var clientPaymentHash;
var isPaid = false; //Is only necessary in the case of socket event is fireing multible times

const outputCostPicture = process.env.REACT_APP_output_cost_picture;
const outputCostText = process.env.REACT_APP_output_cost_text;
const outputCostDomain = process.env.REACT_APP_output_cost_domain;
const outputCostNews = process.env.REACT_APP_output_cost_news;
const outputCostBRC = process.env.REACT_APP_output_cost_brc;
const outputCostTAP = process.env.REACT_APP_output_cost_tap;
const outputCostTestnet = process.env.REACT_APP_output_cost_testnet;
const securityBuffer = process.env.REACT_APP_security_buffer;


function Home() {
    const router = useRouter();
    const refCodeRef = useRef(null);
    const [nostrPublicKey, setNostrPublicKey] = useState(null);
    const [ledgerPublicKey, setLedgerPublicKey] = useState(null);
    const [unisatPublicKey, setUnisatPublicKey] = useState(null);
    const [xversePublicKey, setXversePublicKey] = useState(null);
    const [hiroPubkey, setHiroPublicKey] = useState(null);
    const [showReceiveAddressModal, setShowReceiveAddressModal] = useState(false);
    const [showWalletConnectModal, setShowWalletConnectModal] = useState(false);
    const [tabKey, setTabKey] = useState('file');
    const [textInput, setTextInput] = useState('Enter any text you want to store on the blockchain');
    const [domainInput, setDomainInput] = useState('stacking');
    const [newsText, setNewsText] = useState('');
    const [newsAuthor, setNewsAuthor] = useState('');
    const [newsTitle, setNewsTitle] = useState('');
    const [newsUrl, setNewsUrl] = useState('');

    const [brcRadioButton, setbrcRadioButton] = useState("deploy");
    const [tokenTicker, setTokenTicker] = useState('');
    const [tokenSupply, setTokenSupply] = useState('21000');
    const [mintLimit, setMintLimit] = useState('1000');
    const [mintAmount, setMintAmount] = useState('1000');
    const [transferAmount, setTransferAmount] = useState('1000');

    const [showSpinner, setSpinner] = useState(true);
    const [payment_request, setPaymentrequest] = useState(0);
    const [showPaymentSuccessfull, setPaymentAlert] = useState(false);
    ///////Modal Invoice
    const [visibleInvoiceModal, setShowInvoiceModal] = useState(false);
    const closeInvoiceModal = () => setShowInvoiceModal(false);
    const showInvoiceModal = () => setShowInvoiceModal(true);
    ///////Modal Configdata
    const [isConfigModal, showConfigModal] = useState(false);
    const renderConfigModal = () => showConfigModal(true);
    const hideConfigModal = () => showConfigModal(false);
    //////Modal BRC Preview
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const closePreviewModal = () => setShowPreviewModal(false);
    const showPreviewModalFunc = () => setShowPreviewModal(true);

    //////Alert - Modal
    const [alertModalparams, showAlertModal] = useState({
        show: false,
        text: "",
        type: "",
    });
    const hideAlertModal = () =>
        showAlertModal({ show: false, text: "", type: "" });
    //////OnChain-Address
    const [onChainAddress, setOnChainAddress] = useState("");
    ///////File
    const [file, setFile] = useState(null);
    const [fileSize, setFileSize] = useState(10);
    const [fileType, setFileType] = useState("jpeg");
    const [fileName, setFileName] = useState('');
    ////// Wallet selction modal
    const [showSelectWalletModal, setShowSelectWalletModal] = useState(false);
    const closeSelectWalletModal = () => setShowSelectWalletModal(false);
    const renderSelectWalletModal = () => setShowSelectWalletModal(true);
    ////// Generate wallet modal
    const [showGenerateWalletModal, setShowGenerateWAlletModal] = useState(false);
    const handleShowGenerateWalletModal = () => setShowGenerateWAlletModal(true);
    const handleCloseGenerateWalletModal = () => setShowGenerateWAlletModal(false);
    const [privateKey, setPrivateKey] = useState(null);
    const [seedPhrase, setSeedPhrase] = useState('');
    ////// Restore wallet modal
    const [showRestoreWalletModal, setShowRestoreWalletModal] = useState(false);
    const handleRestoreWalletModalClose = () => setShowRestoreWalletModal(false);
    const handleRestoreWalletModalShow = () => setShowRestoreWalletModal(true);
    const [ordimintPubkey, setOrdimintPubkey] = useState(null);
    /////Testnet
    const { testnet, setTestnet } = useContext(TestnetContext);
    const [fee, setFee] = useState(20);
    const [price, setPrice] = useState(1);
    ///// Tap protocol items
    const [btcItems, setBtcItems] = useState([]);






    useEffect(() => {
        if (!showGenerateWalletModal && ordimintPubkey) {
            setShowWalletConnectModal(true)
        }
    }, [showGenerateWalletModal]);


    const handleGenerateWallet = async () => {
        try {
            const { newPrivateKey, newAddress, mnemonic, newOrdimintPubkey } = await generateWallet(testnet);
            setPrivateKey(newPrivateKey);
            setOrdimintPubkey(newOrdimintPubkey);
            setOnChainAddress(newAddress);
            setSeedPhrase(mnemonic);
            await handleShowGenerateWalletModal();
            await closeSelectWalletModal();

        } catch (error) {
            console.error('Error:', error);
        }

    };

    const handleRestoreWallet = async (event, testnet) => {
        try {
            const { restoredAddress, restoredPubkey } = await restoreWallet(event, testnet);
            setOrdimintPubkey(restoredPubkey);
            setOnChainAddress(restoredAddress);
            await handleRestoreWalletModalClose();
        } catch (error) {
            console.error('Error:', error);

        }
        setShowWalletConnectModal(true)
    };

    async function getRefCodeFromURL() {
        if (router.isReady) {
            const refCode = await router.query.ref;
            console.log("Ref Code:", refCode);
            return refCode;
        }
        return null;
    }

    useEffect(() => {
        async function fetchRefCode() {
            const refCode = await getRefCodeFromURL();
            if (refCode) {
                refCodeRef.current = refCode;
                console.log("Ref Code:", refCodeRef.current);
            }
        }

        fetchRefCode();
    }, [router.isReady]);




    useEffect(() => {
        if (testnet === true) {
            setPrice(outputCostTestnet);
        }
        else {

            const outputCosts = {
                file: outputCostPicture,
                text: outputCostText,
                news: outputCostNews,
                domain: outputCostDomain,
                brc: outputCostBRC,
                tap: outputCostTAP
            };

            const newPrice = outputCosts[tabKey]
                ? Math.trunc(((fileSize / 4) + 150) * fee * securityBuffer) + parseInt(outputCosts[tabKey])
                : 30000;

            setPrice(newPrice);
        }
    }, [fileSize, fee, tabKey, testnet]);

    ///////Successfull payment alert
    const renderAlert = (show) => {
        setPaymentAlert(show);
    };
    const fileTooBig = () => {
        showAlertModal({
            show: true,
            text: "File is too big! (>0.7MB)",
            type: "danger",
        });
    }


    //////Updates the QR-Code
    const updatePaymentrequest = () => {
        socket.on("lnbitsInvoice", (invoiceData) => {
            setPaymentrequest(invoiceData.payment_request);
            clientPaymentHash = invoiceData.payment_hash;
            setSpinner(false);
        });
    };

    ////Connect to WebSocket Server
    socket.off("connect").on("connect", () => {
        /////Checks for already paid invoice if browser switche tab on mobile
        if (clientPaymentHash !== undefined) {
            console.log("check invoice");
            console.log(clientPaymentHash);
            checkInvoice();
        }
    });

    const checkInvoice = () => {
        socket.emit("checkInvoice", clientPaymentHash);
    };


    const validateContent = () => {
        if (file === null && tabKey === 'file') {
            showAlertModal({
                show: true,
                text: "Please provide your own image",
                type: "danger",
            });
            return false;
        }
        else if (domainInput === "" && tabKey === 'domain') {
            showAlertModal({
                show: true,
                text: "Please enter a domain name",
                type: "danger",
            });
            return false;
        }
        else if (newsTitle === "" && tabKey === 'news') {
            showAlertModal({
                show: true,
                text: "Please enter a title",
                type: "danger",
            });
            return false;
        }
        else if (tokenTicker === "" && tabKey === 'brc') {
            showAlertModal({
                show: true,
                text: "Please enter a token ticker",
                type: "danger",
            });
            return false;
        }
        else if (tokenTicker.replace(/-/g, '').length === 4 && tabKey === 'tap') {
            showAlertModal({
                show: true,
                text: "4 letter token ticker are reserved for BRC",
                type: "danger",
            });
            return false;
        }
        else if (tabKey === 'tap' &&
            (tokenTicker.replace(/-/g, '').length !== 3 &&
                (tokenTicker.replace(/-/g, '').length < 5 || tokenTicker.replace(/-/g, '').length > 32))) {
            showAlertModal({
                show: true,
                text: "Token ticker must be 3 symbols or between 5 to 32 symbols.",
                type: "danger",
            });
            return false;
        }

        return true;

    }

    const validateOnchainAddress = () => {

        if (validate(onChainAddress, testnet ? Network.testnet : Network.mainnet) === false) {
            showAlertModal({
                show: true,
                text: `Please provide a valid ${testnet ? 'Testnet' : ''} BTC address`,
                type: "danger",
            });
            return false;
        } else {
            return true
        }

    }


    //Get the invoice and perform validity checks
    const getInvoice = (price) => {
        if (validate(onChainAddress, testnet ? Network.testnet : Network.mainnet) === false) {
            showAlertModal({
                show: true,
                text: `Please provide a valid ${testnet ? 'Testnet' : ''} BTC address`,
                type: "danger",
            });
        } else if (file === null && tabKey === 'file') {
            showAlertModal({
                show: true,
                text: "Please provide your own image",
                type: "danger",
            });
        }
        else if (domainInput === "" && tabKey === 'domain') {
            showAlertModal({
                show: true,
                text: "Please enter a domain name",
                type: "danger",
            });
        }
        else if (newsTitle === "" && tabKey === 'news') {
            showAlertModal({
                show: true,
                text: "Please enter a title",
                type: "danger",
            });
        }
        else if (tokenTicker === "" && tabKey === 'brc') {
            showAlertModal({
                show: true,
                text: "Please enter a token ticker",
                type: "danger",
            });
        }
        else if (tokenTicker.replace(/-/g, '').length === 4 && tabKey === 'tap') {
            showAlertModal({
                show: true,
                text: "4 letter token ticker are reserved for BRC",
                type: "danger",
            });
        }
        else if (tabKey === 'tap' &&
            (tokenTicker.replace(/-/g, '').length !== 3 &&
                (tokenTicker.replace(/-/g, '').length < 5 || tokenTicker.replace(/-/g, '').length > 32))) {
            showAlertModal({
                show: true,
                text: "Token ticker must be 3 symbols or between 5 to 32 symbols.",
                type: "danger",
            });
        }


        else {
            if (tabKey === 'brc' || tabKey === 'tap') {
                awaitPreviewConfirmation();
            } else {

                socket.emit("getInvoice", price);
                showInvoiceModal();
            }
        }
    };

    const awaitPreviewConfirmation = () => {
        setShowPreviewModal(true);
    }

    const handlePreviewConfirmation = () => {
        setShowPreviewModal(false);
        socket.emit("getInvoice", price);
        showInvoiceModal();
    }

    socket.off("invoicePaid").on("invoicePaid", async (paymentHash) => {
        if (paymentHash === clientPaymentHash && !isPaid) {
            renderAlert(true);
            isPaid = true;
            renderConfigModal();
            console.log("Invoice paid");
            console.log(refCodeRef.current);

            if (tabKey === 'file') {
                await base64Encode(file, function (dataUrl) {
                    socket.emit("createOrder", paymentHash, onChainAddress, testnet, dataUrl, fileType, false, fee, refCodeRef.current, price);
                });
            }
            if (tabKey === 'text') {
                console.log(textInput);
                socket.emit("createOrder", paymentHash, onChainAddress, testnet, textInput, 'txt', true, fee, refCodeRef.current, price);
            }
            if (tabKey === 'domain') {
                console.log(domainInput);
                const domainString = `{"p":"sns","op":"reg","name":"${domainInput}.sats"}`
                socket.emit("createOrder", paymentHash, onChainAddress, testnet, domainString, 'txt', true, fee, refCodeRef.current, price);
            }
            if (tabKey === 'news') {
                var newsObject =
                {
                    p: "ons",
                    op: "post",
                    title: `${newsTitle}`,
                }
                if (newsUrl !== "") {
                    newsObject = { ...newsObject, url: `${newsUrl}` }
                }
                if (newsAuthor !== "") {
                    newsObject = { ...newsObject, author: `${newsAuthor}` }
                }
                if (newsText !== "") {
                    newsObject = { ...newsObject, body: `${newsText}` }
                }
                const newsString = JSON.stringify(newsObject)
                socket.emit("createOrder", paymentHash, onChainAddress, testnet, newsString, 'txt', true, fee, refCodeRef.current, price);
            }

            if (tabKey === 'brc') {
                var brcString = "";
                if (brcRadioButton === "deploy") {
                    brcString = `{"p":"brc-20","op":"deploy","tick":"${tokenTicker}","max":"${tokenSupply}","lim":"${mintLimit}"}`

                }
                else if (brcRadioButton === "mint") {
                    brcString = `{"p":"brc-20","op":"mint","tick":"${tokenTicker}","amt":"${mintAmount}"}`
                }
                else if (brcRadioButton === "transfer") {
                    brcString = `{"p":"brc-20","op":"transfer","tick":"${tokenTicker}","amt":"${transferAmount}"}`
                }
                console.log(brcString);
                socket.emit("createOrder", paymentHash, onChainAddress, testnet, brcString, 'txt', true, fee, refCodeRef.current, price);

            }

            if (tabKey === 'tap') {
                var tapString = "";
                if (brcRadioButton === "deploy") {
                    tapString = `{"p":"tap","op":"token-deploy","tick":"${tokenTicker}","max":"${tokenSupply}","lim":"${mintLimit}"}`

                }
                else if (brcRadioButton === "mint") {
                    tapString = `{"p":"tap","op":"token-mint","tick":"${tokenTicker}","amt":"${mintAmount}"}`
                }
                else if (brcRadioButton === "transfer") {
                    tapString = `{"p":"tap","op":"token-transfer","tick":"${tokenTicker}","amt":"${transferAmount}"}`
                }
                else if (brcRadioButton === "token-send") {
                    const items = btcItems.map(item => ({
                        tick: item.tick,
                        amt: item.amt,
                        address: item.address
                    }));
                    tapString = JSON.stringify({
                        p: "tap",
                        op: "token-send",
                        items: items
                    });
                    console.log(tapString);
                }


                socket.emit("createOrder", paymentHash, onChainAddress, testnet, tapString, 'txt', true, fee, refCodeRef.current, price);

            }


        }
    });

    function base64Encode(url, _callback) {
        // console.log(url);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                _callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    useEffect(() => {
        if (!ledgerPublicKey) return
        async function getLedgerAddress() {
            await setOnChainAddress(await (await getAddressInfoLedger(ledgerPublicKey, false, testnet)).address)
        }
        getLedgerAddress()

    }, [ledgerPublicKey, testnet])

    useEffect(() => {
        if (!ledgerPublicKey) return
        async function verifyAddress() {
            setShowWalletConnectModal(true)
            await getAddressInfoLedger(ledgerPublicKey, true, testnet)

        }
        verifyAddress()

    }, [onChainAddress, ledgerPublicKey])

    useEffect(() => {
        if (!ordimintPubkey) return;
        async function getOrdimintAddressAsync() {
            const address = await getOrdimintAddress(ordimintPubkey, testnet);
            setOnChainAddress(address);
        }
        getOrdimintAddressAsync();
    }, [ordimintPubkey, testnet]);

    useEffect(() => {
        if (!nostrPublicKey) return;
        async function getNostrAddressAsync() {
            const address = await getAddressInfoNostr(nostrPublicKey, testnet).address;
            setOnChainAddress(address);
        }
        getNostrAddressAsync();
    }, [nostrPublicKey, testnet]);

    useEffect(() => {
        if (!unisatPublicKey) return;
        var unisat = window.unisat;
        async function switchNetwork() {

            try {
                await unisat.switchNetwork(testnet ? "testnet" : "livenet");
            } catch (e) {
                console.log(e);
            }
        }
        async function getUnisatAddressAsync() {

            const address = await unisat.getAccounts()
            console.log(address[0]);
            setOnChainAddress(address[0]);
        }
        switchNetwork().then(() => {
            getUnisatAddressAsync();
        });
    }, [testnet]);


    const steps = [

        <ContentSelector
            tabKey={tabKey}
            setTabKey={setTabKey}
            file={file}
            fileType={fileType}
            fileName={fileName}
            setFile={setFile}
            setFileType={setFileType}
            setFileName={setFileName}
            setFileSize={setFileSize}
            testnet={testnet}
            fileTooBig={fileTooBig}
            textInput={textInput}
            setTextInput={setTextInput}
            setNewsAuthor={setNewsAuthor}
            setNewsText={setNewsText}
            setNewsTitle={setNewsTitle}
            setNewsUrl={setNewsUrl}
            domainInput={domainInput}
            setDomainInput={setDomainInput}
            tokenTicker={tokenTicker}
            setTokenTicker={setTokenTicker}
            tokenSupply={tokenSupply}
            setTokenSupply={setTokenSupply}
            mintLimit={mintLimit}
            setMintLimit={setMintLimit}
            mintAmount={mintAmount}
            setMintAmount={setMintAmount}
            transferAmount={transferAmount}
            setTransferAmount={setTransferAmount}
            setbrcRadioButton={setbrcRadioButton}
            brcRadioButton={brcRadioButton}
            setBtcItems
        />
        ,
        <WalletSelect
            nostrPublicKey={nostrPublicKey}
            ledgerPublicKey={ledgerPublicKey}
            ordimintPubkey={ordimintPubkey}
            xversePublicKey={xversePublicKey}
            hiroPublicKey={hiroPubkey}
            onChainAddress={onChainAddress}
            setOnChainAddress={setOnChainAddress}
            showWalletConnectModal={showWalletConnectModal}
            setShowWalletConnectModal={setShowWalletConnectModal}
            connectWallet={connectWallet}
            getAddressInfoNostr={getAddressInfoNostr}
            testnet={testnet}
            getLedgerPubkey={getLedgerPubkey}
            getXversePubkey={getXversePubkey}
            getHiroPubkey={getHiroPubkey}
            getAddressInfoLedger={getAddressInfoLedger}
            getAddressInfoXverse={getAddressInfoXverse}
            renderSelectWalletModal={renderSelectWalletModal}
            setNostrPublicKey={setNostrPublicKey}
            setLedgerPublicKey={setLedgerPublicKey}
            setHiroPublicKey={setHiroPublicKey}
            unisatPublicKey={unisatPublicKey}
            setUnisatPublicKey={setUnisatPublicKey}
            setXversePublicKey={setXversePublicKey}
            getUnisatPubkey={getUnisatPubkey}
            getAddressInfoUnisat={getAddressInfoUnisat}
            getAdressInfoHiro={getAddressInfoHiro}
            connectUnisat={connectUnisat}
            connectXverse={connectXverse}
            connectHiro={connectHiro}

        />,

        <FeeRange
            setFee={(e) => {
                setFee(e.target.value)
            }}
            value={fee}
        />
        ,
        <Overview price={price} />

    ];

    const handleSubmit = () => {

        getInvoice(price);
        renderAlert(false);
        // showInvoiceModal();
        hideConfigModal();
        updatePaymentrequest();
        setSpinner(true);
        isPaid = false;
        window.gtag('event', 'click', {
            'event_category': 'Create Order',
            'event_label': 'Get Invoice',
        });


    };





    return (
        <div className="App " >
            <Head>
                <meta name="description" content="Ordimint offers an easy-to-use Wallet and Inscription service for Bitcoin Ordinals, enabling seamless Ordinal management and minting of unique Bitcoin inscriptions." />
                <title>Ordimint - Inscribe</title>
                <meta name="keywords" content="Bitcoin, Lightning, Ordinals, Inscriptions, NFT, Wallet, Asset Management, Minting" />
                <meta property="og:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ordimint.com/OrdimintSVGLogo-black.svg" />
                <meta property="og:description" content="A website to mint, receive, store or send your Ordinals. View all new Ordinal Collections, Inscribe or use our wallet." />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:description" content="A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:image" content="https://ordimint.com/OrdimintSVGLogo-black.svg" />
            </Head>

            <Container>
                <MultiStep
                    steps={steps}
                    handleSubmit={handleSubmit}
                    validateContent={validateContent}
                    validateOnchainAddress={validateOnchainAddress}
                />

            </Container >

            <AlertModal
                show={alertModalparams.show}
                text={alertModalparams.text}
                variant={alertModalparams.type}
                handleClose={hideAlertModal}
            />
            <PreviewModal
                show={showPreviewModal}
                handleClose={closePreviewModal}
                tokenSupply={tokenSupply}
                tokenTicker={tokenTicker}
                mintLimit={mintLimit}
                mintAmount={mintAmount}
                brcRadioButton={brcRadioButton}
                transferAmount={transferAmount}
                onOK={handlePreviewConfirmation}
                tokenStandard={tabKey}
                btcItems={btcItems}
            />
            <ReceiveAddressModal
                testnet={testnet}
                showReceiveAddressModal={showReceiveAddressModal}
                setShowReceiveAddressModal={setShowReceiveAddressModal}
                nostrPublicKey={nostrPublicKey}

            />
            <InvoiceModal
                show={visibleInvoiceModal}
                showSpinner={showSpinner}
                isConfigModal={isConfigModal}
                value={payment_request}
                paymentHash={clientPaymentHash}
                showNewInvoice={() => {
                    getInvoice(price);
                    setSpinner(true);
                }}
                handleClose={closeInvoiceModal}
                showPaymentAlert={showPaymentSuccessfull}
            />
            <SelectWalletModal
                show={showSelectWalletModal}
                handleClose={closeSelectWalletModal}
                handleGenerateWallet={() => handleGenerateWallet(testnet)}
                handleRestoreWallet={() => {
                    closeSelectWalletModal();
                    handleRestoreWalletModalShow()

                }}
            />
            <GenerateWalletModal
                showModal={showGenerateWalletModal}
                closeModal={handleCloseGenerateWalletModal}
                setOrdimintPubkey={setOrdimintPubkey}
                seedPhrase={seedPhrase}
                privateKey={privateKey}
            />

            <RestoreWalletModal
                testnet={testnet}
                showRestoreWalletModal={showRestoreWalletModal}
                handleRestoreWalletModalClose={handleRestoreWalletModalClose}
                restoreWallet={(e) => handleRestoreWallet(e, testnet)}
            />

            <ReceiveAddressModal
                showReceiveAddressModal={showReceiveAddressModal}
                setShowReceiveAddressModal={setShowReceiveAddressModal}
                nostrPublicKey={nostrPublicKey}
            />


        </div >
    );
}

export default Home;
