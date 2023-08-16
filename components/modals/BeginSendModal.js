import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import UtxoImage from '../UtxoImage'
import { useState } from 'react'
import { shortenStr } from "../WalletConfig//utils"
import { validate, Network } from 'bitcoin-address-validation'
import Html5QrcodePlugin from '../Html5QrcodeScannerPlugin'

export default function BeginSendModal({
  showBeginSendModal,
  setShowBeginSendModal,
  currentUtxo,
  setIsBtcInputAddressValid,
  setDestinationBtcAddress,
  setShowSelectFeeRateModal,
  isBtcInputAddressValid,
  inscriptionUtxosByUtxo,
  testnet,
  setShowUtxoModal
}) {

  const [btcAddress, setBtcAddress] = useState("");


  const onNewScanResult = (decodedText, decodedResult) => {
    if (validate(decodedText, testnet ? Network.testnet : Network.mainnet)) {
      setBtcAddress(decodedText);
      setIsBtcInputAddressValid(true);
      setDestinationBtcAddress(decodedText);
      setShowBeginSendModal(false);
      setShowSelectFeeRateModal(true);
    } else {
      setIsBtcInputAddressValid(false);
    }
  };




  return (
    <Modal show={showBeginSendModal} onHide={() => { setShowBeginSendModal(false) }} className="py-5">
      <Modal.Header closeButton className="p-4">
        <Modal.Title>Send {shortenStr(currentUtxo && `${currentUtxo.txid}:${currentUtxo.vout}`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body p-4">
        <div className='modal-preview-in-utxomodal'>
          {currentUtxo && <UtxoImage testnet={testnet} utxo={currentUtxo} inscriptionUtxosByUtxo={inscriptionUtxosByUtxo} />}
        </div>
        <h6>Where would you like to send this to?</h6>
        <InputGroup className="mb-3">
          <Form.Control
            value={btcAddress}
            onChange={(evt) => {
              const newaddr = evt.target.value;
              setBtcAddress(newaddr);
              if (newaddr === '') {
                setIsBtcInputAddressValid(true);
                return;
              }
              if (!validate(newaddr, testnet ? Network.testnet : Network.mainnet)) {
                setIsBtcInputAddressValid(false);
                return;
              }
              setDestinationBtcAddress(newaddr);
              setShowBeginSendModal(false);
              setShowSelectFeeRateModal(true);
            }}
            placeholder="Paste BTC address here"
            aria-label="Paste BTC address heres"
            aria-describedby="basic-addon2"
            isInvalid={!isBtcInputAddressValid}
            id="btc-address-input-send-modal"
            autoFocus
          />

          <Form.Control.Feedback type="invalid">
            <br />That is not a valid {testnet ? 'testnet' : 'mainnet'} BTC address
          </Form.Control.Feedback>
        </InputGroup>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={true}
          qrCodeSuccessCallback={onNewScanResult}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setShowBeginSendModal(false)
        }}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={() => {
          setShowUtxoModal(true)
          setShowBeginSendModal(false)
        }}>
          Back
        </Button>
        <Button variant="primary" onClick={() => { setShowBeginSendModal(true) }}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
