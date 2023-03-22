import React from 'react'
import { useState, useEffect } from 'react'
import { Form, InputGroup, Container } from 'react-bootstrap'

const BRC = (props) => {

  return (
    <div id="brc-20-input-container">
      <div className='mt-2'>
        <p>Deploy new token or mint existing one.</p>
      </div>
      <Form className="mt-2">

        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            value="deploy"
            label="Deploy"
            name="group1"
            type="radio"
            onChange={(e) => { props.onChange(e.target.value) }}
            checked={props.brcRadioButton === "deploy"}
          />
          <Form.Check
            inline
            label="Mint"
            value="mint"
            name="group1"
            type="radio"
            onChange={(e) => { props.onChange(e.target.value) }}
            checked={props.brcRadioButton === "mint"}
          />
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
              props.setFileSize(((e.target.value.length) + 1000));
              props.setTokenTicker(e.target.value);
            }
          }
        />
      </InputGroup>
      {props.brcRadioButton === "deploy" ?
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
        </>
        :

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

        </>


      }
      <p><a href="https://domo-2.gitbook.io/brc-20-experiment/" target="_blank" rel="noopener noreferrer" >Read more about BRC-20 tokens here</a></p>

    </div>
  )
}

export default BRC
