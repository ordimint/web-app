import React from 'react';
import Image from 'next/image';
import OnchainInput from './OnchainInput';
import WalletConnectModal from './modals/WalletConnectModal';
import AlbyLogo from '../public/media/alby-logo.svg'
import LedgerLogo from '../public/media/ledger-logo-small.svg';
import OrdimintLogo from '../public/media/ordimint-coin-white.png';
import UnisatLogo from '../public/media/unisat-logo.svg';

function WalletSelect({
    nostrPublicKey,
    ledgerPublicKey,
    ordimintPubkey,
    unisatPublicKey,
    onChainAddress,
    setOnChainAddress,
    showWalletConnectModal,
    setShowWalletConnectModal,
    connectWallet,
    getAddressInfoNostr,
    getAddressInfoUnisat,
    testnet,
    getLedgerPubkey,
    getAddressInfoLedger,
    renderSelectWalletModal,
    setNostrPublicKey,
    setLedgerPublicKey,
    setUnisatPublicKey,
    connectUnisat,

}) {


    return (
        (nostrPublicKey || ledgerPublicKey || ordimintPubkey || unisatPublicKey) ? (
            <>
                {nostrPublicKey || ledgerPublicKey || unisatPublicKey ? (
                    <div className="success-alert-input input-button">
                        <p>Your receiver address:</p>
                        <OnchainInput
                            onChainAddress={onChainAddress}
                            setOnChainAddress={setOnChainAddress}
                        />
                        <WalletConnectModal
                            address={onChainAddress}
                            show={showWalletConnectModal}
                            handleClose={() => setShowWalletConnectModal(false)}
                        />
                    </div>
                ) : (
                    <>
                        <div className="success-alert-input input-button">
                            <p>Your receiver address:</p>
                            <OnchainInput
                                onChainAddress={onChainAddress}
                                setOnChainAddress={setOnChainAddress}
                            />
                        </div>
                        <WalletConnectModal
                            address={onChainAddress}
                            show={showWalletConnectModal}
                            handleClose={() => setShowWalletConnectModal(false)}
                        />
                    </>
                )}
            </>
        ) : (
            <div className="input-button">
                <p>How do you want to receive your Ordinal?
                    <br />
                    Enter an on-chain address or use a wallet.
                </p>
                <OnchainInput
                    onChainAddress={onChainAddress}
                    setOnChainAddress={setOnChainAddress}
                />
                <div id="wallet-buttons">
                    <button
                        className="m-1 use_button"
                        onClick={async () => {
                            setNostrPublicKey(await connectWallet());
                            setOnChainAddress(async () => await getAddressInfoNostr(await connectWallet(), testnet));
                            setShowWalletConnectModal(true);
                        }}
                        variant="success"
                        size="md"
                    >
                        <Image src={AlbyLogo} height="20" width="20" alt="Alby Logo" /> use Alby Wallet
                    </button>

                    <button
                        className="m-1 use_button"
                        onClick={async () => {
                            setLedgerPublicKey(await getLedgerPubkey(false));
                            setOnChainAddress(await (await getAddressInfoLedger(ledgerPublicKey, false, testnet)).address);
                        }}
                        variant="success"
                        size="md"
                    >
                        <Image src={LedgerLogo} height="20" width="20" alt="Ledger Logo" /> use Ledger HW
                    </button>

                    <button
                        className="m-1 use_button"
                        onClick={async () => {
                            setUnisatPublicKey(await connectUnisat())
                            const address = await getAddressInfoUnisat();
                            setOnChainAddress(address);

                        }}
                        variant="success"
                        size="md"
                    >
                        <Image src={UnisatLogo} height="20" width="20" alt="Unisat Logo" /> use Unisat Wallet
                    </button>
                </div>
                <div>
                    <button onClick={renderSelectWalletModal}
                        variant="success"
                        size="md"
                        className='use_button'
                    >
                        <Image src={OrdimintLogo} height="20" width="20" alt="Ordimint Logo" /> use Ordimint Wallet
                    </button>
                </div>
            </div>
        )

    );
}

export default WalletSelect;

