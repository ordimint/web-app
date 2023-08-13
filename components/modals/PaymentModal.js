import React from "react";
import { useState, useRef } from "react";
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

const PaymentModal = (props) => {
    const [showTooltipID, setShowTooltipID] = useState(false);
    const targetID = useRef(null);

    const renderTooltipID = (show) => {
        setShowTooltipID(show);
        setTimeout(() => setShowTooltipID(false), [1000]);
    };

    if (!props.show) {
        return null;
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}
                backdrop="static"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Your order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.chargeId ?
                        <>
                            <Form className="order-ID">
                                <Form.Group className="mb-2">
                                    <InputGroup>
                                        <InputGroup.Text>Order ID</InputGroup.Text>
                                        <Form.Control disabled value={props.chargeId} />
                                        <Button
                                            size={30}
                                            ref={targetID}
                                            onClick={() => {
                                                navigator.clipboard.writeText(props.chargeId);
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
                                Don't close this window until you have paid.
                            </p>
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

                    <Modal.Footer>
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
                    </Modal.Footer>
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
        </div>
    )
}

export default PaymentModal
