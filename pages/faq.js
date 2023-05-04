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
                                    <p>Ordimint is a user-friendly Lightning app that enables users to create inscriptions on the Bitcoin blockchain. The app features a non-custodial wallet, which connects to your Nostr key through the <a href="https://getalby.com" target="_blank">Alby</a> browser extension. Additionally, it offers <a href="https://www.ledger.com" target="_blank">Ledger</a> hardware wallet integration and a non-custodial web wallet.</p>
                                    <p>Ordimint also hosts its own <a href="https://explorer.ordimint.com" target="_blank">Ordinal explorer</a> and utilizes a Lightning backend, powered by <a href="https://lnbits.com" target="_blank">Lnbits</a> and its dedicated node. To enhance the user experience, a collection page is available for browsing all existing Ordinal collections.</p>
                                </Accordion.Body>

                            </Accordion.Item>
                            <Accordion.Item eventKey="011">
                                <Accordion.Header>How does it work?</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup variant="flush" numbered>
                                        <ListGroup.Item>
                                            You upload a file, text, chose your domain or a BRC-20 token which should be stored as an Inscription on the Bitcoin Blockchain.
                                            To avoid overloading the blockchain, the file size is limited to 0.7MB (700KB).
                                            The smaller the file, the more cost-effective the inscription. Simple, right?
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            You provide a receiver's on-chain address or use one of the supported wallets to which the Inscription should be minted. To track the Inscription on the blockchain, the Ordinal theory is used.
                                            You can receive the Inscription on any wallet, but make sure not to spend this UTXO. Therefore we recommend to use one of our supported wallets.
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Pay with Lightning
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Check your order status. Please be patient! It will take some time to mint the Ordinal. It will be minted directly to your wallet without any intermediaries.
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="0222">
                                <Accordion.Header>What are Bitcoin inscriptions?</Accordion.Header>
                                <Accordion.Body>
                                    <p>A Bitcoin inscription is a convention where satoshis can be inscribed with arbitrary content, creating a unique Bitcoin-native digital artifact or, as it is called on other blockchains, an NFT. Using this convention, these inscriptions can be sent and stored in a Bitcoin unspent transaction output (UTXO).
                                    </p><p>
                                        The inscription process embeds the data of the content into the witness data of the Bitcoin transaction. The witness data was introduced in the SegWit upgrade to the Bitcoin network in 2017.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="0333">
                                <Accordion.Header>What is the difference between a Bitcoin inscription and an NFT?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Inscriptions don't require a separate token. A Bitcoin inscription is a type of Bitcoin-native digital artifact. It is created by inscribing arbitrary content onto satoshis (the smallest unit of Bitcoin) and can be transferred and stored in a Bitcoin unspent transaction output (UTXO).</p>
                                    <p>An NFT (non-fungible token) is a unique digital asset that represents ownership of a specific item or piece of content, such as a piece of art or a collectible. NFTs can be created on various blockchain platforms. Different from Bitcoin, the data is most likely stored off-chain on an IPFS.</p>
                                    <p>The main difference between a Bitcoin inscription and an NFT is that a Bitcoin inscription is specific to the Bitcoin blockchain and is created by inscribing content onto satoshis, so the data is stored on-chain. In contrast, while an NFT can be created on various blockchain platforms, they are most likely only linked to an external off-chain storage.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="0444">
                                <Accordion.Header>What is the difference between a positive and negative Inscription number?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        The original Ordinal theory says that Inscriptions can only be seen as they are on the first input of a transaction. This is the positive Ordinal number, the original one.

                                    </p>
                                    <p>But there are already also some Inscriptins on a input different from the first one. These Inscriptions are some kind of lost in the moment. Therefore the idea came up to give them negative Inscription numbers. This has two advantages:</p>
                                    <ol>
                                        <li>Old/original Inscription numbers are not affected.</li>
                                        <li>Lost or unsean Inscriptins become visible and get a unique Inscription number.</li>
                                    </ol>
                                    <p>So Ordimint offers you now the option to chose between a positive(original) Inscription number or a negative one.</p>
                                </Accordion.Body>
                            </Accordion.Item>


                            <Accordion.Item eventKey="0111">
                                <Accordion.Header>What file types can be inscribed?</Accordion.Header>
                                <Accordion.Body>
                                    <p>apng, flac, gif, html, jpg, mp3, pdf, png, svg, txt, wav, webm, webp</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="01111">
                                <Accordion.Header>Can I send an Ordinal to any BTC address?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Yes! You can send an Ordinal (.sats domain, pictures, text, etc.) to any valid BTC address.
                                        If you have a wallet without coin control, you should just store your Ordinal there.
                                        If you want to send your Ordinal from your wallet, make sure it supports coin control or wait until your wallet supports coin control.

                                    </p>
                                    <p>
                                        <b>With our wallet, you can send and receive your Ordinals securely.</b>
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="011111">
                                <Accordion.Header>How does the Alby wallet work?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Before using the Alby wallet, ensure that you've installed the <a href="https://getalby.com/" target="_blank"
                                        rel="noreferrer">Alby extension</a> and configured your Nostr key. You can refer to these guides <a href="https://blog.getalby.com/the-2-minute-alby-guide-to-nostr/" target="_blank"
                                            rel="noreferrer">here</a> and <a href="https://blog.getalby.com/how-to-use-nostr-with-the-alby-extension/" target="_blank"
                                                rel="noreferrer">here</a> for assistance. Don't forget to back up your Nostr key!</p>
                                    <p>Please note that your Ordinals will be managed by your Nostr private key. Currently, it's not possible to import this key into various other wallets. The primary focus is on managing inscriptions easily and effectively.</p>
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
                                            Connect your Ledger hardware wallet to your computer using the USB cable provided and unlock it by entering your PIN code. After that, open the Bitcoin app on your Ledger.
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Go to the <a href="/wallet"> Wallet section</a>, click on the "Connect" button, and wait for the app to detect your device.
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Once your device is connected, you should be able to use our Ordinal wallet with your Ledger wallet.
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <p>
                                        That's it! When you want to receive an Ordinal or mint it to your Ledger, make sure to confirm the address on the device.
                                        <br></br>
                                        <b>Important: The transaction will not be visible in your Ledger Live app. This is to prevent interference with your existing accounts and to avoid accidentally sending funds to your Ordinal account or sending your Ordinal accidentally to another account.
                                        </b>
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="022233">
                                <Accordion.Header>How does the Ordimint wallet work?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        The Ordimint Wallet allows you to create, restore, and manage your non-custodial Ordinal wallet. The wallet can be used to mint, receive and send Ordinals.
                                    </p>
                                    <p>
                                        To get started, you can either generate a new wallet or restore an existing wallet from a backup file. Once your wallet is set up, you will be able to see your wallet address for receiving Ordinals.
                                    </p>
                                    <p>
                                        Please make sure to back up your wallet by writing down the provided seed phrase and downloading the backup file. The seed phrase is essential for recovering your wallet in case you lose the backup file.
                                    </p>
                                    <p>
                                        If you need to restore your wallet, just use the "Restore Wallet" option and select your backup file.
                                    </p>
                                    <p>
                                        You can view your Ordinals and when you want to send it to another wallet, simply follow the on-screen instructions to enter the destination address, select a fee rate, and confirm the transaction. Please make sure that the other wallet is Ordinal ready.
                                    </p>
                                    <p>
                                        Remember to always keep your seed phrase and backup file safe, as they are the only ways to recover your wallet in case of loss or damage.
                                    </p>
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
