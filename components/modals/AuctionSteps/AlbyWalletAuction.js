import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { restoreWallet } from '../../WalletConfig/ordimintWalletFunctions.js'
import { Container, Button } from 'react-bootstrap';
import { BsBoxArrowInDownLeft } from "react-icons/bs"
import UtxoInfoAuction from './UtxoInfoAuction.js';
import ReceiveAddressModal from '../ReceiveAddressModal';
import { getAddressInfoNostr, connectWallet } from '../../WalletConfig/utils.js';


const AlbyWalletAuction = (props) => {

    const [nostrPublicKey, setNostrPublicKey] = useState(null);
    const [showReceiveAddressModal, setShowReceiveAddressModal] = useState(false);
    const [ownedUtxos, setOwnedUtxos] = useState([]);
    const [utxosReady, setUtxosReady] = useState(false)
    const [inscriptionUtxosByUtxo, setInscriptionUtxosByUtxo] = useState({})

    useEffect(() => {
        async function fetchUtxosForAddress() {
            if (!nostrPublicKey) return
            const address = getAddressInfoNostr(nostrPublicKey).address
            const response = await axios.get(`https://mempool.space/api/address/${address}/utxo`)
            const tempInscriptionsByUtxo = {}
            setOwnedUtxos(response.data)
            for (const utxo of response.data) {
                tempInscriptionsByUtxo[`${utxo.txid}:${utxo.vout}`] = utxo
                // if (!utxo.status.confirmed) continue
                let currentUtxo = utxo
                console.log('utxo', utxo)

                console.log(`Checking utxo ${currentUtxo.txid}:${currentUtxo.vout}`)
                try {
                    const res = await axios.get(`https://explorer.ordimint.com/output/${currentUtxo.txid}:${currentUtxo.vout}`)
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
        connectOnLoad()
        fetchUtxosForAddress()
    }, [nostrPublicKey]);

    async function connectOnLoad() {
        setNostrPublicKey(await connectWallet())
    }



    return (
        <div>
            <Container className="main-container d-flex flex-column text-center align-items-center justify-content-center">

                {nostrPublicKey &&
                    <div>
                        <UtxoInfoAuction
                            utxosReady={utxosReady}
                            ownedUtxos={ownedUtxos}
                            setCurrentUtxo={props.setCurrentUtxo}
                            inscriptionUtxosByUtxo={inscriptionUtxosByUtxo}
                        />
                    </div>
                }

            </Container>


            <ReceiveAddressModal
                showReceiveAddressModal={showReceiveAddressModal}
                setShowReceiveAddressModal={setShowReceiveAddressModal}
                nostrPublicKey={nostrPublicKey}

            />
        </div>
    )
}

export default AlbyWalletAuction
