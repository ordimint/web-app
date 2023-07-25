import React, { useEffect } from 'react'
import { ordinalsImageUrl, cloudfrontUrl } from "./WalletConfig/utils"
import { Figure, Button } from 'react-bootstrap'
import { useState } from 'react'

export default function UtxoImage({ utxo, style, inscriptionUtxosByUtxo, testnet }) {

  const [isText, setIsText] = useState(false)
  const [text, setText] = useState("")

  async function setContentType(utxo) {
    const contentURL = await ordinalsImageUrl(inscriptionUtxosByUtxo[`${utxo.txid}:${utxo.vout}`], testnet)
    const response = await fetch(contentURL)
    const contentType = response.headers.get('content-type')
    if (contentType.includes("text")) {
      const text = await response.text()
      setText(text)
      setIsText(true)
    }
  }

  useEffect(() => {
    setContentType(utxo)
  }, [utxo])

  return (
    <>
      {
        isText ? (<p className='bitcoin-address'>
          {text}
        </p>) :
          (
            <Figure>
              <Figure.Image
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
