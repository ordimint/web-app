import React from 'react'
import { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import AuctionCountdown from '../../components/AuctionCountdown'
import { io } from "socket.io-client";
import AuctionModal from '../../components/modals/AuctionModal'
import AuctionContainer from '../../components/AuctionContainer';


var socket = io.connect(process.env.REACT_APP_socket_port_auctions);
var clientPaymentHash;
var isPaid = false; //Is only necessary in the case of socket event is fireing multible times



const AuctionsPage = () => {
    ////Auction Modal
    const [visibleAuctionModal, setShowAuctionModal] = useState(false);
    const closeAuctionModal = () => setShowAuctionModal(false);
    const showAuctionModal = () => setShowAuctionModal(true);

    const [payment_request, setPaymentrequest] = useState(0);

    const [price, setPrice] = useState(2);


    socket.off("connect").on("connect", () => {
        /////Checks for already paid invoice if browser switche tab on mobile

    });

    const getAuction = (price) => {
        socket.emit("getAuction", price);

    }
    //////Updates the QR-Code
    const updatePaymentrequest = () => {
        socket.on("lnbitsAuction", (invoiceData) => {
            setPaymentrequest(invoiceData.payment_request);
            clientPaymentHash = invoiceData.payment_hash;

        });
    };


    return (
        <div className='main-middle'>
            <h1 className=" py-3">Marketplace</h1>
            {/* <AuctionCountdown /> */}
            <Container fluid>
                <Row className='m-2'>
                    <Col>
                        <Button
                            onClick={() => {
                                getAuction(price);
                                showAuctionModal();
                                updatePaymentrequest();
                                isPaid = false;
                            }}
                            price={price}
                            variant="success"
                            size="md"
                        >Sell something</Button>
                    </Col>

                </Row>
            </Container>
            <AuctionContainer />
            <AuctionModal
                show={visibleAuctionModal}
                handleClose={closeAuctionModal}
            />
        </div>
    )
}
export default AuctionsPage
