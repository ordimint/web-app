import React from "react";
import { useState, useRef, useEffect } from "react";
import useSWR from 'swr';
import { QRCodeCanvas } from "qrcode.react";
import { IoIosCopy } from "react-icons/io";
import {
    Modal,
    Button,
    Spinner,
    Overlay,
    Tooltip,
    Container,
    ToggleButtonGroup,
    ToggleButton,
    Alert, Form, InputGroup

} from "react-bootstrap";

const fetcher = (url) => fetch(url).then((res) => res.json());

const PaymentModal = (props) => {
    const [showTooltipID, setShowTooltipID] = useState(false);
    const targetID = useRef(null);

    const [showTooltip, setShowTooltip] = useState(false);
    const target = useRef(null);

    const [isLightning, setIsLightning] = useState(true);

    const renderTooltipID = (show) => {
        setShowTooltipID(show);
        setTimeout(() => setShowTooltipID(false), [1000]);
    };

    const renderTooltip = (show) => {
        setShowTooltip(show);
        setTimeout(() => setShowTooltip(false), [1000]);
    };

    if (!props.show) {
        return null;
    }


    const handleSelectionChange = (value) => {
        setIsLightning(value);
    };

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}
                backdrop="static"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.chargeIdState ?
                        <>
                            <div className="m-2">
                                <ToggleButtonGroup type="radio" name="switch-lightning-onchain-number" className='toggle-button-custom' id="lightning-onchain-toggle" value={isLightning}>
                                    <ToggleButton id="tbg-radio-payment-lightning-2" value={false} onChange={() => handleSelectionChange(false)} title="onchain">
                                        <b> Bitcoin ⛓ </b> <br></br>
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-payment-lightning-1" value={true} onChange={() => handleSelectionChange(true)} title="lightning">
                                        <b> Lightning </b> <br></br>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>

                            {isLightning ?
                                <>
                                    <a href={"lightning:" + props.payment_request}>
                                        <QRCodeCanvas className="m-1" value={props.payment_request} size={256} />
                                    </a>
                                    <p>
                                        This QR-Code is a Lightning invoice. Pay with a Wallet like{" "}
                                        <a
                                            href="https://phoenix.acinq.co/"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Phoenix
                                        </a>
                                        ,{" "}
                                        <a href="https://muun.com/" target="_blank" rel="noreferrer">
                                            Muun
                                        </a>
                                        ,{" "}
                                        <a
                                            href="https://breez.technology/"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Breez
                                        </a>
                                        ,{" "}
                                        <a href="https://bluewallet.io/" target="_blank" rel="noreferrer">
                                            BlueWallet
                                        </a>{" "}
                                        or with{" "}
                                        <a href="https://strike.me/" target="_blank" rel="noreferrer">
                                            Strike
                                        </a>{" "}
                                        and{" "}
                                        <a href="https://cash.app/" target="_blank" rel="noreferrer">
                                            Cash App
                                        </a>{" "}
                                        . You can also pay with a browser extension like{" "}
                                        <a href="https://getalby.com/" target="_blank" rel="noreferrer">
                                            Alby
                                        </a>
                                        .
                                    </p>
                                    <Button
                                        variant="success"
                                        ref={target}
                                        className="secondary_button"
                                        onClick={() => {
                                            navigator.clipboard.writeText(props.payment_request);
                                            renderTooltip(!showTooltip);
                                        }}
                                    >
                                        Copy Invoice
                                    </Button>
                                </> :
                                <>

                                    <a href={"bitcoin:" + props.paymentOnChainAddress + "?amount=" + (props.amount / 100000000)}>
                                        <QRCodeCanvas className="m-1" value={"bitcoin:" + props.paymentOnChainAddress + "?amount=" + (props.amount / 100000000)} size={256} />
                                    </a>
                                    <p>
                                        Please send exactly {(props.amount / 100000000)} BTC to the below mentioned Wallet Address or scan the QR code to complete the order and inscribe your items.
                                    </p>
                                    <Form className="order-ID">
                                        <Form.Group className="mb-2">
                                            <InputGroup>
                                                <InputGroup.Text>Address</InputGroup.Text>
                                                <Form.Control disabled value={props.paymentOnChainAddress} />
                                                <Button
                                                    size={30}
                                                    ref={target}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(props.paymentOnChainAddress);
                                                        renderTooltip(!showTooltip);
                                                    }}
                                                    variant="primary"
                                                >
                                                    <IoIosCopy color="black" />
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form>

                                </>


                            }
                        </>
                        : <>
                            <p>Your order is in the making</p>
                            <Spinner className="m-2" animation="border" />
                        </>
                    }
                    {props.isPaid ?
                        <>
                            <Alert variant="success">
                                <Alert.Heading>Status: Paid!</Alert.Heading>
                                <p>
                                    Your order has been paid. We will start working on it right away.
                                </p>
                            </Alert>
                            <Form className="order-ID">
                                <Form.Group className="mb-2">
                                    <InputGroup>
                                        <InputGroup.Text>Order ID</InputGroup.Text>
                                        <Form.Control disabled value={props.chargeIdState} />
                                        <Button
                                            size={30}
                                            ref={targetID}
                                            onClick={() => {
                                                navigator.clipboard.writeText(props.chargeIdState);
                                                renderTooltipID(!showTooltipID);
                                            }}
                                            variant="primary"
                                        >
                                            <IoIosCopy color="black" />
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                            <p id="expirydate">
                                Make sure to save your order ID.<br></br>
                            </p>
                            <div className="m-2">
                                You can monitor your order status <a href="/check-order" target="_blank" rel="noopener noreferrer"> here.</a>{" "}
                            </div>
                        </>
                        : <>
                            <Alert variant="warning">
                                <Alert.Heading>Status: Pending</Alert.Heading>
                                <p>
                                    Your order is pending. Please pay the invoice to start the order.
                                </p>
                            </Alert>

                        </>
                    }

                    {/* <Modal.Footer>
                        <Button
                            variant="secondary"

                            onClick={() => {

                            }}
                        >
                            Pay with wallet.
                        </Button>
                        <div className='preview-modal-buttons'>
                            {props.isPaid ?
                                <Button variant="success"
                                    onClick={() => {
                                        props.handleClose();
                                    }}
                                >
                                    Make another order
                                </Button> :
                                <Button variant="success" onClick={() => {
                                    window.open(`${process.env.REACT_APP_SATSPAY_URL}/${props.chargeId}`, '_blank');

                                }}>
                                    Pay
                                </Button>}
                        </div>
                    </Modal.Footer> */}
                </Modal.Body>
            </Modal>
            <Overlay
                target={targetID.current}
                transition={true}
                show={showTooltipID}
                placement="bottom"
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
                placement="top"
            >
                {(propsTooltip) => (
                    <Tooltip id="copied-tooltip" {...propsTooltip}>
                        Copied!
                    </Tooltip>
                )}
            </Overlay>
        </div>
    )
}

export default PaymentModal
