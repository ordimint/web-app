import React from 'react'
import { TailSpin } from 'react-loading-icons'
import { cloudfrontUrl, ordinalsImageUrl } from './WalletConfig/utils';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import UtxoImage from './UtxoImage';
export default function UtxoInfo({ utxosReady, ownedUtxos, setShowUtxoModal, setCurrentUtxo, inscriptionUtxosByUtxo }) {
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
            This address doesn't own anything yet... Inscribe something
          </div>
        </>
        :
        <>
          <br />
          <Container>
            <Row xs={1} sm={1} md={2} lg={4} id="wallet-thumbnails">
              {ownedUtxos.map(it => {
                return (

                  <Col>
                    <Card className="hover-pointer gallery-item wallet-card" key={it.txid}
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
                              <UtxoImage utxo={it} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />

                            </>
                        }

                      </Card.Body>
                      <div className='wallet-card-button'>
                        <Button  >Details</Button>
                      </div>
                    </Card>
                  </Col>

                )
              })}
            </Row>
          </Container>
        </>
    }
  </div>)
}
