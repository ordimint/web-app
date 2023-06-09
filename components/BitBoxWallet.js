// import React from 'react'
// import { useEffect, useState } from 'react'
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
// import { BsBoxArrowInDownLeft } from "react-icons/bs"
// import Alert from 'react-bootstrap/Alert';
// import ReceiveAddressModal from './modals/ReceiveAddressModal';
// import ConfirmationModal from './modals/ConfirmationModal';
// import SelectFeeRateModal from './modals/SelectFeeRateModal';
// import SentModal from './modals/SentModal';
// import BeginSendModal from './modals/BeginSendModal';
// import UtxoModal from './modals/UtxoModal';
// import UtxoInfo from './UtxoInfo';
// import { TESTNET, DEFAULT_FEE_RATE, INSCRIPTION_SEARCH_DEPTH, SENDS_ENABLED } from './WalletConfig/constance';
// import { connectLedger, getAddressInfoLedger } from './WalletConfig/connectLedger';
// import axios from 'axios';
// import { Spinner } from 'react-bootstrap';
// import { BitBox02 } from './WalletConfig/BitBox02';

// import {
//     constants
// } from 'bitbox02-api';



// const BitBoxWallet = () => {
//     var bitBox;
//     const [bitBoxPublicKey, setBitBoxPublicKey] = useState(null);
//     const [showReceiveAddressModal, setShowReceiveAddressModal] = useState(false);
//     const [ownedUtxos, setOwnedUtxos] = useState([]);
//     const [utxosReady, setUtxosReady] = useState(false)
//     const [inscriptionUtxosByUtxo, setInscriptionUtxosByUtxo] = useState({})
//     const [currentUtxo, setCurrentUtxo] = useState(null)
//     const [showUtxoModal, setShowUtxoModal] = useState(false)
//     const [showBeginSendModal, setShowBeginSendModal] = useState(false)
//     const [isBtcInputAddressValid, setIsBtcInputAddressValid] = useState(true);
//     const [destinationBtcAddress, setDestinationBtcAddress] = useState('')
//     const [showSelectFeeRateModal, setShowSelectFeeRateModal] = useState(false)
//     const [showConfirmSendModal, setShowConfirmSendModal] = useState(false)
//     const [sendFeeRate, setSendFeeRate] = useState(DEFAULT_FEE_RATE)
//     const [showSentModal, setShowSentModal] = useState(false)
//     const [sentTxid, setSentTxid] = useState(null)


//     useEffect(() => {
//         async function fetchUtxosForBitBox() {
//             if (!bitBoxPublicKey) return
//             const address = "await" // getAddressInfoBitBox(bitBoxPublicKey).address
//             console.log('address', address)
//             const response = await axios.get(`https://mempool.space/api/address/${address}/utxo`)
//             const tempInscriptionsByUtxo = {}
//             setOwnedUtxos(response.data)
//             for (const utxo of response.data) {
//                 tempInscriptionsByUtxo[`${utxo.txid}:${utxo.vout}`] = utxo
//                 // if (!utxo.status.confirmed) continue
//                 let currentUtxo = utxo
//                 console.log('utxo', utxo)

//                 console.log(`Checking utxo ${currentUtxo.txid}:${currentUtxo.vout}`)
//                 try {
//                     const res = await axios.get(`https://ordinals.com/output/${currentUtxo.txid}:${currentUtxo.vout}`)
//                     const inscriptionId = res.data.match(/<a href=\/inscription\/(.*?)>/)?.[1]
//                     const [txid, vout] = inscriptionId.split('i')
//                     currentUtxo = { txid, vout }
//                 } catch (err) {
//                     console.log(`Error from ordinals.com`)
//                 }
//                 tempInscriptionsByUtxo[`${utxo.txid}:${utxo.vout}`] = currentUtxo
//                 const newInscriptionsByUtxo = {}
//                 Object.assign(newInscriptionsByUtxo, tempInscriptionsByUtxo)
//                 setInscriptionUtxosByUtxo(newInscriptionsByUtxo)
//                 setUtxosReady(true)
//             }
//             setInscriptionUtxosByUtxo(tempInscriptionsByUtxo)
//             setUtxosReady(true)
//         }
//         connectOnLoad()
//         fetchUtxosForBitBox()
//     }, [])

//     async function connectOnLoad() {


