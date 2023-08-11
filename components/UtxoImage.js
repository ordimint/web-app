import React, { useEffect } from 'react'
import { ordinalsImageUrl, cloudfrontUrl } from "./WalletConfig/utils"
import { parseTextInscription } from '../public/functions/ordinalFunctions'
import { Figure, Button } from 'react-bootstrap'
import { useState } from 'react'

export default function UtxoImage({ utxo, style, inscriptionUtxosByUtxo, testnet }) {

  const [isText, setIsText] = useState(false)
  const [text, setText] = useState("")

  function renderJsonData(jsonData) {

    switch (jsonData.pFlag) {
      case "ons":
        return (
          <>
            <h4>News</h4>
            <p><strong>Title:</strong> {jsonData.title}</p>
            {/* <p><strong>URL:</strong> <a href={jsonData.url}>{jsonData.url}</a></p>
                        <p><strong>Author:</strong> {jsonData.author}</p>
                        <p><strong>Body:</strong> {jsonData.body.length > 20 ? jsonData.body.substring(0, 20) + '...' : jsonData.body}</p> */}

          </>
        );

      case "sns":
        return (
          <>
            <p>.sats Domain</p>
            <h4>{jsonData.name}</h4>
          </>
        );

      case "brc-20":
        if (jsonData.op === "mint") {
          return (

            <>
              <h4>BRC-20 {jsonData.op}</h4>
              <p><strong>Ticker:</strong> {jsonData.tick}</p>
              <p><strong>Amount:</strong> {jsonData.amt}</p>
            </>

          );
        } else if (jsonData.op === "transfer") {
          return (

            <>
              <h4>BRC-20 {jsonData.op}</h4>
              <p><strong>Ticker:</strong> {jsonData.tick}</p>
              <p><strong>Amount:</strong> {jsonData.amt}</p>
            </>

          );
        }
        else if (jsonData.op === "deploy") {
          return (

            <>
              <h4>BRC-20 {jsonData.op}</h4>
              <p><strong>Ticker:</strong> {jsonData.tick}</p>
              {jsonData.max && <p><strong>Max:</strong> {jsonData.max}</p>}
              {jsonData.lim && <p><strong>Limit:</strong> {jsonData.lim}</p>}
            </>

          );
        }

      case "tap":
        console.log(jsonData)
        if (jsonData.op === "token-send") {
          return (
            <>
              <h4>TAP Token {jsonData.op}</h4>
              {jsonData.items.map((item, index) => (
                <div key={index}>
                  <p><strong>Ticker:</strong> {item.tick}</p>
                  <p><strong>Amount:</strong> {item.amt}</p>
                  <p><strong>Address:</strong> {item.address}</p>
                </div>
              ))}
            </>
          );
        } else
          if (jsonData.op === "token-mint") {
            return (

              <>
                <h4>TAP {jsonData.op}</h4>
                <p><strong>Ticker:</strong> {jsonData.tick}</p>
                <p><strong>Amount:</strong> {jsonData.amt}</p>
              </>

            );
          } else if (jsonData.op === "token-transfer") {
            return (

              <>
                <h4>TAP {jsonData.op}</h4>
                <p><strong>Ticker:</strong> {jsonData.tick}</p>
                <p><strong>Amount:</strong> {jsonData.amt}</p>
              </>

            );
          }
          else if (jsonData.op === "token-deploy") {
            return (

              <>
                <h4>TAP {jsonData.op}</h4>
                <p><strong>Ticker:</strong> {jsonData.tick}</p>
                {jsonData.max && <p><strong>Max:</strong> {jsonData.max}</p>}
                {jsonData.lim && <p><strong>Limit:</strong> {jsonData.lim}</p>}
              </>

            );
          }


      default:
        return <p>Unknown operation.</p>;
    }
  }


  async function setContentType(utxo, testnet) {

    const contentURL = await ordinalsImageUrl(inscriptionUtxosByUtxo[`${utxo.txid}:${utxo.vout}`], testnet)
    const response = await fetch(contentURL)
    const contentType = response.headers.get('content-type')
    if (contentType.includes("text")) {
      const text = await response.text()
      const parsedText = parseTextInscription(text)
      if (parsedText.pFlag) {
        setText(renderJsonData(parsedText))
      }
      else {
        setText(parsedText.substring(0, 600))
      }
      setIsText(true)

    }
  }

  useEffect(() => {
    setContentType(utxo, testnet)
  }, [utxo])


  return (
    <>
      {
        isText ? (<div className='m-2' >
          {text}
        </div>) :
          (
            <Figure>
              <Figure.Image
                className='m-2'
                width={100}
                thumbnail
                src={utxo.status.confirmed ? ordinalsImageUrl(inscriptionUtxosByUtxo[`${utxo.txid}:${utxo.vout}`], testnet) : cloudfrontUrl(utxo)}
              />
              <Figure.Caption>

              </Figure.Caption>
            </Figure>)
      }
    </>

  )
}
