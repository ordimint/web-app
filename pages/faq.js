import React from 'react'
import { Accordion, Container, ListGroup, Col, Row } from "react-bootstrap";
import Head from 'next/head';
const FAQ = () => {
    return (
        <div id="faq">
            <Head>
                <title>Ordimint - FAQ</title>
                <meta name="keywords" content="Bitcoin, Ordinal, Inscriptin, FAQ" />
                <meta property="og:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ordimint.com/Ordimint-Twitter-card.jpeg" />
                <meta property="og:description" content="A website to mint, receive, store or send your Ordinals. View all new Ordinal Collections, Inscribe or use our wallet." />

                <meta name="twitter:card" content="https://ordimint.com/Ordimint-Twitter-card.jpeg" />
                <meta name="twitter:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:description" content="A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:image" content="https://ordimint.com/Ordimint-Twitter-card.jpeg" />
            </Head>

            <Container className='mt-4'>
                <Row xs={1} sm={1} md={1} lg={2}>
                    <Col >

                        <Accordion className='myAccordion' >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header >
                                    <span className='test'>What is this?</span>
                                </Accordion.Header>
                                <Accordion.Body >
                                    <p>Ordimint is a user-friendly Lightning app that enables users to create inscriptions on the Bitcoin blockchain. The app features a non-custodial wallet, which connects to your Nostr key through the <a href="https://getalby.com" target="_blank">Alby</a> browser extension. Additionally, it offers <a href="https://www.ledger.com" target="_blank">Ledger</a> hardware wallet integration and a non-custodial web wallet.</p>
                                    <p>Ordimint also hosts its own <a href="https://explorer.ordimint.com" target="_blank">Ordinal explorer</a> and utilizes a Lightning backend, powered by <a href="https://lnbits.com" target="_blank">Lnbits</a> and its dedicated node. To enhance the user experience, a collection page is available for browsing all existing Ordinal collections.</p>
                                </Accordion.Body>

                            </Accordion.Item>
                            <Accordion.Item eventKey="011">
                                <Accordion.Header>How does it work?</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup variant="flush" numbered >
                                        <ListGroup.Item className='list_group'>
                                            You upload a file, text, chose your domain or a BRC-20 token which should be stored as an Inscription on the Bitcoin Blockchain.
                                            To avoid overloading the blockchain, the file size is limited to 0.7MB (700KB).
                                            The smaller the file, the more cost-effective the inscription. Simple, right?
                                        </ListGroup.Item>
                                        <ListGroup.Item className='list_group'>
                                            You provide a receiver's on-chain address or use one of the supported wallets to which the Inscription should be minted. To track the Inscription on the blockchain, the Ordinal theory is used.
                                            You can receive the Inscription on any wallet, but make sure not to spend this UTXO. Therefore we recommend to use one of our supported wallets.
                                        </ListGroup.Item>
                                        <ListGroup.Item className='list_group'>
                                            Pay with Lightning
                                        </ListGroup.Item>
                                        <ListGroup.Item className='list_group'>
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

                            <Accordion.Item eventKey="0111">
                                <Accordion.Header>What file types can be inscribed?</Accordion.Header>
                                <Accordion.Body>
                                    <p>apng, gif, jpeg, jpg, png, svg, webp, avif, html, txt, css, js, md, flac, mpeg, wav, webm, mp4, pdf, json, pgp, yaml, gltf, stl</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="0444">
                                <Accordion.Header>What is Mainnet and Testnet?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        <strong>Mainnet</strong> is the main Bitcoin network where actual transactions occur. It is the live, functioning Bitcoin blockchain where users transact with real Bitcoin.
                                    </p>
                                    <p>
                                        <strong>Testnet</strong>, on the other hand, is a separate network that developers use for testing. Bitcoins on this network are not real and do not have any value. This network allows creators and artists to test new Inscriptions or Ordinals without the risk of losing real Bitcoin. This makes it a perfect tool for experimentation.
                                    </p>
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
                            <Accordion.Item eventKey="000001">
                                <Accordion.Header>What are BRC-20 tokens?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        BRC-20 tokens are an experimental standard demonstrating off-chain balance states with inscriptions on the Bitcoin network. They are not meant to be a definitive standard for fungibility and should not be used for financial decisions.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>What is the idea behind BRC-20 tokens?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        The experiment aims to explore if ordinal theory can facilitate fungibility on Bitcoin by creating, minting, and transferring BRC-20 tokens using deploy, mint, and transfer functions.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>How do I get a BRC-20 token balance?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        You can either deploy your own BRC-20 token or mint from existing deployments. Be cautious when using inscription services, as some may inscribe to themselves first and then forward it to the customer. This is not the case wiht our inscription service. We will inscribe directly to your wallet.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>How do I transfer a BRC-20 token balance?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        Inscribe the transfer function to your ordinal compatible wallet and ensure that you have a valid balance on the address you are inscribing to.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>What are the key components of BRC-20 token operations?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        BRC-20 tokens have deploy, mint, and transfer operations, each with specific keys and parameters such as protocol, operation type, ticker, max supply, mint limit, decimals, and amount to mint or transfer.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>What are the limitations and precautions for using BRC-20 tokens?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        BRC-20 tokens are experimental, and their design can be improved. They should not be used for financial decisions.
                                    </p>
                                    <p>
                                        Note: This summary is based on an experimental BRC-20 token standard and should be used for informational purposes only. Use BRC-20 tokens at your own risk, as they may not be suitable for financial decisions or have lasting value.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                    <Col >
                        <Accordion className="myAccordion"
                        >
                            <Accordion.Item eventKey="6">
                                <Accordion.Header>What is the TAP Protocol?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        TAP is an innovative OrdFi-enabling protocol characterized by its unique TAP token standard. It's designed to enhance the capabilities of decentralized finance without relying on overly complicated mechanics.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="7">
                                <Accordion.Header>How does TAP differ from other protocols?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        Unlike many other platforms, TAP doesn't depend on L2 chains. Instead, it utilizes 'tapping', a streamlined mechanism for verifying transactions within the protocol itself.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="8">
                                <Accordion.Header>Is TAP trying to replace BRC-20?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        No, TAP isn't aiming to compete with BRC-20. Instead, it recognizes and embraces the strengths of BRC-20. TAP's mission is to complement and expand upon BRC-20's features, with new additions driven by community governance.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="9">
                                <Accordion.Header>Are there any ticker lengths reserved on TAP?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        Yes, TAP reserves BRC-20 ticker lengths 1, 2, and 4. This ensures these tickers won't be deployed on TAP and lays the foundation for future interordinal integration between BRC-20 and TAP Tokens.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="10">
                                <Accordion.Header>Why are certain ticker lengths reserved on TAP?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        Reserving specific ticker lengths ensures seamless bridging and compatibility between BRC-20 and TAP Tokens in the future, promoting collaborative advancements in the OrdFi space.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="11">
                                <Accordion.Header>What is an OP_RETURN message?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        An OP_RETURN message is a way to add a small note or message to a Bitcoin transaction. Think of it like leaving a short memo on a check. While this message doesn't change anything about the transaction itself, it allows people to include extra information for various purposes, like marking a special occasion or referencing an event.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>




                            <Accordion.Item eventKey="101">
                                <Accordion.Header>What is the Ordimint Affiliate Program?</Accordion.Header>
                                <Accordion.Body>
                                    The Ordimint Affiliate Program allows you to earn Bitcoin by referring new customers to Ordimint. When someone uses your referral link and makes a purchase, you earn a 20% commission in Bitcoin.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="102">
                                <Accordion.Header>How do I join the Ordimint Affiliate Program?</Accordion.Header>
                                <Accordion.Body>
                                    It's simple! Create your unique referral link and provide a Bitcoin address where you'd like to receive your commissions. No account registration is required.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="103">
                                <Accordion.Header>How much can I earn?</Accordion.Header>
                                <Accordion.Body>
                                    You earn a 20% commission for every user you refer who makes a purchase. The sky's the limit! The more users you refer, the more you earn.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="104">
                                <Accordion.Header>When and how do I get paid?</Accordion.Header>
                                <Accordion.Body>
                                    Payouts are made directly to your provided Bitcoin address once a month. Ensure you provide a valid Bitcoin address to receive your commissions. We process payouts as soon as you've earned up to 100k Sats.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="105">
                                <Accordion.Header>Do I need an account to track my earnings?</Accordion.Header>
                                <Accordion.Body>
                                    No account is needed. We send your rewards directly to the Bitcoin address you provide. Ensure you keep track of your referral link and monitor your Bitcoin address for incoming transactions in the meantime.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="106">
                                <Accordion.Header>How can I check my balance?</Accordion.Header>
                                <Accordion.Body>
                                    To check your balance, simply visit our Partners page and enter the Bitcoin address you provided when joining the affiliate program in the designated input field. After clicking on the "Check Balance" button, your current balance in satoshis and the number of orders associated with your referral code will be displayed right below.
                                </Accordion.Body>
                            </Accordion.Item>


                        </Accordion>
                    </Col>






                </Row>

            </Container>
        </div >
    )
}

export default FAQ
