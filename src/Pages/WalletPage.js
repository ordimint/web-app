import React from 'react'
import NostrWallet from '../Components/NostrWallet'
import { Card, Button } from 'react-bootstrap';
import albyLogo from '../media/alby_icon_yellow.png'
import ledgerLogo from '../media/ledger-logo.svg'
import LedgerWallet from '../Components/LedgerWallet';
import BitBoxLogo from '../media/bitbox-logo.png'
import OrdimintLogo from '../media/logo-dark.jpeg'
import { useState, useEffect } from 'react'
import BitBoxWallet from '../Components/BitBoxWallet';
import Footer from '../Components/Footer'
import OrdimintWallet from '../Components/OrdimintWallet';

const WalletPage = () => {

    const [selectedWallet, setSelectedWallet] = useState(false)
    const [wallet, setWallet] = useState("")
    return (

        <div className='main-middle' >
            <h1>Wallet</h1>
            {!selectedWallet ? (
                <div>

                    <div id="wallet-connect-cards">

                        <Card className='m-2'>
                            <Card.Img className='wallet-logo' style={{ objectFit: "contain" }} variant="top" src={albyLogo} />
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
                            <Card.Img className='wallet-logo' variant="top" src={ledgerLogo} />
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

                        <Card className='m-2'>
                            <Card.Img className='wallet-logo' variant="top" src={OrdimintLogo} />
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
                                >Use Ordimint</Button>
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
