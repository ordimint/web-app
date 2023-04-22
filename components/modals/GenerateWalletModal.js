import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosCopy } from "react-icons/io";
import { useState, useEffect } from 'react';



const GenerateWalletModal = ({
    showModal,
    closeModal,
    seedPhrase,
    privateKey,

}) => {



    const [seedDownloaded, setSeedDownloaded] = useState(false);


    const copySeedPhrase = async () => {
        if (!seedPhrase) {
            alert('Please generate a wallet first!');
            return;
        }
        try {
            await navigator.clipboard.writeText(seedPhrase);
            alert('Seed phrase copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy seed phrase: ', err);
            alert('Failed to copy seed phrase. Please try again.');
        }
    };

    const handleDownloadPrivateKey = () => {
        downloadPrivateKey(privateKey);
        setSeedDownloaded(true);
    };


    const handleCloseAndDownload = () => {
        if (!seedDownloaded) {
            alert("Please download your backup file!")
            downloadPrivateKey(privateKey);
            setShowModal(false);
        }
        else {
            closeModal();
        }
    };

    const downloadPrivateKey = (privateKey) => {
        if (!privateKey) {
            alert('Please generate a wallet first!');
            return;
        }

        const fileContent = `Ordimint-Key: ${privateKey}\n`;
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ordimint-wallet.txt';
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    };


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


