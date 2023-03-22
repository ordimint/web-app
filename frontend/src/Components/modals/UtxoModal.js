import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ordinalsUrl, shortenStr } from '../WalletConfig/utils';
import UtxoImage from '../UtxoImage';

export default function UtxoModal({
  setShowBeginSendModal,
  showUtxoModal,
  setShowUtxoModal,
  currentUtxo,
  inscriptionUtxosByUtxo,
  SENDS_ENABLED,
}) {
  return (
    <Modal show={showUtxoModal} onHide={() => { setShowUtxoModal(false) }} className="py-5">
      <Modal.Header closeButton className="p-4">
        <Modal.Title>{shortenStr(currentUtxo && `${currentUtxo.txid}:${currentUtxo.vout}`)}:{currentUtxo && currentUtxo.vout}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body p-4" style={{ border: "0px;" }}>
        <div className="modal-preview-in-utxomodal">
          {currentUtxo && <UtxoImage utxo={currentUtxo} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />}
        </div>
        <b>Utxo:</b>
        <div className='bitcoin-address container fluid'>
          <p>

            <a href={currentUtxo && ordinalsUrl(currentUtxo)} target="_blank" rel="noreferrer">{currentUtxo && `${currentUtxo.txid}:${currentUtxo.vout}`}</a>

          </p>
        </div>
        <p>
          <b>Value:</b> {currentUtxo && currentUtxo.value.toLocaleString('en-US')} sats
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { setShowUtxoModal(false) }}>
          Cancel
        </Button>
        {SENDS_ENABLED && <Button variant="primary" onClick={() => {
          setShowUtxoModal(false)
          setShowBeginSendModal(true)
        }}> Send </Button>}
      </Modal.Footer>
    </Modal >
  )
}
