import { Table, Container, Button, Row, Col, Tooltip, Overlay } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { IoIosCopy } from "react-icons/io";
import { Spinner } from 'react-bootstrap';
import Head from 'next/head';

import { useState, useRef } from 'react';


export async function getServerSideProps(context) {
    const explorerURL = process.env.REACT_APP_MAINNET_URL;

    const { slug } = context.query;

    try {
        const response = await fetch(`${explorerURL}/inscription/${slug}`, {
            headers: {
                'Accept': 'application/json'
            }

        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (response.headers.get('content-type').includes('application/json')) {
            const data = await response.json();
            return {
                props: { data }, // Will be passed to the page component as props
            };
        } else {
            return {
                props: {},
            };
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            props: {},
        };
    }
}

function formatString(str) {
    const start = str.substr(0, 5);
    const end = str.substr(-5);
    return `${start}...${end}`;
}

function copyToClipboard(str) {
    navigator.clipboard.writeText(str);
}


export default function OrdinalPage({ data }) {
    const router = useRouter()
    const [showTooltipID, setShowTooltipID] = useState(false);
    const targetID = useRef(null);

    const [showTooltip, setShowTooltip] = useState(false);
    const target = useRef(null);

    const renderTooltipID = (show) => {
        setShowTooltipID(show);
        setTimeout(() => setShowTooltipID(false), [1000]);
    };

    const renderTooltip = (show) => {
        setShowTooltip(show);
        setTimeout(() => setShowTooltip(false), [1000]);
    };

    if (!data) {
        return <div className='no-data-spinner'>
            <Spinner animation="border" role="status">

            </Spinner>
            <p className="sr-only">Waiting...</p>

        </div>
    }

    if (data.error) {
        return <div>Error: {data.error.message}</div>
    }
    const date = new Date(data.timestamp * 1000);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return (
        <>
            <Head>
                <title>Ordimint - Inscription {data.inscription_number} </title>
                <meta name="description" content="Ordimint Ordinal Explorer" />
                <meta name="keywords" content="Bitcoin, Ordinals, Collections,Inscriptions, Searchable, Digital Assets, Inscriptions, NFT" />
                <meta property="og:title" content={`Ordimint - Inscription # ${data.inscription_number}`} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://explorer.ordimint.com/content/${data.inscription_id}`} />
                <meta property="og:description" content="A website to mint, receive, store or send your Ordinals. View all new Ordinal Collections, Inscribe or use our wallet." />

                <meta name="twitter:card" content={`https://explorer.ordimint.com/content/${data.inscription_id}`} />
                <meta name="twitter:title" content="Ordimint - The Forever Machine" />
                <meta name="twitter:description" content="Ordimint Ordinals Explorer" />
                <meta name="twitter:image" content={`https://explorer.ordimint.com/content/${data.inscription_id}`} />
            </Head>
            <Container id='ordinals-detail-page'>

                <Button className="back-button mb-4" variant="secondary" onClick={() => router.back()}>&lt; Back</Button>

                <Row>
                    <Col className='m-4 ordinal-detail-headline'>
                        <h3>Inscription</h3>
                        <h1>{data.inscription_number}</h1>

                    </Col>
                    <hr></hr>
                </Row>
                <Row>

                    <Col xs={12} md={6} className='mb-3' >
                        <div style={{ width: '100%', height: '50vh', overflow: 'hidden' }}>
                            <iframe
                                title="ordinal-iframe"
                                className="ordinal-iframe"
                                src={`https://explorer.ordimint.com/preview/${data.inscription_id}`}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                            >
                            </iframe>
                        </div>
                    </Col>


                    <Col xs={12} md={6} >
                        <div className='ordinal-details-data-container'>

                            <Table variant="dark" bordered={false} className='ordinal-data-table'>
                                <tbody>
                                    <tr>
                                        <td>Inscription ID</td>
                                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {formatString(data.inscription_id)} {" "}

                                            <Button size='sm' ref={target} variant="secondary" onClick={() => { copyToClipboard(data.inscription_id); renderTooltip(!showTooltip); }}>
                                                <IoIosCopy color="black" />
                                            </Button>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Owner Address</td>
                                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {formatString(data.address)}{" "}
                                            <Button size='sm' ref={targetID} variant="secondary" onClick={() => {
                                                copyToClipboard(data.address);
                                                renderTooltipID(!showTooltipID);
                                            }}>
                                                <IoIosCopy color="black" />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Content Length</td>
                                        <td>{data.content_length} bytes</td>
                                    </tr>
                                    <tr>
                                        <td>Output value</td>
                                        <td>{data.output_value} Sats</td>
                                    </tr>
                                    <tr>
                                        <td>Content Type</td>
                                        <td>{data.content_type}</td>
                                    </tr>
                                    {/* Add more rows for additional data points */}
                                    <tr>
                                        <td>Genesis Fee</td>
                                        <td>{data.genesis_fee} Sats</td>
                                    </tr>
                                    <tr>
                                        <td>Genesis Height</td>
                                        <td>Block {data.genesis_height}</td>
                                    </tr>
                                    <tr>
                                        <td>Satoshi</td>
                                        <td>{data.sat}</td>
                                    </tr>
                                    <tr>
                                        <td>Date of Birth</td>
                                        <td>{formattedDate}</td>
                                    </tr>

                                    {/* Add more rows as needed */}
                                </tbody>
                            </Table>
                        </div>
                    </Col>

                </Row>
                <Overlay
                    target={targetID.current}
                    transition={true}
                    show={showTooltipID}
                    placement="right"
                >
                    {(propsTooltip) => (
                        <Tooltip id="copied-tooltip" {...propsTooltip}>
                            Copied!
                        </Tooltip>
                    )}
                </Overlay>
                <Overlay
                    target={target.current}
                    transition={true}
                    show={showTooltip}
                    placement="right"
                >
                    {(propsTooltip) => (
                        <Tooltip id="copied-tooltip" {...propsTooltip}>
                            Copied!
                        </Tooltip>
                    )}
                </Overlay>

            </Container>
        </>
    );
}