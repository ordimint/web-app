import React, { useEffect, useState } from 'react';
import SelectWallet from './AuctionSteps/SelectWallet';
import SelectOrdinal from './AuctionSteps/SelectOrdinal';
import CreateOffer from './AuctionSteps/CreateOffer';
import { Modal, Button, Alert } from 'react-bootstrap';
import { getInvoice, getPrice } from '../../../functions/invoices';
import AlertModal from './AlterModal';

const steps = [
    { name: 'Connect Wallet', component: (props) => <SelectWallet {...props} /> },
    { name: 'Select your Ordinal', component: (props) => <SelectOrdinal {...props} /> },
    { name: 'Create offer', component: (props) => <CreateOffer {...props} /> },
];



function AuctionModal(props) {
    if (!props.show) {
        return null;
    }

    const [currentStep, setCurrentStep] = useState(0);
    const [selectedWallet, setSelectedWallet] = useState('Ordimint');
    const [currentUtxo, setCurrentUtxo] = useState(null)
    const [invoice, setInvoice] = useState({})
    const [price, setPrice] = useState(4000)





    useEffect(() => {
        console.log(currentUtxo);
    }, [currentUtxo]);

    const createOrder = async () => {
        try {
            props.socket.emit("getInvoice", price);
            setInvoice(invoice)
        }
        catch (e) {
            console.log(e)
        }
        console.log(invoice)
    }

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
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{steps[currentStep].name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CurrentComponent
                        selectedWallet={selectedWallet}
                        setSelectedWallet={setSelectedWallet}
                        setCurrentUtxo={setCurrentUtxo}
                        currentUtxo={currentUtxo}
                    />


                </Modal.Body>
                <Modal.Footer>
                    <div className='back-next-button-modal'>
                        {currentStep !== 0 && (
                            <Button onClick={handleBack}>Back</Button>
                        )}
                        {currentStep !== steps.length - 1 ? (
                            <Button onClick={handleNext}
                                disabled={currentStep === 1 && currentUtxo === null}
                            >Next</Button>
                        ) : (
                            <Button type="submit"
                                onClick={createOrder}
                            >Submit</Button>
                        )}
                    </div>

                </Modal.Footer>

            </Modal>
        </>
    );
}

export default AuctionModal;