//         bitBox = new BitBox02();
//         bitBox.init()
//         // const pubKey = await bitBox.api.btcXPub(constants.messages.BTCCoin.BTC, "m/86'/0'/0'/0/0", constants.messages.BTCXPubType, false)
//         // console.log('pubKey', pubKey)

//         // setBitBoxPublicKey(pubKey.xpub)
//     }

//     return (
//         <div>
//             {/* <div>Peering: {bitBox.pairingCode}</div> */}
//             <Container className="main-container d-flex flex-column text-center align-items-center justify-content-center">
//                 {
//                     bitBoxPublicKey ?
//                         <div>
//                             <Button variant="primary" size="lg" className="mx-3 shadowed-orange-small" onClick={() => setShowReceiveAddressModal(true)}>
//                                 Receive<BsBoxArrowInDownLeft />
//                             </Button>
//                         </div>
//                         :
//                         <>
//                             <div>
//                                 <Alert variant="light">
//                                     Connect your Ledger Nano S to your computer and open the Bitcoin app.
//                                 </Alert>
//                                 <Spinner>

//                                     <span className="sr-only"></span>
//                                 </Spinner>
//                                 <p>Loading....</p>
//                                 {/* <Button
//                                     variant="primary"
//                                     size="lg"
//                                     className="mx-3 shadowed-orange-small"
//                                     onClick={async () => {
//                                         setLedgerPublicKey(await connectWallet())
//                                     }}><img src={ledgerLogo} height="35" alt="Alby Logo" />Connect wallet</Button> */}

//                                 <br />
//                             </div>
//                         </>
//                 }
//                 <br /><br />
//                 {bitBoxPublicKey && <UtxoInfo
//                     utxosReady={utxosReady}
//                     ownedUtxos={ownedUtxos}
//                     setShowUtxoModal={setShowUtxoModal}
//                     setCurrentUtxo={setCurrentUtxo}
//                     inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
//                 />}
//             </Container>


//             <ReceiveAddressModal
//                 showReceiveAddressModal={showReceiveAddressModal}
//                 setShowReceiveAddressModal={setShowReceiveAddressModal}
//                 bitBoxPublicKey={bitBoxPublicKey}
//             />
//             <UtxoModal
//                 setShowBeginSendModal={setShowBeginSendModal}
//                 setShowUtxoModal={setShowUtxoModal}
//                 showUtxoModal={showUtxoModal}
//                 currentUtxo={currentUtxo}
//                 SENDS_ENABLED={SENDS_ENABLED}
//                 inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
//             />
//             <BeginSendModal
//                 showBeginSendModal={showBeginSendModal}
//                 setShowBeginSendModal={setShowBeginSendModal}
//                 currentUtxo={currentUtxo}
//                 setIsBtcInputAddressValid={setIsBtcInputAddressValid}
//                 setDestinationBtcAddress={setDestinationBtcAddress}
//                 setShowSelectFeeRateModal={setShowSelectFeeRateModal}
//                 isBtcInputAddressValid={isBtcInputAddressValid}
//                 TESTNET={TESTNET}
//                 setShowUtxoModal={setShowUtxoModal}
//                 inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
//             />
//             <SelectFeeRateModal
//                 showSelectFeeRateModal={showSelectFeeRateModal}
//                 setShowSelectFeeRateModal={setShowSelectFeeRateModal}
//                 currentUtxo={currentUtxo}
//                 sendFeeRate={sendFeeRate}
//                 setSendFeeRate={setSendFeeRate}
//                 setShowBeginSendModal={setShowBeginSendModal}
//                 setShowConfirmSendModal={setShowConfirmSendModal}
//                 inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
//             />
//             <ConfirmationModal
//                 setShowConfirmSendModal={setShowConfirmSendModal}
//                 showConfirmSendModal={showConfirmSendModal}
//                 setShowSelectFeeRateModal={setShowSelectFeeRateModal}
//                 setShowSentModal={setShowSentModal}
//                 sendFeeRate={sendFeeRate}
//                 currentUtxo={currentUtxo}
//                 bitBoxPublicKey={bitBoxPublicKey}
//                 destinationBtcAddress={destinationBtcAddress}
//                 setSentTxid={setSentTxid}
//                 inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
//             />
//             <SentModal
//                 showSentModal={showSentModal}
//                 setShowSentModal={setShowSentModal}
//                 sentTxid={sentTxid}
//             />


//         </div>
//     )
// }

// export default BitBoxWallet

