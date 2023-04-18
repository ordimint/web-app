import { React, useEffect } from 'react';
import { io } from "socket.io-client";
import FileUpload from '../components/FileUpload';
import OnchainInput from '../components/OnchainInput';
import InvoiceModal from '../components/modals/InvoiceModal';
import { validate } from 'bitcoin-address-validation';
import Footer from '../components/Footer';
import Image from 'next/image';
import { Row, Container, Button, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import AlbyLogo from '../public/media/alby_icon_yellow.svg';
import LedgerLogo from '../public/media/ledger-logo-small.svg';
import AlertModal from '../Components/modals/AlterModal';
import FeeRange from '../Components/FeeRange';
import Price from '../Components/Price';
import ReceiveAddressModal from '../Components/modals/ReceiveAddressModal';
import WalletConnectModal from '../Components/modals/WalletConnectModal';
import { getAddressInfoNostr, connectWallet } from '../Components/WalletConfig/utils';
import { getLedgerPubkey, getAddressInfoLedger } from '../Components/WalletConfig/connectLedger';
import TextInput from '../Components/TextInput';
import DomainInput from '../Components/DomainInput';
import NewsInput from '../Components/NewsInput';
import BRC from '../Components/BRC';


var socket = io.connect(process.env.REACT_APP_socket_port);
var clientPaymentHash;
var isPaid = false; //Is only necessary in the case of socket event is fireing multible times

const outputCost = process.env.REACT_APP_output_cost;
const securityBuffer = process.env.REACT_APP_security_buffer;


// const getFeesRecommended = async () => {
//     const response = await fetch("https://mempool.space/api/v1/fees/recommended");
//     const data = await response.json();
//     return data;
// };


function Home() {
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
    const [domainAvailable, setDomainAvailable] = useState(true) //muss geändert werden

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
    const [file, setFile] = useState("/media/dorian-nakamoto.jpg");
    const [fileSize, setFileSize] = useState(1000);
    const [fileType, setFileType] = useState("jpeg");
    ///////Fee and price

    // useEffect(() => {
    //     getFeesRecommended().then(data => setFee(data.fastestFee))
    // }, [])




    async function checkDomain(domain) {
        try {
            const response = await fetch(`https://api.sats.id/names/${domain}.sats`)
            const responseJSON = await response.json()
            // console.log(responseJSON)
            if (responseJSON.owner) {
                console.log(responseJSON)
                setDomainAvailable(false) ////
            }
            else {
                setDomainAvailable(true)
            }
        } catch (error) {
            console.log(error)

        }

    }


    const [fee, setFee] = useState(20);
    const [price, setPrice] = useState(1);

    useEffect(() => {
        var priceSats = (Math.trunc((fileSize / 4) * fee * securityBuffer) + parseInt(outputCost));
        setPrice(priceSats);
    }, [fileSize, fee]);

    ///////Successfull payment alert
    const renderAlert = (show) => {
        setPaymentAlert(show);
    };
    const fileTooBig = () => {
        showAlertModal({
            show: true,
            text: "File is too big! (>0.5MB)",
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
        else if (!domainAvailable && tabKey === 'domain') {
            showAlertModal({
                show: true,
                text: "Domain is not available",
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
                    socket.emit("createOrder", paymentHash, onChainAddress, dataUrl, fileType, false, fee);
                });
            }
            if (tabKey === 'text') {
                console.log(textInput);
                socket.emit("createOrder", paymentHash, onChainAddress, textInput, 'txt', true, fee);
            }
            if (tabKey === 'domain') {
                console.log(domainInput);
                const domainString = `{ "p": "sns", "op": "reg", "name": "${domainInput}.sats" }`
                socket.emit("createOrder", paymentHash, onChainAddress, domainString, 'txt', true, fee);
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
                socket.emit("createOrder", paymentHash, onChainAddress, newsString, 'txt', true, fee);
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
                socket.emit("createOrder", paymentHash, onChainAddress, brcString, 'txt', true, fee);

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
            <Container>
                <Row>
                    <div className='main-middle'>
                        <h5>What do you want to inscribe:</h5>
                        <div id="tab-container">
                            <Tabs
                                transition={false}
                                activeKey={tabKey}
                                onSelect={(k) => setTabKey(k)}
                                justify
                                fill
                            >

                                <Tab eventKey="file" title="File">
                                    <FileUpload
                                        file={file}
                                        setFile={setFile}
                                        setFileSize={setFileSize}
                                        setFileType={setFileType}
                                        fileTooBig={fileTooBig}
                                        fileSize={fileSize}
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
                                        // newsTitle={newsTitle}
                                        // newsText={newsText}
                                        // newsUrl={newsUrl}
                                        // newsAuthor={newsAuthor}
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
                                        // checkDomain={checkDomain} muss wieder raus
                                        domainAvailable={domainAvailable}
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


                        {(nostrPublicKey || ledgerPublicKey) ?
                            <>
                                {nostrPublicKey ?
                                    <>
                                        <div className='success-alert-input'>
                                            <OnchainInput
                                                onChainAddress={getAddressInfoNostr(nostrPublicKey).address}
                                                setOnChainAddress={setOnChainAddress}

                                            />
                                            <WalletConnectModal
                                                address={getAddressInfoNostr(nostrPublicKey).address}
                                                show={showWalletConnectModal}
                                                handleClose={() => setShowWalletConnectModal(false)} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='success-alert-input'>
                                            <OnchainInput
                                                onChainAddress={onChainAddress}
                                                setOnChainAddress={setOnChainAddress}

                                            />
                                            <WalletConnectModal
                                                address={onChainAddress}
                                                show={showWalletConnectModal}
                                                handleClose={() => setShowWalletConnectModal(false)} />
                                        </div>
                                    </>}
                            </>
                            :
                            <div id='input-button'>
                                <OnchainInput
                                    onChainAddress={onChainAddress}
                                    setOnChainAddress={setOnChainAddress}
                                />
                                <p>or</p>
                                <div id="wallet-buttons">
                                    <Button
                                        className='m-1'
                                        onClick={async () => {
                                            setNostrPublicKey(await connectWallet());
                                            setOnChainAddress(await getAddressInfoNostr(await connectWallet()).address);
                                            setShowWalletConnectModal(true);
                                        }

                                        }
                                        variant="success"
                                        size="md"
                                    ><Image src={AlbyLogo} height="20" width="20" alt="Alby Logo" /> use Alby Wallet</Button>

                                    <Button
                                        className='m-1'
                                        onClick={async () => {
                                            setLedgerPublicKey(await getLedgerPubkey(false));
                                            setOnChainAddress(await (await getAddressInfoLedger(ledgerPublicKey, false)).address);
                                        }

                                        }
                                        variant="success"
                                        size="md"
                                    ><Image src={LedgerLogo} height="20" width="20" alt="Ledger" /> use Ledger HW</Button>
                                </div>
                            </div>
                        }

                        <FeeRange
                            setFee={(e) => {
                                setFee(e.target.value)
                            }}
                            value={fee}
                        />
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

                </Row>

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
        </div >
    );
}

export default Home;
