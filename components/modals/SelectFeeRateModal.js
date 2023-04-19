import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { outputValue, shortenStr } from '../WalletConfig/utils';
import UtxoImage from '../UtxoImage';

export default function SelectFeeRateModal({
  showSelectFeeRateModal,
  setShowSelectFeeRateModal,
  currentUtxo,
  sendFeeRate,
  setSendFeeRate,
  setShowBeginSendModal,
  setShowConfirmSendModal,
  inscriptionUtxosByUtxo
}) {
  return (
    <Modal show={showSelectFeeRateModal} onHide={() => setShowSelectFeeRateModal(false)} className="py-5">
      <Modal.Header closeButton className="p-4">
        <Modal.Title>Sending {shortenStr(currentUtxo && `${currentUtxo.txid}:${currentUtxo.vout}`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body p-4">
        <div className='modal-preview-in-utxomodal'>
          {currentUtxo && <UtxoImage utxo={currentUtxo} style={{ width: "60%" }} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />}
        </div>
        <p>
          <b>Select a fee rate</b>
        </p>
        <Form.Range min="1" max="100" defaultValue={sendFeeRate} onChange={(evt) => setSendFeeRate(evt.target.value)} />
        <p>
          <b>{sendFeeRate} sat/vbyte</b>
        </p>
        <p>
          <b>Output Value</b>: {currentUtxo && sendFeeRate && outputValue(currentUtxo, sendFeeRate)} sats
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setShowSelectFeeRateModal(false)
        }}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={() => {
          setShowSelectFeeRateModal(false)
          setShowBeginSendModal(true)
        }}>
          Back
        </Button>
        <Button variant="primary" onClick={() => {
          setShowSelectFeeRateModal(false);
          setShowConfirmSendModal(true);
        }}>
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
