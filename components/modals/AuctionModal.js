import React, { useEffect, useState } from 'react';
import SelectWallet from './AuctionSteps/SelectWallet';
import SelectOrdinal from './AuctionSteps/SelectOrdinal';
import CreateOffer from './AuctionSteps/CreateOffer';
import { Modal, Button, Alert } from 'react-bootstrap';
import PayOffer from './AuctionSteps/PayOffer';

const steps = [
    { name: 'Connect Wallet', component: (props) => <SelectWallet {...props} /> },
    { name: 'Select your Ordinal', component: (props) => <SelectOrdinal {...props} /> },
    { name: 'Create offer', component: (props) => <CreateOffer {...props} /> },
    { name: 'Pay for listing', component: (props) => <PayOffer {...props} /> },
];

var isPaid = false;

function AuctionModal(props) {
    if (!props.show) {
        return null;
    }

    const [currentStep, setCurrentStep] = useState(0);
    const [selectedWallet, setSelectedWallet] = useState('Ordimint');
    const [currentUtxo, setCurrentUtxo] = useState(null)
    const [inscriptionData, setInscriptionData] = useState(null)
    const [clientPaymentHash, setClientPaymentHash] = useState(null)
    const [invoice, setInvoice] = useState({})
    const [isPSBTsigned, setIsPSBTsigned] = useState(false)
    const [price, setPrice] = useState(process.env.REACT_APP_default_auction_price)

    const signPSBT = async () => {
        try {
            await props.socket.emit("signPSBT", { inscriptionID: inscriptionData.id, price: price });
        }
        catch (e) {
            console.log(e)
        }
    }



    // useEffect(() => {
    //     console.log(currentUtxo);
    // }, [currentUtxo]);

    const createOrder = async () => {
        try {
            await props.socket.emit("getInvoice", price);

        }
        catch (e) {
            console.log(e)
        }

    }

    props.socket.off("connect").on("connect", () => {
        /////Checks for already paid invoice if browser switche tab on mobile
        if (clientPaymentHash !== undefined) {
            console.log("check invoice");
            console.log(clientPaymentHash);
            checkInvoice();
        }
    });

    const checkInvoice = () => {
        props.socket.emit("checkInvoice", clientPaymentHash);
    };

    props.socket.on("lnbitsInvoice", (invoiceData) => {
        setInvoice(invoiceData.payment_request);
        setClientPaymentHash(invoiceData.payment_hash);
        // console.log(invoiceData);
    });

    props.socket.off("invoicePaid").on("invoicePaid", async (paymentHash) => {
        if (paymentHash === clientPaymentHash && isPaid === false) {
            isPaid = true;
            await props.socket.emit("createPSBT", { inscriptionID: inscriptionData.id, paymentHash: paymentHash });
            console.log("invoice paid");
        }
    });


    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
        if (currentStep === 1 && currentUtxo === null) {
            setShowAlert(true);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const CurrentComponent = steps[currentStep].component;

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop='static'
                centered>

                <Modal.Header closeButton>
                    <Modal.Title>{steps[currentStep].name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CurrentComponent
                        selectedWallet={selectedWallet}
                        setSelectedWallet={setSelectedWallet}
                        inscriptionData={inscriptionData}
                        setInscriptionData={setInscriptionData}
                        setCurrentUtxo={setCurrentUtxo}
                        currentUtxo={currentUtxo}
                        invoice={invoice}
                        signPSBT={signPSBT}
                        setPrice={setPrice}
                    />


                </Modal.Body>
                <Modal.Footer>
                    <div className='back-next-button-modal'>
                        {currentStep !== 0 && (
                            <Button onClick={handleBack}>Back</Button>
                        )}
                        {currentStep < steps.length - 2 ? (
                            <Button onClick={handleNext}
                                disabled={currentStep === 1 && currentUtxo === null}
                            >Next</Button>
                        ) : currentStep === steps.length - 2 && (
                            <Button type="submit"
                                onClick={async () => {
                                    await createOrder();
                                    handleNext();
                                }}
                                disabled={!isPSBTsigned}
                            >Create Offer</Button>


                        )}
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AuctionModal;
