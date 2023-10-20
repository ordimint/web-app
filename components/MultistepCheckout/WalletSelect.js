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
import { set } from 'mongoose';

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
    tabKey,
}) {

    const [activeWallet, setActiveWallet] = React.useState(null);

    React.useEffect(() => {
        if (tabKey === "opreturn") {
            setOnChainAddress("16ftSEQ4ctQFDtVZiUBusQUjRrGhM3JYwe");
        }
    }, [tabKey]);


    if (tabKey === "opreturn") {

        return (
            <div className='wallet-selector-container' >
                <h5>For OP_RETURN no receiver address is needed.

                    You can proceed to the next step.
                </h5>
            </div>)
    }
    else {
        return (


            <>

                <div className='wallet-selector-container' >


                    <h5 className='m-3'>Your receiver address:</h5>

                    <OnchainInput
                        id='onchain-input'
                        onChainAddress={onChainAddress}
                        setOnChainAddress={setOnChainAddress}
                    />
                    <div id="wallet-buttons">
                        <div className='wallet-buttons-row'>
                            <button
                                className={`m-1 use_button ${activeWallet === 'Alby' ? 'active-wallet' : ''}`}
                                onClick={async () => {
                                    const result = await connectWallet();
                                    const info = await getAddressInfoNostr(result, testnet);
                                    const address = info.address; // extract the address property
                                    setNostrPublicKey(result);
                                    setOnChainAddress(address); // set the extracted address string to the state
                                    setShowWalletConnectModal(true);
                                    setActiveWallet('Alby');
                                }}
                                variant="success"
                                size="md"
                            >
                                <Image src={AlbyLogo} height="20" width="20" alt="Alby Logo" /><br></br> use Alby Wallet
                            </button>



                            <button
                                className={`m-1 use_button ${activeWallet === 'Ledger' ? 'active-wallet' : ''}`}
                                onClick={async () => {
                                    setLedgerPublicKey(await getLedgerPubkey(false));
                                    setOnChainAddress(await (await getAddressInfoLedger(ledgerPublicKey, false, testnet)).address);
                                    setActiveWallet('Ledger');
                                }}
                                variant="success"
                                size="md"
                            >
                                <Image src={LedgerLogo} height="20" width="20" alt="Ledger Logo" /><br></br> use Ledger HW
                            </button>

                            <button
                                className={`m-1 use_button ${activeWallet === 'Unisat' ? 'active-wallet' : ''}`}
                                onClick={async () => {
                                    setUnisatPublicKey(await connectUnisat())
                                    const address = await getAddressInfoUnisat();
                                    setOnChainAddress(address);
                                    setActiveWallet('Unisat');

                                }}
                                variant="success"
                                size="md"
                            >
                                <Image src={UnisatLogo} height="20" width="20" alt="Unisat Logo" /><br></br> use Unisat Wallet
                            </button>
                        </div>
                        <div className='wallet-buttons-row'>
                            <button
                                className={`m-1 use_button ${activeWallet === 'Xverse' ? 'active-wallet' : ''}`}
                                onClick={async () => {
                                    const xversePubkey = await connectXverse(testnet);
                                    setXversePublicKey(xversePubkey);
                                    const address = await getAddressInfoXverse();
                                    setOnChainAddress(address);
                                    setActiveWallet('Xverse');
                                }}
                                variant="success"
                                size="md"
                            >
                                <Image src={XverseLogo} height="20" width="20" alt="Xverse Logo" /><br></br> use Xverse Wallet
                            </button>

                            <button
                                className={`m-1 use_button ${activeWallet === 'Hiro' ? 'active-wallet' : ''}`}
                                onClick={async () => {
                                    const hiroPubkey = await connectHiro(testnet)
                                    setHiroPublicKey(hiroPubkey);
                                    const address = await getAdressInfoHiro();
                                    setOnChainAddress(address);
                                    setActiveWallet('Hiro');
                                }}
                                variant="success"
                                size="md"
                            >
                                <Image src={HiroLogo} height="20" width="20" alt="Hiro Logo" id="hiro-wallet-logo" /><br></br> use Hiro Wallet
                            </button>

                            <button
                                className={`m-1 use_button ${activeWallet === 'Ordimint' ? 'active-wallet' : ''}`}
                                onClick={
                                    () => {
                                        renderSelectWalletModal();
                                        setActiveWallet('Ordimint');
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
                <WalletConnectModal
                    address={onChainAddress}
                    show={showWalletConnectModal}
                    handleClose={() => setShowWalletConnectModal(false)}
                />
            </>
        );
    }
}

export default WalletSelect;

