import React from 'react'
import { useState, useEffect } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'

const BRC = (props) => {

  const transferFields = (
    <>
      <InputGroup className='news-input-group'>
        <InputGroup.Text htmlFor='basic-url' required>
          Amount
        </InputGroup.Text>
        <Form.Control
          type='number'
          aria-label='transfer-amount'
          aria-describedby='basic-addon1'
          value={props.transferAmount}
          onInput={(e) => {
            props.setTransferAmount(e.target.value);
          }}
        />
      </InputGroup>
    </>
  );


  return (
    <div id="brc-20-input-container">
      <div className='mt-2'>
        <p>Deploy, mint or transfer BRC-20 token.</p>
      </div>
      <Form className="mt-2">

        <div key={`inline-radio`} className="mb-3 " >

          <input className="form-check-input custom-radio" type="radio" value="deploy" onChange={(e) => { props.onChange(e.target.value) }}
            checked={props.brcRadioButton === "deploy"} />
          <label className="form-check-label"  >
            Deploy
          </label>


          <input className="form-check-input custom-radio" type="radio" value="mint" onChange={(e) => { props.onChange(e.target.value) }}
            checked={props.brcRadioButton === "mint"} />
          <label className="form-check-label"  >
            Mint
          </label>

          <input className="form-check-input custom-radio" type="radio" value="transfer" onChange={(e) => { props.onChange(e.target.value) }}
            checked={props.brcRadioButton === "transfer"} />
          <label className="form-check-label"  >
            Transfer
          </label>

        </div>

      </Form>

      <InputGroup className='news-input-group'>
        <InputGroup.Text htmlFor="basic-url" required>Ticker</InputGroup.Text>
        <Form.Control
          value={props.tokenTicker}
          placeholder="Token ticker (max 4 characters)"
          aria-label="toke-ticker"
          aria-describedby="basic-addon1"
          onInput={
            (e) => {
              props.setFileSize(((e.target.value.length)));
              props.setTokenTicker(e.target.value);
            }
          }
        />
      </InputGroup>
      {props.brcRadioButton === "deploy" ? (
        <>
          <InputGroup className='news-input-group'>
            <InputGroup.Text htmlFor="basic-url" required>Total Supply</InputGroup.Text>
            <Form.Control
              type='number'
              aria-label="token-supply"
              aria-describedby="basic-addon1"
              value={props.tokenSupply}
              onInput={
                (e) => {
                  props.setTokenSupply(e.target.value);
                }
              }
            />
          </InputGroup>
          <InputGroup className='news-input-group'>
            <InputGroup.Text htmlFor="basic-url" required>Limit Per Mint</InputGroup.Text>
            <Form.Control
              type='number'
              aria-label="mint-limit"
              aria-describedby="basic-addon1"
              value={props.mintLimit}
              onInput={
                (e) => {
                  props.setMintLimit(e.target.value);
                }
              }
            />
          </InputGroup>
        </>)
        : props.brcRadioButton === 'transfer' ? (
          transferFields
        ) : (
          <>
            <InputGroup className='news-input-group'>
              <InputGroup.Text htmlFor="basic-url" required>Amount</InputGroup.Text>
              <Form.Control
                type='number'
                aria-label="deploy-amount"
                aria-describedby="basic-addon1"
                value={props.mintAmount}
                onInput={
                  (e) => {
                    props.setMintAmount(e.target.value);
                  }
                }
              />
            </InputGroup>

          </>)


      }
      <p><a href="https://domo-2.gitbook.io/brc-20-experiment/" className='active_link' target="_blank" rel="noopener noreferrer" >Read more about BRC-20 tokens here</a></p>
    </div>
  )
}

export default BRC
