import React from 'react'
import NostrWallet from '../components/NostrWallet'
import { Card, Button } from 'react-bootstrap';
import LedgerWallet from '../components/LedgerWallet';
import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import OrdimintWallet from '../components/OrdimintWallet';
import Head from 'next/head';
const WalletPage = () => {

    const [selectedWallet, setSelectedWallet] = useState(false)
    const [wallet, setWallet] = useState("")
    return (

        <div className='main-middle' >
            <Head>
                <title>Ordimint - Wallet</title>
                <meta name="description" content="Ordinals wallet" />
                <meta name="keywords" content="Bitcoin, Ordinals, Wallet, Ledger, Alby" /> {/* Add this line */}
            </Head>
            <h1>Wallet</h1>
            {!selectedWallet ? (
                <div>

                    <div id="wallet-connect-cards">

                        <Card className='m-2'>
                            <Card.Img className='wallet-logo' variant="top" src="/media/logo-dark.jpeg" />
                            <Card.Body>
                                <Card.Title>Ordimint Wallet</Card.Title>
                                <Card.Text>
                                    Create a new Ordimint wallet or restore an existing one.
                                </Card.Text>
                                <Button variant="primary"
                                    onClick={() => {
                                        setSelectedWallet(true)
                                        setWallet("ordimint")
                                    }
                                    }
                                >Use Ordimint Wallet</Button>
                            </Card.Body>
                        </Card>

                        <Card className='m-2'>
                            <Card.Img className='wallet-logo' style={{ objectFit: "contain" }} variant="top" src="/media/alby_icon_yellow.png" />
                            <Card.Body>
                                <Card.Title>Alby Wallet</Card.Title>
                                <Card.Text>
                                    Connect with your {" "}
                                    <a href="https://getalby.com/" target="_blank" rel="noopener noreferrer">
                                        Alby
                                    </a>{" "}
                                    browser extension.
                                </Card.Text>
                                <Button variant="primary"
                                    onClick={() => {
                                        setSelectedWallet(true)
                                        setWallet("alby")
                                    }
                                    }

                                >Connect</Button>
                            </Card.Body>
                        </Card>

                        <Card className='m-2'>
                            <Card.Img className='wallet-logo' variant="top" src="/media/ledger-logo.svg" />
                            <Card.Body>
                                <Card.Title>Ledger</Card.Title>
                                <Card.Text>
                                    Connect your Ledger hardware wallet.
                                </Card.Text>
                                <Button variant="primary"
                                    onClick={() => {
                                        setSelectedWallet(true)
                                        setWallet("ledger")

                                    }
                                    }

                                >Connect</Button>
                            </Card.Body>
                        </Card>


                    </div>
                </div>) :
                (
                    <div>
                        {wallet === "alby" ? <NostrWallet /> : <></>}
                        {wallet === "ledger" ? <LedgerWallet /> : <></>}
                        {wallet === "ordimint" ? <OrdimintWallet /> : <></>}
                    </div>
                )}
            <Footer />
        </div>
    )
}

export default WalletPage
