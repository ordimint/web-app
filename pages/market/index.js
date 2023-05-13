import React from 'react'
import { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import AuctionCountdown from '../../components/AuctionCountdown'
import { io } from "socket.io-client";
import InvoiceModal from '../../components/modals/InvoiceModal'


var socket = io.connect(process.env.REACT_APP_socket_port_auctions);
var clientPaymentHash;
var isPaid = false; //Is only necessary in the case of socket event is fireing multible times



const AuctionsPage = () => {
    ////Invoice Modal
    const [visibleInvoiceModal, setShowInvoiceModal] = useState(false);
    const closeInvoiceModal = () => setShowInvoiceModal(false);
    const showInvoiceModal = () => setShowInvoiceModal(true);

    const [payment_request, setPaymentrequest] = useState(0);
    /////Config Modal
    ///////Modal Configdata
    const [isConfigModal, showConfigModal] = useState(false);
    const renderConfigModal = () => showConfigModal(true);
    const hideConfigModal = () => showConfigModal(false);
    const [showSpinner, setSpinner] = useState(true);
    const [showPaymentSuccessfull, setPaymentAlert] = useState(false);
    const [price, setPrice] = useState(2);


    socket.off("connect").on("connect", () => {
        /////Checks for already paid invoice if browser switche tab on mobile

    });

    const getInvoice = (price) => {

        socket.emit("getInvoice", price);
        showInvoiceModal();
    }
    //////Updates the QR-Code
    const updatePaymentrequest = () => {
        socket.on("lnbitsInvoice", (invoiceData) => {
            setPaymentrequest(invoiceData.payment_request);
            clientPaymentHash = invoiceData.payment_hash;
            setSpinner(false);
        });
    };


    return (
        <div className='main-middle'>
            <h1 className=" py-3">Marketplace</h1>
            <AuctionCountdown />
            <Container fluid>
                <Row className='m-2'>
                    <Col>
                        <Button
                            onClick={() => {
                                getInvoice(price);
                                // renderAlert(false);
                                hideConfigModal();
                                updatePaymentrequest();
                                setSpinner(true);
                                isPaid = false;
                            }}
                            variant="success"
                            size="md"
                        >Sell something</Button>
                    </Col>

                </Row>
            </Container>
            <InvoiceModal
                show={visibleInvoiceModal}
                showSpinner={showSpinner}
                isConfigModal={isConfigModal}
                value={payment_request}
                paymentHash={clientPaymentHash}
                showNewInvoice={() => {
                    getInvoice(price);
                    setSpinner(true);
                }}
                handleClose={closeInvoiceModal}
                showPaymentAlert={showPaymentSuccessfull}
            />
        </div>
    )
}
export default AuctionsPage
