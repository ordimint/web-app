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
    const [orderSource, setOrderSource] = useState("");


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
            }
            if (response.data.inscription_ID) {
                setInscriptionID(response.data.inscription_ID);
            }
            if (response.data.testnet) {
                setTestnet(true);
            }
            setOrderSource(response.data.source);
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
            <div className='main-middle check-order-container'>
                {/* <h1>Check your order</h1> */}
                <h4 className="mt-3 order-status" >Status: {orderStatus}</h4>
                {txhash && (
                    <div>
                        <h4 className="mt-3 order-status">
                            <a href={testnet ? `https://mempool.space/testnet/tx/${txhash}` : `https://mempool.space/tx/${txhash}`} target="_blank" rel="noreferrer">
                                {orderSource === "Order" ? "Minting Transaction" : "Your OP_RETURN Transaction"}
                            </a>
                        </h4>

                        {orderSource === "Order" && inscriptionID && (
                            <h4 className="mt-3 order-status">
                                <a href={testnet ? `http://testnet.ordimint.com/inscription/${inscriptionID}` : `https://explorer.ordimint.com/inscription/${inscriptionID}`} target="_blank" rel="noreferrer">
                                    Your Inscription (when minted)
                                </a>
                            </h4>
                        )}

                        <p>
                            {orderSource === "Order" ? " Your inscription will be minted directly to your BTC address" : ""}
                        </p>
                    </div>
                )}

                <Row>
                    <Col xs={12} lg={11}>
                        <InputGroup id='order-id-inputs'>
                            <InputGroup.Text id="basic-addon1" style={{ border: "2px solid #6a6b6b", background: "#1c1d1d", color: "#fff", }}>Order ID</InputGroup.Text>
                            <Form.Control
                                onChange={(e) => setOrderID(e.target.value)}
                                placeholder="Insert Your Order ID"
                                aria-label="Order ID"

                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>

                    </Col>
                </Row>
                <button className='connect_button mt-4' type="submit"
                    style={{ zIndex: 5 }}
                    onClick={() => checkOrder()}
                >
                    Check Order Status
                </button>

            </div>
        </Container>
    )
}

export default CheckOrder
