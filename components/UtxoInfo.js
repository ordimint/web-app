import React, { useState } from 'react';
import { TailSpin } from 'react-loading-icons';
import { Row, Col, Card, Container, Button, Pagination } from 'react-bootstrap';
import UtxoImage from './UtxoImage';
import InscriptionsDetails from './InscriptionsDetails';

export default function UtxoInfo({ utxosReady, ownedUtxos, setCurrentUtxo, setShowUtxoModal, inscriptionUtxosByUtxo, testnet }) {
  const [activeItemId, setActiveItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!utxosReady) return (
    <>
      <p>Wallet loading...</p>
      <br /><br />
      <TailSpin stroke="#ffffff" speed={.75} />
      <br /><br />
    </>
  );

  const handleItemClick = (item) => {
    setCurrentUtxo(item);
    setActiveItemId(item.txid);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(ownedUtxos.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {ownedUtxos.length === 0 ? (
        <div>
          This address doesn't own anything yet... <a href="/">Inscribe something</a>
        </div>
      ) : (
        <>
          <br />
          <Container fluid>
            <Row id="auction-ordinal-row">
              {paginate(ownedUtxos, itemsPerPage, currentPage).map((it) => {
                return (
                  <Col sm={2} md={4} lg={4} key={it.txid} >
                    <Card className="hover-pointer gallery-item wallet-card"
                      onClick={() => {
                        setCurrentUtxo(it)
                        setShowUtxoModal(true)
                      }}

                    >
                      {!inscriptionUtxosByUtxo[`${it.txid}:${it.vout}`] ? (
                        <>
                          <br />
                          <br />
                          <TailSpin stroke="#ffffff" speed={0.75} />
                          <br />
                          <br />
                        </>
                      ) : (
                        <UtxoImage utxo={it} testnet={testnet} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />
                      )}
                      <InscriptionsDetails
                        utxo={it}
                        testnet={testnet}
                      />
                      <div className='wallet-card-button'>
                        <Button >Details</Button>
                      </div>
                    </Card>
                    {/* </div> */}
                  </Col>
                );
              })}
            </Row>
            <Pagination style={{ zIndex: "5" }}>
              {pageNumbers.map(num => (
                <Pagination.Item style={{ zIndex: "5" }} key={num} active={num === currentPage} onClick={() => handlePageChange(num)}>
                  {num}
                </Pagination.Item>
              ))}
            </Pagination>
          </Container>
        </>
      )
      }
    </div >
  );
}





