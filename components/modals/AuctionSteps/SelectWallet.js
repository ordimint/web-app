import React, { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import Image from 'next/image';
import AlbyLogo from '../../../public/media/alby_icon_yellow.svg';
import LedgerLogo from '../../../public/media/ledger-logo-small.svg';
import OrdimintLogo from '../../../public/media/ordimint-coin-white.png';

const wallets = [
    { logo: OrdimintLogo, name: 'Ordimint', alt: 'Ordimint Logo' },
    { logo: AlbyLogo, name: 'Alby', alt: 'Alby Logo' },
    { logo: LedgerLogo, name: 'Ledger', alt: 'Ledger Logo' },
];

const SelectWallet = (props) => {
    const handleWalletSelect = (value) => {
        props.setSelectedWallet(value);
    };

    return (
        <div>
            <div className="wallet-connect-button-auction-modal">
                <ButtonGroup className="toggle-button-custom-auction" vertical>
                    {wallets.map((wallet, index) => (
                        <ToggleButton
                            key={index}
                            id={`radio-${index}`}
                            type="radio"
                            variant="primary"
                            name="radio"
                            value={wallet.name}
                            checked={props.selectedWallet === wallet.name}
                            onChange={(e) => handleWalletSelect(e.currentTarget.value)}

                        >
                            <Image src={wallet.logo} height="20" width="20" alt={wallet.alt} />
                            {" "}
                            {wallet.name} Wallet
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    );
};

export default SelectWallet;
