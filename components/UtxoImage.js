import React, { useEffect } from 'react'
import { ordinalsImageUrl, cloudfrontUrl } from "./WalletConfig/utils"
import { parseTextInscription } from '../public/functions/ordinalFunctions'
import { Figure, Button } from 'react-bootstrap'
import { useState } from 'react'

export default function UtxoImage({ utxo, style, inscriptionUtxosByUtxo, testnet }) {

  const CONTENT_TYPES = {
    TEXT: 'text',
    HTML: 'html',
    IMAGE: 'image',
    VIDEO: 'video',
    UNKNOWN: 'unknown'
  };


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
    const contentURL = await ordinalsImageUrl(inscriptionUtxosByUtxo[`${utxo.txid}:${utxo.vout}`], testnet);
    const response = await fetch(contentURL);
    const contentType = response.headers.get('content-type');
    let detectedType = CONTENT_TYPES.UNKNOWN;
    console.log("Content Type:", contentType); // right after you fetch the contentType


    if (contentType.includes("text/html")) {
      detectedType = CONTENT_TYPES.HTML;
      setText(contentURL); // For iframe, we'd need the URL itself
    } else if (contentType.startsWith("image/")) {
      detectedType = CONTENT_TYPES.IMAGE;
    } else if (contentType.startsWith("video/")) {
      detectedType = CONTENT_TYPES.VIDEO;
    } else if (contentType.includes("text/plain")) {
      const text = await response.text();
      const parsedText = parseTextInscription(text);

      if (parsedText.pFlag) {
        setText(renderJsonData(parsedText));
        detectedType = CONTENT_TYPES.TEXT;
      } else {

        setText(text.substring(0, 250)); // Directly set the text if there's no pFlag
        detectedType = CONTENT_TYPES.TEXT;
      }
    }

    setIsText(detectedType);
  }


  useEffect(() => {
    setContentType(utxo, testnet)
  }, [utxo])


  return (
    <>
      {isText === CONTENT_TYPES.HTML ? (
        <div className="thumbnail-container">
          <div className="thumbnail">
            <iframe
              className="iframe-content pt-3"
              src={text}
              title="Embedded content"
              frameBorder="0"
            />
          </div>
        </div>

      ) : isText === CONTENT_TYPES.IMAGE ? (
        <Figure>
          <Figure.Image
            className='m-2'
            width={100}
            thumbnail
            src={utxo.status.confirmed ? ordinalsImageUrl(inscriptionUtxosByUtxo[`${utxo.txid}:${utxo.vout}`], testnet) : cloudfrontUrl(utxo)}
          />
          <Figure.Caption>
            {/* Any caption content you want */}
          </Figure.Caption>
        </Figure>
      ) : isText === CONTENT_TYPES.VIDEO ? (
        <video width="320" height="240" controls>
          <source src={utxo.status.confirmed ? ordinalsImageUrl(inscriptionUtxosByUtxo[`${utxo.txid}:${utxo.vout}`], testnet) : cloudfrontUrl(utxo)} type={contentType} />
          Your browser does not support the video tag.
        </video>
      ) : isText === CONTENT_TYPES.TEXT ? (

        <div className='inscription-text'>
          <p>
            {text}
          </p>
        </div>

      ) : (
        <div className='inscription-text'>{text}</div>
      )}
    </>
  );

}
