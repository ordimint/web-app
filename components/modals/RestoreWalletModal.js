import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const RestoreWalletModal = ({ showRestoreWalletModal, handleRestoreWalletModalClose, restoreWallet }) => {
    return (
        <Modal show={showRestoreWalletModal} onHide={handleRestoreWalletModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Restore Wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center">
                    <input
                        type="file"
                        className="d-none"
                        id="restoreWalletFile"
                        accept=".txt"
                        onChange={(event) => restoreWallet(event)}
                    />
                    <Button variant="primary" size="lg" onClick={() => document.getElementById('restoreWalletFile').click()}>
                        Choose Backup File
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleRestoreWalletModalClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RestoreWalletModal;


