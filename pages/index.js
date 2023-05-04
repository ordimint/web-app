import { React, useEffect } from 'react';
import { io } from "socket.io-client";
import FileUpload from '../components/FileUpload';
import OnchainInput from '../components/OnchainInput';
import InvoiceModal from '../components/modals/InvoiceModal';
import { validate } from 'bitcoin-address-validation';
import Footer from '../components/Footer';
import Image from 'next/image';
import { Row, Container, Button, Tab, Tabs, Col } from "react-bootstrap";
import { useState } from "react";
import AlbyLogo from '../public/media/alby_icon_yellow.svg';
import LedgerLogo from '../public/media/ledger-logo-small.svg';
import OrdimintLogo from '../public/media/ordimint-coin.png';
import AlertModal from '../components/modals/AlterModal';
import FeeRange from '../components/FeeRange';
import Price from '../components/Price';
import ReceiveAddressModal from '../components/modals/ReceiveAddressModal';
import WalletConnectModal from '../components/modals/WalletConnectModal';
import { getAddressInfoNostr, connectWallet } from '../components/WalletConfig/utils';
import { getLedgerPubkey, getAddressInfoLedger } from '../components/WalletConfig/connectLedger';
import TextInput from '../components/TextInput';
import DomainInput from '../components/DomainInput';
import NewsInput from '../components/NewsInput';
import BRC from '../components/BRC';
import Head from 'next/head';
import GenerateWalletModal from '../components/modals/GenerateWalletModal';
import RestoreWalletModal from '../components/modals/RestoreWalletModal';
import SelectWalletModal from '../components/modals/SelectWalletModal';
import { generateWallet, restoreWallet, getOrdimintAddress } from '../components/WalletConfig/ordimintWalletFunctions';
import InscriptionNumberSwitch from '../components/InscriptionNumberSwitch';


var socket = io.connect(process.env.REACT_APP_socket_port);
var clientPaymentHash;
var isPaid = false; //Is only necessary in the case of socket event is fireing multible times

const outputCostPicture = process.env.REACT_APP_output_cost_picture;
const outputCostText = process.env.REACT_APP_output_cost_text;
const outputCostDomain = process.env.REACT_APP_output_cost_domain;
const outputCostNews = process.env.REACT_APP_output_cost_news;
const outputCostBRC = process.env.REACT_APP_output_cost_brc;

const securityBuffer = process.env.REACT_APP_security_buffer;


