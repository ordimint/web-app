import React, { useState } from 'react';
import { TailSpin } from 'react-loading-icons';
import { Row, Col, Card, Container, Button, Pagination } from 'react-bootstrap';
import UtxoImageAuction from './UtxoImageAuction';
import InscriptionsDetails from '../../InscriptionsDetails';

export default function UtxoInfoAuction({ utxosReady, ownedUtxos, setCurrentUtxo, inscriptionUtxosByUtxo, testnet }) {
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
                                const isActiveItem = activeItemId === it.txid;
                                return (
                                    <Col sm={4} lg={4} key={it.txid} style={{ marginBottom: '20px' }}>
                                        <div
                                            className={`wallet-list-item-auction ${isActiveItem ? 'active' : ''
                                                }`}
                                            onClick={() => handleItemClick(it)}
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
                                                <UtxoImageAuction utxo={it} testnet={testnet} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />
                                            )}
                                            <InscriptionsDetails
                                                utxo={it}
                                                testnet={testnet}
                                            />
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                        <Pagination>
                            {pageNumbers.map(num => (
                                <Pagination.Item key={num} active={num === currentPage} onClick={() => handlePageChange(num)}>
                                    {num}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </Container>
                </>
            )}
        </div>
    );
}





