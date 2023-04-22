import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SelectWalletModal = ({ show, handleClose, handleGenerateWallet, handleHowDoesItWork, handleRestoreWallet }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ordimint Wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Generate a new wallet or restore an existing one.</p>
                <div className='d-flex flex-row justify-content-around'>
                    <Button className='m-1' variant="primary" onClick={handleGenerateWallet}>
                        Generate Wallet
                    </Button>

                    <Button className='m-1' variant="secondary" onClick={handleRestoreWallet}>
                        Restore Wallet
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SelectWalletModal;
