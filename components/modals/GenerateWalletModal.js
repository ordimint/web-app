import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosCopy } from "react-icons/io";

const GenerateWalletModal = ({
    showModal,
    seedPhrase,
    seedDownloaded,
    handleCloseAndDownload,
    handleDownloadPrivateKey,
    copySeedPhrase,
}) => {
    return (
        <Modal show={showModal}>
            <Modal.Header>
                <Modal.Title>Wallet Backup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p>Here's your seed phrase:</p>
                </div>
                <pre className="seed-phrase-ordimint-wallet">{seedPhrase}
                    <Button variant="link" onClick={copySeedPhrase}>
                        <IoIosCopy color="white" />
                    </Button>
                </pre>
                <p>
                    <strong>Important:</strong> Write down this seed phrase safely! It is the
                    only way to recover your wallet if you lose your backup file.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDownloadPrivateKey}>
                    Download Backup File
                </Button>
                <Button variant="primary" onClick={handleCloseAndDownload}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GenerateWalletModal;

{/* <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>Wallet Backup</Modal.Title>
                    
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p>Here's your seed phrase:</p>

                    </div>
                    <pre className="seed-phrase-ordimint-wallet">{seedPhrase}
                        <Button variant="link" onClick={copySeedPhrase}>
                            <IoIosCopy color="white" />
                        </Button>
                    </pre>
                    <p>
                        <strong>Important:</strong> Write down this seed phrase safely! It is the
                        only way to recover your wallet if you lose your backup file.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDownloadPrivateKey}>
                        Download Backup File
                    </Button>

                   
                    <Button variant="primary" onClick={handleCloseAndDownload}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
