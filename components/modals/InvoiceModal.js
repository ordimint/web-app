import React from "react";
import { useState, useRef } from "react";
import { QRCodeCanvas, } from "qrcode.react";
import { IoIosCopy } from "react-icons/io";
import {
    Modal,
    Button,
    Spinner,
    Overlay,
    Tooltip,
    Collapse,
    Alert, Form, InputGroup

} from "react-bootstrap";


function InvoiceModal(props) {
    const [showTooltipID, setShowTooltipID] = useState(false);
    const targetID = useRef(null);

    const [showTooltip, setShowTooltip] = useState(false);
    const [openCollapse, setOpen] = useState(false);
    const target = useRef(null);

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

    if (props.value === (undefined || null)) {
        return (
            <div>
                <Modal show={props.show} onHide={props.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Something went wrong</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Could not receive a valid invoice. Try again later!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                id="main_modal"
                centered
            >
                <Modal.Header closeButton>
                    {props.isConfigModal ? (
                        <Modal.Title>Save your order ID</Modal.Title>
                    ) : (
                        <Modal.Title>Scan or copy invoice</Modal.Title>
                    )}
                </Modal.Header>

                <Modal.Body>
                    <Alert show={props.showPaymentAlert} variant="success">
                        Payment successfull!
                    </Alert>
                    {props.showSpinner ? (
                        <Spinner animation="border" />
                    ) : (
                        <div>
                            {props.isConfigModal ? (
                                <></>
                            ) : (
                                <a href={"lightning:" + props.value}>
                                    <QRCodeCanvas value={props.value} size={256} />
                                </a>
                            )}
                        </div>
                    )}

                    {props.isConfigModal ? (
                        <div>
                            <Form className="order-ID">
                                <Form.Group className="mb-2">
                                    <InputGroup>
                                        <InputGroup.Text>Order ID</InputGroup.Text>
                                        <Form.Control disabled value={props.paymentHash} />
                                        <Button
                                            size={30}
                                            ref={targetID}
                                            onClick={() => {
                                                navigator.clipboard.writeText(props.paymentHash);
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
                                Make sure to save your order ID
                            </p>
                            <div>
                                You can monitor your order status <a href="/check-order"> here.</a>{" "}
                            </div>
                        </div>
                    ) : (
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
                    )}
                    <Collapse in={openCollapse}>
                        <div id="example-collapse-text">
                            {props.showSpinner ? null : (
                                <div id="invoicestring" className="container">
                                    {props.value}
                                </div>
                            )}
                        </div>
                    </Collapse>
                </Modal.Body>
                <Modal.Footer>
                    {props.isConfigModal ? (
                        <></>
                    ) : (
                        <Button variant="secondary" onClick={props.showNewInvoice}>
                            Get new Invoice
                        </Button>
                    )}

                    {/*Render Show Config or Show PR button  */}
                    {props.isConfigModal ? (
                        <></>
                    ) : (
                        <Button
                            variant="success"
                            onClick={() => setOpen(!openCollapse)}
                            aria-controls="example-collapse-text"
                            aria-expanded={!openCollapse}
                        >
                            {!openCollapse ? "Show Invoice" : "Hide Invoice"}
                        </Button>
                    )}

                    {/*Render Copy Invoice or Download button  */}
                    {props.isConfigModal ? (
                        <></>
                    ) : (
                        <Button
                            variant="success"
                            ref={target}
                            onClick={() => {
                                navigator.clipboard.writeText(props.value);
                                renderTooltip(!showTooltip);
                            }}
                        >
                            Copy Invoice
                        </Button>
                    )}
                    {props.isConfigModal ? (
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                    ) : (
                        <a href={"lightning:" + props.value}>
                            <Button variant="success">
                                Open in Wallet
                            </Button>
                        </a>
                    )}

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
                </Modal.Footer>
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
        </div>
    );
}

export default InvoiceModal;
