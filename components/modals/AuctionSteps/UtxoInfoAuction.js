import React, { useState } from 'react';
import { TailSpin } from 'react-loading-icons';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import UtxoImageAuction from './UtxoImageAuction';
import InscriptionsDetails from '../../InscriptionsDetails';

export default function UtxoInfoAuction({ utxosReady, ownedUtxos, setCurrentUtxo, inscriptionUtxosByUtxo }) {
    const [activeItemId, setActiveItemId] = useState(null);

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
                            {ownedUtxos.map((it) => {
                                const isActiveItem = activeItemId === it.txid;
                                return (
                                    <Col sm={6} key={it.txid} style={{ marginBottom: '20px' }}>
                                        <div
                                            className={`wallet-list-item-auction ${isActiveItem ? 'active' : ''
                                                }`}
                                            onClick={() => handleItemClick(it)}
                                        // style={{ height: '100%' }}
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
                                                <UtxoImageAuction utxo={it} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />
                                            )}
                                            <InscriptionsDetails utxo={it} />
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Container>
                </>
            )}
        </div>
    );
}





// import React, { useState } from 'react';
// import { TailSpin } from 'react-loading-icons';
// import { Row, Col, Card, Container, Button } from 'react-bootstrap';
// import UtxoImageAuction from './UtxoImageAuction';
// import InscriptionsDetails from '../../InscriptionsDetails';

// export default function UtxoInfoAuction({ utxosReady, ownedUtxos, setCurrentUtxo, inscriptionUtxosByUtxo }) {
//     const [activeItemId, setActiveItemId] = useState(null);

//     if (!utxosReady) return (
//         <>
//             <p>Wallet loading...</p>
//             <br /><br />
//             <TailSpin stroke="#ffffff" speed={.75} />
//             <br /><br />
//         </>
//     );

//     const handleItemClick = (item) => {
//         setCurrentUtxo(item);
//         setActiveItemId(item.txid);
//     }

//     return (
//         <div>
//             {
//                 ownedUtxos.length === 0 ?
//                     <>
//                         <div>
//                             This address doesn't own anything yet... <a href="/">Inscribe something</a>
//                         </div>
//                     </>
//                     :
//                     <>
//                         <br />
//                         <Container id="ordinal-container" fluid>
//                             <ol id="wallet-thumbnails-auction">
//                                 {ownedUtxos.map(it => {
//                                     const isActiveItem = activeItemId === it.txid;
//                                     return (
//                                         <li
//                                             className={`hover-pointer gallery-item wallet-list-item-auction ${isActiveItem ? 'active' : ''}`}
//                                             key={it.txid}
//                                             onClick={() => handleItemClick(it)}
//                                         >
//                                             {
//                                                 !inscriptionUtxosByUtxo[`${it.txid}:${it.vout}`] ?
//                                                     <>
//                                                         <br /><br />
//                                                         <TailSpin stroke="#ffffff" speed={.75} />
//                                                         <br /><br />
//                                                     </>
//                                                     :
//                                                     <UtxoImageAuction utxo={it} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />
//                                             }
//                                             <InscriptionsDetails utxo={it} />
//                                         </li>
//                                     )
//                                 })}
//                             </ol>
//                         </Container>
//                     </>
//             }
//         </div >
//     )
// }
