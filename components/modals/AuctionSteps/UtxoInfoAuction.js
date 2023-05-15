import React from 'react'
import { TailSpin } from 'react-loading-icons'
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import UtxoImageAuction from './UtxoImageAuction';
import InscriptionsDetailsAuction from './InscriptionsDetailsAuction';

export default function UtxoInfoAuction({ utxosReady, ownedUtxos, setShowUtxoModal, setCurrentUtxo, inscriptionUtxosByUtxo }) {
    if (!utxosReady) return (

        <>
            <p>Wallet loading...</p>
            <br /><br />
            <TailSpin stroke="#ffffff" speed={.75} />
            <br /><br />
        </>)



    return (

        <div>
            {
                ownedUtxos.length === 0 ?
                    <>
                        <div>
                            This address doesn't own anything yet... <a href="/">Inscribe something</a>
                        </div>
                    </>
                    :
                    <>
                        <br />
                        <Container id="ordinal-container" fluid>

                            <ol id="wallet-thumbnails-auction">
                                {ownedUtxos.map(it => {
                                    return (
                                        <li
                                            className="hover-pointer gallery-item wallet-list-item-auction"
                                            key={it.txid}
                                            onClick={() => {
                                                setCurrentUtxo(it);
                                            }}
                                        >
                                            {
                                                !inscriptionUtxosByUtxo[`${it.txid}:${it.vout}`] ?
                                                    <>
                                                        <br /><br />
                                                        <TailSpin stroke="#ffffff" speed={.75} />
                                                        <br /><br />
                                                    </>
                                                    :
                                                    <UtxoImageAuction utxo={it} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />
                                            }
                                            <InscriptionsDetailsAuction utxo={it} />
                                        </li>
                                    )
                                })}
                            </ol>

                        </Container>

                    </>
            }
        </div >)
}
