import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { getAddressInfoNostr } from '../WalletConfig/utils';
import { getAddressInfoLedger } from '../WalletConfig/connectLedger';
import { QRCodeCanvas, } from "qrcode.react";

export default function ReceiveAddressModal({ showReceiveAddressModal,
  setShowReceiveAddressModal, nostrPublicKey, ledgerPublicKey, ordimintAddress, testnet }) {

  const [ledgerAddress, setLedgerAddress] = useState(null)


  useEffect(() => {
    if (!ledgerPublicKey) return
    async function getLedgerAddress() {
      setLedgerAddress(await (await getAddressInfoLedger(ledgerPublicKey, false, testnet)).address)
    }
    getLedgerAddress()

  }, [ledgerPublicKey, testnet])

  useEffect(() => {
    if (!showReceiveAddressModal || !ledgerPublicKey) return
    async function verifyAddress() {
      await getAddressInfoLedger(ledgerPublicKey, true, testnet).address

    }
    verifyAddress()
  }
    , [showReceiveAddressModal, testnet])

  function getAddressForQRCode() {
    if (nostrPublicKey) {
      return getAddressInfoNostr(nostrPublicKey, testnet).address;
    } else if (ledgerPublicKey) {
      return ledgerAddress;
    } else if (ordimintAddress) {
      return ordimintAddress;
    }
    return '';
  }

  return (
    <Modal show={showReceiveAddressModal} onHide={() => setShowReceiveAddressModal(false)} className="py-5">
      <Modal.Header closeButton className="p-4">
        <Modal.Title>Receive Address</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5 py-3 text-center">
        <div className="bitcoin-address">{getAddressForQRCode()}</div>
        <br />
        <QRCodeCanvas value={getAddressForQRCode()} size={256} />

        <br />

        {ledgerPublicKey && <h5>verify your address on your ledger device</h5>}
        <p className="very-small-text">
          (you can safely receive ordinal inscriptions and regular bitcoin to this address)
        </p>
        <br />
        <Button variant="primary" onClick={() => {
          if (nostrPublicKey) {
            navigator.clipboard.writeText(getAddressInfoNostr(nostrPublicKey, testnet).address)
          }
          if (ledgerPublicKey) {
            navigator.clipboard.writeText(ledgerAddress)
          }
          if (ordimintAddress) {
            navigator.clipboard.writeText(ordimintAddress)
          }
          setShowReceiveAddressModal(false)
        }}>Copy Address</Button>
      </Modal.Body>
    </Modal>
  )
}
