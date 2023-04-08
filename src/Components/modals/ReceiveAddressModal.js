import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { getAddressInfoNostr } from '../WalletConfig/utils';
import { getAddressInfoLedger } from '../WalletConfig/connectLedger';

export default function ReceiveAddressModal({ showReceiveAddressModal,
  setShowReceiveAddressModal, nostrPublicKey, ledgerPublicKey, ordimintAddress }) {

  const [ledgerAddress, setLedgerAddress] = useState(null)


  useEffect(() => {
    if (!ledgerPublicKey) return
    async function getLedgerAddress() {
      setLedgerAddress(await (await getAddressInfoLedger(ledgerPublicKey, false)).address)
    }
    getLedgerAddress()

  }, [ledgerPublicKey])

  useEffect(() => {
    if (!showReceiveAddressModal || !ledgerPublicKey || !ordimintAddress) return
    async function verifyAddress() {
      await getAddressInfoLedger(ledgerPublicKey, true).address

    }
    verifyAddress()
  }
    , [showReceiveAddressModal])

  return (
    <Modal show={showReceiveAddressModal} onHide={() => setShowReceiveAddressModal(false)} className="py-5">
      <Modal.Header closeButton className="p-4">
        <Modal.Title>Receive Address</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5 py-3 text-center">
        {nostrPublicKey && <div className="bitcoin-address">{getAddressInfoNostr(nostrPublicKey).address}</div>}
        {ledgerPublicKey && <div className="bitcoin-address">{ledgerAddress}</div>}
        {ordimintAddress && <div className="bitcoin-address">{ordimintAddress}</div>}
        <br />
        {ledgerPublicKey && <h5>verify your address on your ledger device</h5>}
        <p className="very-small-text">
          (you can safely receive ordinal inscriptions and regular bitcoin to this address)
        </p>
        <br />
        <Button variant="primary" onClick={() => {
          if (nostrPublicKey) {
            navigator.clipboard.writeText(getAddressInfoNostr(nostrPublicKey).address)
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
