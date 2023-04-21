import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const OrdimintWalletInfo = (props) => {

    if (!props.show) {
        return null;
    }

    return (
        <>

            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ordimint Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        This is a simple Ordimint Wallet that allows you to create, restore, and manage your non-custodial wallet. The wallet can be used to receive Ordinals and send Ordinals to other addresses.
                    </p>
                    <p>
                        To get started, you can either generate a new wallet or restore an existing wallet from a backup file. Once your wallet is set up, you will be able to see your wallet address for receiving Ordinals.
                    </p>
                    <p>
                        Please make sure to back up your wallet by writing down the provided seed phrase and downloading the backup file. The seed phrase is essential for recovering your wallet in case you lose the backup file.
                    </p>
                    <p>
                        If you need to restore your wallet, just use the "Restore Wallet" option and select your backup file.
                    </p>
                    <p>
                        You can view your Ordinals and when you want to send it to another wallet, simply follow the on-screen instructions to enter the destination address, select a fee rate, and confirm the transaction. Please make sure that the other wallet is Ordinal ready.
                    </p>
                    <p>
                        Remember to always keep your seed phrase and backup file safe, as they are the only ways to recover your wallet in case of loss or damage.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default OrdimintWalletInfo;
