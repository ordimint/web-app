import React from 'react';
import Image from 'next/image';
import OnchainInput from './OnchainInput';
import WalletConnectModal from '../modals/WalletConnectModal';
import AlbyLogo from '../../public/media/alby-logo.svg'
import LedgerLogo from '../../public/media/ledger-logo-small.svg';
import OrdimintLogo from '../../public/media/ordimint-coin-white.png';
import XverseLogo from '../../public/media/xverse-logo.png';
import UnisatLogo from '../../public/media/unisat-logo.svg';
import HiroLogo from '../../public/media/HiroWalletLogo.jpg';
import { Button } from 'react-bootstrap';

function WalletSelect({
    nostrPublicKey,
    ledgerPublicKey,
    ordimintPubkey,
    unisatPublicKey,
    xversePublicKey,
    hiroPublicKey,
    onChainAddress,
    setOnChainAddress,
    showWalletConnectModal,
    setShowWalletConnectModal,
    connectWallet,
    getAddressInfoNostr,
    getAddressInfoUnisat,
    getAddressInfoXverse,
    getAdressInfoHiro,
    testnet,
    getLedgerPubkey,
    getAddressInfoLedger,
    renderSelectWalletModal,
    setNostrPublicKey,
    setLedgerPublicKey,
    setUnisatPublicKey,
    setXversePublicKey,
    setHiroPublicKey,
    connectUnisat,
    connectXverse,
    connectHiro,
}) {

    const [hasSelectedWallet, setHasSelectedWallet] = React.useState(false);


    return (
        (nostrPublicKey || ledgerPublicKey || ordimintPubkey || unisatPublicKey || xversePublicKey || hiroPublicKey) ? (
            <>
                {(nostrPublicKey || ledgerPublicKey || unisatPublicKey || xversePublicKey || hiroPublicKey) ? (
                    <div className="success-alert-input">
                        <h5>Your receiver address:</h5>
                        <OnchainInput
                            onChainAddress={onChainAddress}
                            setOnChainAddress={setOnChainAddress}
                        />
                        {hasSelectedWallet && (
                            <div className='wallet-change-button'>
                                <Button
                                    size="md"
                                    variant="success"
                                    onClick={() => {
                                        setNostrPublicKey(null);
                                        setLedgerPublicKey(null);
                                        setUnisatPublicKey(null);
                                        setXversePublicKey(null);
                                        setHiroPublicKey(null);
                                        setHasSelectedWallet(false);
                                    }}
                                >
                                    Change Wallet
                                </Button>
                            </div>
                        )}
                        <WalletConnectModal
                            address={onChainAddress}
                            show={showWalletConnectModal}
                            handleClose={() => setShowWalletConnectModal(false)}
                        />
                    </div>
                ) : (
                    <>
                        <div className="success-alert-input">
                            <h5>Your receiver address:</h5>
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
            <div className='wallet-selector-container' >
                <h3>How do you want to receive your Ordinal?   </h3>

                <h5>Enter a Bitcoin address or connect a wallet.</h5>

                <OnchainInput
                    onChainAddress={onChainAddress}
                    setOnChainAddress={setOnChainAddress}
                />
                <div id="wallet-buttons">
                    <div className='wallet-buttons-row'>
                        <button
                            className="m-1 use_button"
                            onClick={async () => {
                                setNostrPublicKey(await connectWallet());
                                setOnChainAddress(async () => await getAddressInfoNostr(await connectWallet(), testnet));
                                setShowWalletConnectModal(true);
                                setHasSelectedWallet(true);
                            }}
                            variant="success"
                            size="md"
                        >
                            <Image src={AlbyLogo} height="20" width="20" alt="Alby Logo" /><br></br> use Alby Wallet
                        </button>

                        <button
                            className="m-1 use_button"
                            onClick={async () => {
                                setLedgerPublicKey(await getLedgerPubkey(false));
                                setOnChainAddress(await (await getAddressInfoLedger(ledgerPublicKey, false, testnet)).address);
                                setHasSelectedWallet(true);
                            }}
                            variant="success"
                            size="md"
                        >
                            <Image src={LedgerLogo} height="20" width="20" alt="Ledger Logo" /><br></br> use Ledger HW
                        </button>

                        <button
                            className="m-1 use_button"
                            onClick={async () => {
                                setUnisatPublicKey(await connectUnisat())
                                const address = await getAddressInfoUnisat();
                                setOnChainAddress(address);
                                setHasSelectedWallet(true);

                            }}
                            variant="success"
                            size="md"
                        >
                            <Image src={UnisatLogo} height="20" width="20" alt="Unisat Logo" /><br></br> use Unisat Wallet
                        </button>
                    </div>
                    <div className='wallet-buttons-row'>
                        <button
                            className="m-1 use_button"
                            onClick={async () => {
                                const xversePubkey = await connectXverse(testnet);
                                setXversePublicKey(xversePubkey);
                                const address = await getAddressInfoXverse();
                                setOnChainAddress(address);
                                setHasSelectedWallet(true);
                            }}
                            variant="success"
                            size="md"
                        >
                            <Image src={XverseLogo} height="20" width="20" alt="Xverse Logo" /><br></br> use Xverse Wallet
                        </button>

                        <button
                            className="m-1 use_button"
                            onClick={async () => {
                                const hiroPubkey = await connectHiro(testnet)
                                setHiroPublicKey(hiroPubkey);
                                const address = await getAdressInfoHiro();
                                setOnChainAddress(address);
                                setHasSelectedWallet(true);
                            }}
                            variant="success"
                            size="md"
                        >
                            <Image src={HiroLogo} height="20" width="20" alt="Hiro Logo" id="hiro-wallet-logo" /><br></br> use Hiro Wallet
                        </button>

                        <button
                            className="m-1 use_button"
                            onClick={
                                () => {
                                    renderSelectWalletModal
                                    setHasSelectedWallet(true);
                                }
                            }
                            variant="success"
                            size="md"
                        >
                            <Image src={OrdimintLogo} height="20" width="20" alt="Ordimint Logo" /> use Ordimint Wallet
                        </button>
                    </div>
                </div>
            </div>
        )

    );
}

export default WalletSelect;

