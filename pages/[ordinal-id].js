import { Table, Container, Button, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { IoIosCopy } from "react-icons/io";
import { Spinner } from 'react-bootstrap';

export async function getServerSideProps(context) {
    const explorerURL = process.env.REACT_APP_MAINNET_URL;
    const { 'ordinal-id': ordinalsid } = context.params;

    try {
        const response = await fetch(`${explorerURL}/inscription/${ordinalsid}`, {
            headers: {
                'Accept': 'application/json'
            }

        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (response.headers.get('content-type').includes('application/json')) {
            const data = await response.json();
            console.log(data)
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
        <Container >
            <Container >
                <Button className="back-button mb-4" variant="secondary" onClick={() => router.back()}>&lt; Back</Button>
            </Container>
            <Row>

                <Col xs={12} md={6} >
                    <Container>

                        <div style={{ width: '100%', height: '50vh', overflow: 'hidden' }}>
                            <iframe
                                title="ordinal-iframe"
                                className="ordinal-iframe"
                                src={`https://explorer.ordimint.com/preview/${data.inscription_id}`}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                            >
                            </iframe>
                        </div>
                    </Container>
                </Col>


                <Col xs={12} md={6} >
                    <Container className='ordinal-details-data-container'>

                        <h5>Inscription</h5>
                        <h1>{data.inscription_number}</h1>

                        <Table variant="dark" bordered={false} className='ordinal-data-tabel'>
                            <tbody>
                                <tr>
                                    <td>Inscription ID</td>
                                    <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {formatString(data.inscription_id)} {" "}
                                        <Button size='sm' variant="secondary" onClick={() => copyToClipboard(data.inscription_id)}>
                                            <IoIosCopy color="black" />
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Owner Address</td>
                                    <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {formatString(data.address)}{" "}
                                        <Button size='sm' variant="secondary" onClick={() => copyToClipboard(data.address)}>
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
                    </Container>
                </Col>

            </Row>
        </Container >
    );
}