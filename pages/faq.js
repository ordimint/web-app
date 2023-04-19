import React from 'react'
import { Accordion, Container, ListGroup, Col, Row } from "react-bootstrap";
import Footer from '../components/Footer';
import Head from 'next/head';
const FAQ = () => {
    return (
        <div id="faq">
            <Head>
                <title>Ordimint - FAQ</title>
                <meta name="keywords" content="Bitcoin, Ordinal, Inscriptin, FAQ" />
            </Head>
            <h1 className='mb-3'>FAQ</h1>
            <Container>
                <Row xs={1} sm={1} md={1} lg={1}>
                    <Col>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>What is this?</Accordion.Header>
                                <Accordion.Body>
                                    First of all you should have a basic understanding of <a href="https://ordinals.com" target="_blank"
                                        rel="noreferrer" >Ordinals</a>.{" "}
                                    Ordimint is a web application that allows you to mint your own Ordinals on the Bitcoin Blockchain without having to install
                                    the <a href="https://ordinals.com" target="_blank"
                                        rel="noreferrer" >Ord wallet</a> or synchronize the hole blockchain, what is not bad by the way.
                                    We are just builders who want to make things more easy for everyone. Bitcoin is for everyone. So everyone should
                                    be able to use it in its full potential. We offer also a non custodial Ordinal wallet.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="011">
                                <Accordion.Header>How does it work?</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup variant="flush" numbered>
                                        <ListGroup.Item>
                                            You upload a file or text which should be stored as Inscription on the Bitcoin Blockchain.
                                            To not overload the blockchain completely the file size is limited to 0.7MB(700KB).
                                            The smaller the file the cheaper the inscription. Easy, right?
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            You provide a receiver onchain address to which the Inscription should be mited. To track the Inscription on the blockchain the Ordinal theorey is used.
                                            You can receive the Inscription on any wallet but make sure not to spend this UTXO. If you want to send the Inscription to another wallet you have to use the Ord wallet or Sparrow wallet.
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Pay with Lightning
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Check your oder status. Please be patient! It will take some time to mint the Ordinal. It will be minted directly to your wallet without any intermediaries.
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="0222">
                                <Accordion.Header>What are Bitcoin inscriptions?</Accordion.Header>
                                <Accordion.Body>
                                    <p>An inscription is a convention where sats can be inscribed with arbitrary content, a kind of Bitcoin-native digital artifact or NFT. Using the convention, they can be sent around and stored in a Bitcoin unspent transaction output (UTXO). The Inscription process writes or inscribes the data of the content stored into the witness data of the Bitcoin transaction. The witness was introduced in the SegWit upgrade to the Bitcoin network in 2017.</p>

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="0333">
                                <Accordion.Header>What is the difference between a Bitcoin inscription and an NFT?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Inscriptions don't need a token. A Bitcoin inscription is a kind of Bitcoin-native digital artifact or NFT. It is created by inscribing arbitrary content onto sats (the smallest unit of Bitcoin) and can be sent around and stored in a Bitcoin unspent transaction output (UTXO). An NFT (non-fungible token) is a unique digital asset that represents ownership of a specific item or piece of content, such as a piece of art or a collectible. NFTs can be created on various blockchain platforms, not just Bitcoin. The main difference between a Bitcoin inscription and an NFT is that a Bitcoin inscription is specific to the Bitcoin blockchain and is created by inscribing content onto sats, while an NFT can be created on various blockchain platforms and represents ownership of a specific item or piece of content.</p>

                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="0111">
                                <Accordion.Header>What file types are supported?</Accordion.Header>
                                <Accordion.Body>
                                    <p>apng flac gif html jpg mp3 pdf png svg txt wav webm webp</p>

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="01111">
                                <Accordion.Header>Can I send an Ordinal to any BTC address?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Yes! You can send an Ordinal (.sats domain, pictures, text,...) to any valid BTC address.
                                        If you have a wallet without coin controll you should just store your Ordinal there.
                                        If you want to send your Ordinal from your wallet make sure it supports coin controll or wait until your wallet supports coin controll.
                                        <b>With our wallet you can send and receive your Ordinals securely.</b>
                                    </p>

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="011111">
                                <Accordion.Header>How does the Alby wallet work?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Pre-requirements: You have installed the <a href="https://getalby.com/" target="_blank"
                                        rel="noreferrer">Alby extension</a> and have configured your Nostr key (see also these guides <a href="https://blog.getalby.com/the-2-minute-alby-guide-to-nostr/" target="_blank"
                                            rel="noreferrer">here</a> and <a href="https://blog.getalby.com/how-to-use-nostr-with-the-alby-extension/" target="_blank"
                                                rel="noreferrer">here</a>). Make sure you have a backup of your Nostr key!
                                        Please note: your NFTs/inscriptions will be managed by your Nostr private key. It is currently not possible to import this key into various other wallets. The focus here is on simply managing inscriptions with Nos-FT.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="0111111">
                                <Accordion.Header>How does the Ledger wallet work?</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup variant="flush" numbered>
                                        <ListGroup.Item>
                                            Ensure that you have the latest version of Google Chrome installed on your computer.
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Connect your Ledger hardware wallet to your computer using the USB cable provided and unlock it by entering your PIN code. After that open the Bitcoin app on your Ledger.
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Go to the <a href="/wallet"> Wallet section</a> and click on the "Connect" button and wait for the app to detect your device.
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Once your device is connected, you should be able to use our Ordinal wallet with your Ledger wallet.
                                        </ListGroup.Item>
                                        That's it! When you want to receive an Ordinal or mint it to your Ledger make sure to confirm the address on the device.
                                        <br></br>
                                        <b>Important: The transaction will not be visible in your Ledger Live app. This is to prevent interference with your existing accounts and to avoid accidentally sending funds to your Ordinal account or you send your Ordinal accidentally to another account.
                                        </b>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
                <Footer />
            </Container>
        </div >
    )
}

export default FAQ
