import { React, useState } from 'react'
import { InputGroup, Form, Container, Button, Figure, Col, Row } from 'react-bootstrap'

import axios from 'axios'
import Head from 'next/head';
const CheckOrder = () => {

    const [orderID, setOrderID] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [testnet, setTestnet] = useState(false)
    const [txhash, setTxhash] = useState("");
    const [inscriptionID, setInscriptionID] = useState("");

    const checkOrder = async () => {

        if (orderID === "") {
            return;
        }

        await axios.get(
            `${process.env.REACT_APP_BACKEND_API}${orderID}`
        ).then(response => {

            setOrderStatus(response.data.status);
            if (response.data.mintingTransaction) {
                setTxhash(response.data.mintingTransaction);
                setInscriptionID(response.data.inscription_ID);
            }
            if (response.data.testnet) {
                setTestnet(true)
            }
        })
            // if error
            .catch(function (error) {
                setOrderStatus("Error: Order not found")

            });
    }


    return (
        <Container>
            <Head>
                <title>Ordimint - Check Order</title>
                <meta name="description" content="Check your inscription order" />
                <meta name="keywords" content="Bitcoin, Inscription service" />
            </Head>
            <div className='main-middle'>
                {/* <h1>Check your order</h1> */}
                <h4 className="mt-3 order-status" >Status: {orderStatus}</h4>
                {txhash ? (
                    <div>
                        {/* <div className="mt-2 order-status">
                            <p>Preview:</p>
                            <div className="iframe-container">
                                <iframe
                                    src={`https://live.ordilabs.org/content/${inscriptionID}`}
                                    title="Inscription preview"
                                ></iframe>
                            </div>
                        </div> */}
                        <h4 className="mt-3 order-status">
                            <a href={testnet ? `https://mempool.space/testnet/tx/${txhash}` : `https://mempool.space/tx/${txhash}`} target="_blank" rel="noreferrer">
                                Minting Transaction
                            </a>
                        </h4>
                        <h4 className="mt-3 order-status">
                            <a href={testnet ? `http://testnet.ordimint.com/inscription/${inscriptionID}` : `https://explorer.ordimint.com/inscription/${inscriptionID}`} target="_blank" rel="noreferrer">
                                Your Inscription (when minted)
                            </a>
                        </h4>
                        <p>Your inscription will be minted directly to your BTC address</p>


                    </div>) :
                    (<></>)

                }
                {/* {sendingTxHash ? (<div>
                    <h4><a href={`https://mempool.space/de/tx/${sendingTxHash}`} target="_blank" rel="noreferrer">
                        Sending Transaction (After your ordinal was minted)
                    </a></h4>
                </div >) : (<></>)} */}
                <Row>
                    <Col xs={12} lg={11}>
                        <InputGroup id='order-id-input'>
                            <InputGroup.Text id="basic-addon1">Order ID</InputGroup.Text>
                            <Form.Control
                                onChange={(e) => setOrderID(e.target.value)}
                                placeholder="Insert Your Order ID"
                                aria-label="Order ID"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>

                    </Col>
                </Row>
                <Button variant="success" type="submit"
                    onClick={checkOrder}
                >
                    Check Order Status
                </Button>

            </div>
        </Container>
    )
}

export default CheckOrder
