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
                return <OrdimintWalletAuction />;
            case 'Alby':
                return <AlbyWalletAuction />;
            case 'Ledger':
                return <LedgerWalletAuction />;
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
