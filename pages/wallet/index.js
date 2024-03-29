import React from 'react'
import NostrWallet from './alby'
import { Card, Button } from 'react-bootstrap';
import LedgerWallet from './ledger';
import { useState, useEffect } from 'react'
import Footer from '../../components/Footer'

import Head from 'next/head';
import Link from 'next/link';


const WalletPage = () => {



    return (

        <div className='main-middle' >
            <Head>
                <title>Ordimint - Wallet</title>
                <meta name="description" content="Manage your Bitcoin Ordinals securely with the Ordimint Wallet, featuring Ledger and Alby integration for a seamless Ordinal management experience." />
                <meta name="keywords" content="Bitcoin, Ordinals, Wallet, Ledger, Alby, Crypto, Digital Assets, Management" />
                <meta property="og:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ordimint.com/OrdimintSVGLogo-black.svg" />
                <meta property="og:description" content="A website to mint, receive, store or send your Ordinals. View all new Ordinal Collections, Inscribe or use our wallet." />

                <meta name="twitter:card" content="https://ordimint.com/OrdimintSVGLogo-black.svg" />
                <meta name="twitter:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:description" content="A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:image" content="https://ordimint.com/OrdimintSVGLogo-black.svg" />
            </Head>

            <h1>Wallet</h1>

            <div>
                <p className='m-3 text-center'>Our non-custodial Ordinal wallet enables effortless integration with various external wallets, allowing you to select from the available options.<br></br> Alternatively, you can choose to benefit from our own integrated wallet solution.</p>
                <div id="wallet-connect-cards">

                    <Card className='m-2'>
                        <Card.Img className='wallet-logo' variant="top" src="/media/OrdimintSVGLogo-black.svg" />
                        <Card.Body>
                            <Card.Title>Ordimint Wallet </Card.Title>
                            <Card.Text>
                                Use our wallet. No app download needed!
                            </Card.Text>
                            <Link href="/wallet/ordimint" className='d-flex justify-content-center text-decoration-none'>
                                <button className='connect_button'>
                                    Use Ordimint Wallet
                                </button>
                            </Link>

                        </Card.Body>
                    </Card>

                    <Card className='m-2'>
                        <Card.Img className='wallet-logo' style={{ objectFit: "contain" }} variant="top" src="/media/alby_icon_yellow.png" />
                        <Card.Body>
                            <Card.Title>Alby Wallet</Card.Title>
                            <Card.Text>
                                Connect via Nostr and {" "}
                                <a href="https://getalby.com/" target="_blank" rel="noopener noreferrer">
                                    Alby
                                </a>{" "}
                                browser extension.
                            </Card.Text>
                            <Link href="/wallet/alby" className='d-flex justify-content-center text-decoration-none'>
                                <button className='connect_button'>
                                    Connect
                                </button>
                            </Link>
                        </Card.Body>
                    </Card>

                    <Card className='m-2'>
                        <Card.Img className='wallet-logo' variant="top" src="/media/ledger-logo.svg" />
                        <Card.Body>
                            <Card.Title>Ledger</Card.Title>
                            <Card.Text>
                                Connect your Ledger hardware wallet via USB.
                            </Card.Text>
                            <Link href="/wallet/ledger" className='d-flex justify-content-center text-decoration-none'>

                                <button className='connect_button' onClick={() => {


                                }
                                }>
                                    Connect

                                </button>

                            </Link>
                        </Card.Body>
                    </Card>
                    <Card className='m-2'>
                        <Card.Img className='wallet-logo' variant="top" src="/media/unisat-logo.svg" />
                        <Card.Body>
                            <Card.Title>Unisat</Card.Title>
                            <Card.Text>
                                Connect with your Unisat browser wallet.
                            </Card.Text>
                            <Link href="/wallet/unisat" className='d-flex justify-content-center text-decoration-none'>
                                <button className='connect_button' onClick={() => {

                                }
                                }>Connect</button>

                            </Link>
                        </Card.Body>
                    </Card>

                    <Card className='m-2'>
                        <Card.Img className='wallet-logo' variant="top" src="/media/xverse-logo.png" />
                        <Card.Body>
                            <Card.Title>Xverse</Card.Title>
                            <Card.Text>
                                Connect with your Xverse browser wallet.
                            </Card.Text>
                            <Link href="/wallet/xverse" className='d-flex justify-content-center text-decoration-none'>
                                <button className='connect_button'
                                >Connect</button>

                            </Link>
                        </Card.Body>
                    </Card>
                    <Card className='m-2'>
                        <Card.Img className='wallet-logo' variant="top" src="/media/LeatherWalletLogo.svg" />
                        <Card.Body>
                            <Card.Title>Leather</Card.Title>
                            <Card.Text>
                                Connect here with your Leather browser wallet.
                            </Card.Text>
                            <Link href="/wallet/leather" className='d-flex justify-content-center text-decoration-none'>
                                <button className='connect_button'
                                >Connect</button>

                            </Link>
                        </Card.Body>
                    </Card>


                </div>
            </div>

        </div>
    )
}

export default WalletPage
