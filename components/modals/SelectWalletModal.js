import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SelectWalletModal = ({ show, handleClose, handleGenerateWallet, handleRestoreWallet }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ordimint Wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Generate a new wallet or restore an existing one.</p>
                <div className='d-flex flex-row justify-content-around'>
                    <button className='connect_button m-1' variant="primary" onClick={handleGenerateWallet}>
                        Generate Wallet
                    </button>

                    <button className='m-1 secondary_button' variant="secondary" onClick={handleRestoreWallet}>
                        Restore Wallet
                    </button>
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
