import React from 'react'
import NostrWallet from './alby'
import { Card, Button } from 'react-bootstrap';
import LedgerWallet from './ledger';
import { useState, useEffect } from 'react'
import Footer from '../../components/Footer'
// import OrdimintWallet from '../components/OrdimintWallet';
import Head from 'next/head';
import Link from 'next/link';
import TestnetSwicht from '../../components/TestnetSwitch';

const WalletPage = () => {

    const [selectedWallet, setSelectedWallet] = useState(false)
    const [wallet, setWallet] = useState("")

    return (

        <div className='main-middle' >
            <Head>
                <title>Ordimint - Wallet</title>
                <meta name="description" content="Manage your Bitcoin Ordinals securely with the Ordimint Wallet, featuring Ledger and Alby integration for a seamless Ordinal management experience." />
                <meta name="keywords" content="Bitcoin, Ordinals, Wallet, Ledger, Alby, Crypto, Digital Assets, Management" />
                <meta property="og:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ordimint.com/logo-dark.jpeg" />
                <meta property="og:description" content="A website to mint, receive, store or send your Ordinals. View all new Ordinal Collections, Inscribe or use our wallet." />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:description" content="A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:image" content="https://ordimint.com/logo-dark.jpeg" />
            </Head>

            <h1>Wallet</h1>

            <div>
                <p className='m-3 text-center'>Our non-custodial Ordinal wallet enables effortless integration with various external wallets, allowing you to select from the available options.<br></br> Alternatively, you can choose to benefit from our own integrated wallet solution.</p>
                <div id="wallet-connect-cards">

                    <Card className='m-2'>
                        <Card.Img className='wallet-logo' variant="top" src="/media/logo-dark.jpeg" />
                        <Card.Body>
                            <Card.Title>Ordimint Wallet</Card.Title>
                            <Card.Text>
                                Create a new Ordimint wallet or restore an existing one.
                            </Card.Text>
                            <Link href="/wallet/ordimint">
                                <Button variant="primary"
                                >Use Ordimint Wallet</Button></Link>
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
                            <Link href="/wallet/alby">
                                <Button variant="primary"
                                // onClick={() => {
                                //     setSelectedWallet(true)
                                //     setWallet("alby")
                                // }
                                // }

                                >Connect</Button>
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
                            <Link href="/wallet/ledger">
                                <Button variant="primary"
                                    onClick={() => {
                                        setSelectedWallet(true)
                                        setWallet("ledger")

                                    }
                                    }

                                >Connect</Button>
                            </Link>
                        </Card.Body>
                    </Card>


                </div>
            </div>
            <Footer />
        </div>
    )
}

export default WalletPage
