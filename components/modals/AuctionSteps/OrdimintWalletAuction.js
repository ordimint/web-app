import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { restoreWallet } from '../../WalletConfig/ordimintWalletFunctions.js'
import { Container, Button } from 'react-bootstrap';
import { BsBoxArrowInDownLeft } from "react-icons/bs"
import UtxoInfoAuction from './UtxoInfoAuction.js';
import ReceiveAddressModal from '../ReceiveAddressModal';
import { TestnetContext } from '../../../contexts/TestnetContext.js';


const OrdimintWalletAuction = () => {
    const { testnet } = React.useContext(TestnetContext);
    const [ordimintPubkey, setOrdimintPubkey] = useState(null);
    const [privateKey, setPrivateKey] = useState(null);
    const [address, setAddress] = useState(null);
    const [ownedUtxos, setOwnedUtxos] = useState([]);
    const [utxosReady, setUtxosReady] = useState(false)
    const [inscriptionUtxosByUtxo, setInscriptionUtxosByUtxo] = useState({})

    const [showReceiveAddressModal, setShowReceiveAddressModal] = useState(false);


    useEffect(() => {
        async function fetchUtxosForAddress() {
            if (!address) return
            const mempoolUrl = testnet ? 'https://mempool.space/testnet/api' : 'https://mempool.space/api';
            const response = await axios.get(`${mempoolUrl}/address/${address}/utxo`)
            const tempInscriptionsByUtxo = {}
            setOwnedUtxos(response.data)
            for (const utxo of response.data) {
                tempInscriptionsByUtxo[`${utxo.txid}:${utxo.vout}`] = utxo
                // if (!utxo.status.confirmed) continue
                let currentUtxo = utxo
                console.log('utxo', utxo)

                console.log(`Checking utxo ${currentUtxo.txid}:${currentUtxo.vout}`)
                try {
                    const explorerUrl = testnet ? 'https://testnet.ordimint.com' : 'https://explorer.ordimint.com';
                    const res = await axios.get(`${explorerUrl}/output/${currentUtxo.txid}:${currentUtxo.vout}`)
                    const inscriptionId = res.data.match(/<a href=\/inscription\/(.*?)>/)?.[1]
                    const [txid, vout] = inscriptionId.split('i')
                    currentUtxo = { txid, vout }
                } catch (err) {
                    console.log(`Error from explorer.ordimint.com: ${err}`)
                }
                tempInscriptionsByUtxo[`${utxo.txid}:${utxo.vout}`] = currentUtxo
                const newInscriptionsByUtxo = {}
                Object.assign(newInscriptionsByUtxo, tempInscriptionsByUtxo)
                setInscriptionUtxosByUtxo(newInscriptionsByUtxo)
                setUtxosReady(true)
            }
            setInscriptionUtxosByUtxo(tempInscriptionsByUtxo)
            setUtxosReady(true)
        }


        fetchUtxosForAddress()
    }, [ordimintPubkey, address]);

    const handleRestoreWallet = async (event, testnet) => {
        try {
            const { restoredAddress, restoredPubkey, restoredPrivateKey } = await restoreWallet(event, testnet);
            setAddress(restoredAddress);
            setPrivateKey(restoredPrivateKey);
            setOrdimintPubkey(restoredPubkey);

        } catch (error) {
            console.error('Error:', error);

        }
    };


    return (
        <div>
            <Container className="main-container d-flex flex-column text-center align-items-center justify-content-center">
                {/* <h1 className='m-3'>Ordimint Wallet</h1> */}
                {
                    address ?
                        <div>
                            {/* <Button variant="primary" size="lg" className="mx-3 shadowed-orange-small"
                                onClick={async () =>
                                    setShowReceiveAddressModal(true)}>
                                Receive<BsBoxArrowInDownLeft />
                            </Button> */}
                        </div>
                        :
                        <>

                            <div className="d-flex justify-content-center">
                                <input
                                    type="file"
                                    className="d-none"
                                    id="restoreWalletFile"
                                    accept=".txt"
                                    onChange={(event) => handleRestoreWallet(event)}
                                />
                                <Button variant="primary" size="lg" onClick={() => document.getElementById('restoreWalletFile').click()}>
                                    Choose Backup File
                                </Button>
                            </div>


                        </>
                }
                <br /><br />
                {address &&
                    <div>
                        <UtxoInfoAuction
                            utxosReady={utxosReady}
                            ownedUtxos={ownedUtxos}
                            testnet={testnet}
                            // setShowUtxoModal={setShowUtxoModal}
                            setCurrentUtxo={props.setCurrentUtxo}
                            inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
                        />
                    </div>}
            </Container>
            <ReceiveAddressModal
                testnet={testnet}
                showReceiveAddressModal={showReceiveAddressModal}
                setShowReceiveAddressModal={setShowReceiveAddressModal}
                ordimintAddress={address}

            />
        </div>
    )
}

export default OrdimintWalletAuction
