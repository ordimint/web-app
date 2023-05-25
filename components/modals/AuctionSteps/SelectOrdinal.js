import React, { useEffect } from 'react';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

// Import your wallet components
import OrdimintWalletAuction from './OrdimintWalletAuction';
import AlbyWalletAuction from './AlbyWalletAuction';
import LedgerWalletAuction from './LedgerWalletAuction';

const SelectOrdinal = (props) => {

    const [showSpinner, setShowSpinner] = useState(true);
    const [ordinal, setOrdinal] = useState(0);
    const [publicKey, setPublicKey] = useState('');

    useEffect(() => {
        props.setCurrentUtxo(null);
        if (props.selectedWallet === 'Ordimint') {
            // Do something
        }
        else if (props.selectedWallet === 'Alby') {
            // Do something
        }
        else if (props.selectedWallet === 'Ledger') {
            // Do something
        }

    }, [props.selectedWallet]);

    const renderWallet = () => {
        switch (props.selectedWallet) {
            case 'Ordimint':
                return <OrdimintWalletAuction setCurrentUtxo={props.setCurrentUtxo}

                />;
            case 'Alby':
                return <AlbyWalletAuction setCurrentUtxo={props.setCurrentUtxo}

                />;
            case 'Ledger':
                return <LedgerWalletAuction setCurrentUtxo={props.setCurrentUtxo}
                />;
            default:
                return <p>Could not connect to wallet</p>;
        }
    };

    return (
        <>
            {
                renderWallet()
            }
        </>
    )
}

export default SelectOrdinal;
