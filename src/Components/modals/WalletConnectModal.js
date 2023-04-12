import React from "react";
import { Modal, Button, Alert, Container, Form, InputGroup, Overlay, Tooltip } from "react-bootstrap";
import { IoIosCopy } from "react-icons/io";
import { useState, useRef } from "react";




const WalletConnectModal = (props) => {



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
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Wallet connected!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Alert variant="success">{props.text}
                            <div>

                                Your receiver address is:

                                <Form className="order-ID">
                                    <Form.Group className="mb-2">
                                        <InputGroup>

                                            <Form.Control
                                                as="textarea"
                                                value={props.address}
                                                disabled
                                            />
                                            <Button
                                                size={30}
                                                ref={targetID}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(props.address);
                                                    renderTooltipID(!showTooltipID);
                                                }}
                                                variant="primary"

                                            >
                                                <IoIosCopy color="black" />
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>

                            </div>
                            <hr />
                            <div>
                                You can safely receive ordinal inscriptions and regular Bitcoin to this address.
                            </div>
                        </Alert>
                        <Modal.Footer>
                            <Button variant="success" onClick={props.handleClose}>
                                Ok
                            </Button>
                        </Modal.Footer>
                    </Container>
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
        </>
    )
};

export default WalletConnectModal
