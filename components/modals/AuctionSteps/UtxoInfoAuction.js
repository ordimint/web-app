import React from 'react'
import { TailSpin } from 'react-loading-icons'
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import UtxoImageAuction from './UtxoImageAuction';
import InscriptionsDetailsAuction from './InscriptionsDetailsAuction';

export default function UtxoInfoAuction({ utxosReady, ownedUtxos, setShowUtxoModal, setCurrentUtxo, inscriptionUtxosByUtxo }) {
    if (!utxosReady) return (<>

        <br /><br />
        <TailSpin stroke="#000000" speed={.75} />
        <br /><br />
    </>)



    return (<div>
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
                        <Row xs={1} sm={2} md={2} lg={4} xl={4} xxl={4} id="wallet-thumbnails">
                            {ownedUtxos.map(it => {

                                return (
                                    <Col className="ordinal-column" key={it.txid}>
                                        <Card className="hover-pointer gallery-item wallet-card"
                                            onClick={() => {
                                                setCurrentUtxo(it)
                                                setShowUtxoModal(true)
                                            }}

                                        >
                                            <Card.Body className="wallet-card" >
                                                {
                                                    !inscriptionUtxosByUtxo[`${it.txid}:${it.vout}`] ?
                                                        <>
                                                            <br /><br />
                                                            <TailSpin stroke="#000000" speed={.75} />
                                                            <br /><br />
                                                        </>
                                                        :
                                                        <>

                                                            <UtxoImageAuction utxo={it} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />

                                                        </>
                                                }

                                            </Card.Body>
                                            <InscriptionsDetailsAuction utxo={it} />
                                            <div className='wallet-card-button'>
                                                <Button >Details</Button>
                                            </div>
                                        </Card>
                                    </Col>

                                )
                            })}
                        </Row>
                    </Container>
                </>
        }
    </div >)
}