function Home() {
    const defaultImage = '/media/dorian-nakamoto.jpg';
    const [nostrPublicKey, setNostrPublicKey] = useState(null);
    const [ledgerPublicKey, setLedgerPublicKey] = useState(null);
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
    const [file, setFile] = useState(defaultImage);
    const [fileSize, setFileSize] = useState(1000);
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
    /////Inscription number + or -
    const [positiveInscriptionNumber, setPositiveInscriptionNumber] = useState(true);
    const [fee, setFee] = useState(20);
    const [price, setPrice] = useState(1);

    useEffect(() => {
        if (!showGenerateWalletModal && ordimintPubkey) {
            setShowWalletConnectModal(true)
        }
    }, [showGenerateWalletModal]);


    const handleGenerateWallet = async () => {
        try {
            const { newPrivateKey, newAddress, mnemonic, newOrdimintPubkey } = await generateWallet();
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

    const handleRestoreWallet = async (event) => {
        try {
            const { restoredAddress, restoredPubkey } = await restoreWallet(event);
            setOrdimintPubkey(restoredPubkey);
            setOnChainAddress(restoredAddress);
            await handleRestoreWalletModalClose();
        } catch (error) {
            console.error('Error:', error);

        }
        setShowWalletConnectModal(true)
    };



    useEffect(() => {
        let newPrice;
        switch (tabKey) {
            case "file":
                newPrice = (Math.trunc((fileSize / 4) * fee * securityBuffer) + parseInt(outputCostPicture));
                break;
            case "text":
                newPrice = (Math.trunc((fileSize) * fee * securityBuffer) + parseInt(outputCostText));
                break;
            case "news":
                newPrice = (Math.trunc((fileSize) * fee * securityBuffer) + parseInt(outputCostNews));
                break;
            case "domain":
                newPrice = (Math.trunc((fileSize) * fee * securityBuffer) + parseInt(outputCostDomain));
                break;
            case "brc":
                newPrice = (Math.trunc((fileSize) * fee * securityBuffer) + parseInt(outputCostBRC));
                break;
            default:
                newPrice = 10000;
        }
        setPrice(newPrice);
    }, [fileSize, fee, tabKey]);

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


    //Get the invoice
    const getInvoice = (price) => {
        if (validate(onChainAddress) === false) {
            showAlertModal({
                show: true,
                text: "Please provide a valid BTC address",
                type: "danger",
            });
        } else if (file === defaultImage && tabKey === 'file') {
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
        else {

            socket.emit("getInvoice", price);

            showInvoiceModal();
        }
    };

    socket.off("invoicePaid").on("invoicePaid", async (paymentHash) => {
        if (paymentHash === clientPaymentHash && !isPaid) {
            renderAlert(true);
            isPaid = true;
            renderConfigModal();

            if (tabKey === 'file') {
                await base64Encode(file, function (dataUrl) {
                    socket.emit("createOrder", paymentHash, onChainAddress, positiveInscriptionNumber, dataUrl, fileType, false, fee);
                });
            }
            if (tabKey === 'text') {
                console.log(textInput);
                socket.emit("createOrder", paymentHash, onChainAddress, positiveInscriptionNumber, textInput, 'txt', true, fee);
            }
            if (tabKey === 'domain') {
                console.log(domainInput);
                const domainString = `{ "p": "sns", "op": "reg", "name": "${domainInput}.sats" }`
                socket.emit("createOrder", paymentHash, onChainAddress, positiveInscriptionNumber, domainString, 'txt', true, fee);
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
                socket.emit("createOrder", paymentHash, onChainAddress, positiveInscriptionNumber, newsString, 'txt', true, fee);
            }
            if (tabKey === 'brc') {
                var brcString = "";
                if (brcRadioButton === "deploy") {
                    brcString = `{ "p": "brc-20", "op": "deploy", "tick": "${tokenTicker}", "max": "${tokenSupply}", "lim": "${mintLimit}" }`

                }
                else if (brcRadioButton === "mint") {
                    brcString = `{ "p": "brc-20", "op": "mint", "tick": "${tokenTicker}", "amt": "${mintAmount}" }`
                }
                console.log(brcString);
                socket.emit("createOrder", paymentHash, onChainAddress, positiveInscriptionNumber, brcString, 'txt', true, fee);

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
            await setOnChainAddress(await (await getAddressInfoLedger(ledgerPublicKey, false)).address)
        }
        getLedgerAddress()

    }, [ledgerPublicKey])

    useEffect(() => {
        if (!ledgerPublicKey) return
        async function verifyAddress() {
            setShowWalletConnectModal(true)
            await getAddressInfoLedger(ledgerPublicKey, true)

        }
        verifyAddress()

    }, [onChainAddress, ledgerPublicKey])



    return (
        <div className="App" >
            <Head>
                <meta name="description" content="Ordimint offers an easy-to-use Wallet and Inscription service for Bitcoin Ordinals, enabling seamless Ordinal management and minting of unique Bitcoin inscriptions." />
                <title>Ordimint - Inscribe</title>
                <meta name="keywords" content="Bitcoin, Lightning, Ordinals, Inscriptions, NFT, Wallet, Asset Management, Minting" />
            </Head>

            <Container>
                <div className='main-middle'>
                    <Row>
                        <Col id='left-side-container'>
                            <div id="tab-container">
                                <p>What do you want to inscribe:</p>
                                <Tabs
                                    transition={false}
                                    activeKey={tabKey}
                                    onSelect={(k) => setTabKey(k)}
                                    justify
                                    fill
                                >

                                    <Tab eventKey="file" title="File">
                                        {/* <FileUpload
                                            file={file}
                                            setFile={setFile}
                                            setFileSize={setFileSize}
                                            setFileType={setFileType}
                                            fileTooBig={fileTooBig}
                                            fileSize={fileSize}
                                            setFileName={setFileName}
                                            fileName={fileName}
                                        /> */}
                                        <FileUpload
                                            file={file}
                                            fileType={fileType}
                                            fileName={fileName}
                                            setFile={setFile}
                                            setFileType={setFileType}
                                            setFileName={setFileName}
                                            setFileSize={setFileSize}
                                            fileTooBig={fileTooBig}
                                        />

                                    </Tab>
                                    <Tab eventKey="text" title="Text">
                                        <TextInput
                                            setFileSize={setFileSize}
                                            textInput={textInput}
                                            setTextInput={setTextInput}
                                        />
                                    </Tab>
                                    <Tab eventKey="news" title="News">
                                        <NewsInput
                                            setFileSize={setFileSize}
                                            setNewsAuthor={setNewsAuthor}
                                            setNewsText={setNewsText}
                                            setNewsTitle={setNewsTitle}
                                            setNewsUrl={setNewsUrl}
                                        />
                                    </Tab>
                                    <Tab eventKey="domain" title="Domain">
                                        <DomainInput
                                            setFileSize={setFileSize}
                                            domainInput={domainInput}
                                            setDomainInput={setDomainInput}

                                        />
                                    </Tab>
                                    <Tab eventKey="brc" title="BRC-20">
                                        <BRC
                                            setTokenTicker={setTokenTicker}
                                            setFileSize={setFileSize}
                                            tokenSupply={tokenSupply}
                                            setTokenSupply={setTokenSupply}
                                            tokenName={tokenTicker}
                                            setTokenName={setTokenTicker}
                                            mintLimit={mintLimit}
                                            setMintLimit={setMintLimit}
                                            mintAmount={mintAmount}
                                            setMintAmount={setMintAmount}
                                            onChange={setbrcRadioButton}
                                            brcRadioButton={brcRadioButton}
                                        />

                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                        <Col id="right-side-container">
                            <div id="inscription-number-selection">
                                <p>Do you want a positive or negative <br /> Inscription Number?</p>
                                <InscriptionNumberSwitch
                                    onChange={(value) => setPositiveInscriptionNumber(value)}
                                />

                            </div>

                            {
                                (nostrPublicKey || ledgerPublicKey || ordimintPubkey) ? (
                                    <>
                                        {nostrPublicKey ? (
                                            <>
                                                <div className="success-alert-input input-button">
                                                    <p>Your receiver address:</p>
                                                    <OnchainInput
                                                        onChainAddress={getAddressInfoNostr(nostrPublicKey).address}
                                                        setOnChainAddress={setOnChainAddress}
                                                    />
                                                    <WalletConnectModal
                                                        address={getAddressInfoNostr(nostrPublicKey).address}
                                                        show={showWalletConnectModal}
                                                        handleClose={() => setShowWalletConnectModal(false)}
                                                    />
                                                </div>
                                            </>
                                        ) : ledgerPublicKey ? (
                                            <>
                                                <div className="success-alert-input input-button">
                                                    <p>Your receiver address:</p>
                                                    <OnchainInput
                                                        onChainAddress={onChainAddress}
                                                        setOnChainAddress={setOnChainAddress}
                                                    />
                                                    <WalletConnectModal
                                                        address={onChainAddress}
                                                        show={showWalletConnectModal}
                                                        handleClose={() => setShowWalletConnectModal(false)}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="success-alert-input input-button">
                                                    <p>Your receiver address:</p>
                                                    <OnchainInput
                                                        onChainAddress={onChainAddress}
                                                        setOnChainAddress={setOnChainAddress}
                                                    />
                                                </div>
                                                <WalletConnectModal
                                                    address={onChainAddress}
                                                    show={showWalletConnectModal}
                                                    handleClose={() => setShowWalletConnectModal(false)}
                                                />

                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="input-button">
                                        <p>How do you want to receive your Ordinal?
                                            <br />
                                            Enter an on-chain address or use a wallet.
                                        </p>
                                        <OnchainInput
                                            onChainAddress={onChainAddress}
                                            setOnChainAddress={setOnChainAddress}
                                        />
                                        <div id="wallet-buttons">
                                            <Button
                                                className="m-1"
                                                onClick={async () => {
                                                    setNostrPublicKey(await connectWallet());
                                                    setOnChainAddress(await getAddressInfoNostr(await connectWallet()).address);
                                                    setShowWalletConnectModal(true);
                                                }}
                                                variant="success"
                                                size="md"
                                            >
                                                <Image src={AlbyLogo} height="20" width="20" alt="Alby Logo" /> use Alby Wallet
                                            </Button>

                                            <Button
                                                className="m-1"
                                                onClick={async () => {
                                                    setLedgerPublicKey(await getLedgerPubkey(false));
                                                    setOnChainAddress(await (await getAddressInfoLedger(ledgerPublicKey, false)).address);
                                                }}
                                                variant="success"
                                                size="md"
                                            >
                                                <Image src={LedgerLogo} height="20" width="20" alt="Ledger Logo" /> use Ledger HW
                                            </Button>
                                        </div>
                                        <div>
                                            <Button onClick={renderSelectWalletModal}
                                                variant="success"
                                                size="md"
                                            >
                                                <Image src={OrdimintLogo} height="20" width="20" alt="Ordimint Logo" /> use Ordimint Wallet
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }
                            <div id="fee-select-container">
                                <p>How fast should your Ordinal be minted?</p>
                                <FeeRange
                                    setFee={(e) => {
                                        setFee(e.target.value)
                                    }}
                                    value={fee}
                                />
                            </div>
                        </Col>
                    </Row>


                    <Price
                        price={price}
                    />
                    <Button
                        onClick={() => {
                            getInvoice(price);
                            renderAlert(false);
                            // showInvoiceModal();
                            hideConfigModal();
                            updatePaymentrequest();
                            setSpinner(true);
                            isPaid = false;
                        }}
                        variant="success"
                        size="lg"
                    // disabled
                    >
                        Pay with Lightning
                    </Button>
                    <div id='info-text-home-bottom'>
                        <p className='mt-2'>We mint directly to your address. No intermediaries.</p>
                        <p>You get ~10.000 Sats back when you receive the Ordinal.</p>
                    </div>
                    <Footer />
                </div>
            </Container >
            <AlertModal
                show={alertModalparams.show}
                text={alertModalparams.text}
                variant={alertModalparams.type}
                handleClose={hideAlertModal}
            />
            <ReceiveAddressModal
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
                handleGenerateWallet={handleGenerateWallet}
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
                showRestoreWalletModal={showRestoreWalletModal}
                handleRestoreWalletModalClose={handleRestoreWalletModalClose}
                restoreWallet={(e) => handleRestoreWallet(e)}
            // setOrdimintPubkey={setOrdimintPubkey}
            // setAddress={setAddress}
            // setPrivateKey={setPrivateKey}
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
