import React, { useEffect } from 'react'
import { ordinalsImageUrl, cloudfrontUrl } from "../../WalletConfig/utils"
import { parseTextInscription } from '../../../public/functions/ordinalFunctions'
import { Figure, Button } from 'react-bootstrap'
import { useState } from 'react'

export default function UtxoImageAuction({ utxo, style, inscriptionUtxosByUtxo, testnet }) {

    const [isText, setIsText] = useState(false)
    const [text, setText] = useState("")

    function renderJsonData(jsonData) {
        // Handle different p flags
        switch (jsonData.pFlag) {
            case "ons":
                return (
                    <>
                        <p>News</p>
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
                        <h5>{jsonData.name}</h5>
                    </>
                );

            case "brc-20":
                if (jsonData.op === "mint") {
                    return (

                        <>
                            <p>BRC-20 {jsonData.op}</p>
                            <p><strong>Ticker:</strong> {jsonData.tick}</p>
                            <p><strong>Amount:</strong> {jsonData.amt}</p>
                        </>

                    );
                } else if (jsonData.op === "transfer") {
                    return (

                        <>
                            <p>BRC-20 {jsonData.op}</p>
                            <p><strong>Ticker:</strong> {jsonData.tick}</p>
                            <p><strong>Amount:</strong> {jsonData.amt}</p>
                        </>

                    );
                }
                else if (jsonData.op === "deploy") {
                    return (

                        <>
                            <p>BRC-20 {jsonData.op}</p>
                            <p><strong>Ticker:</strong> {jsonData.tick}</p>
                            <p><strong>Amount:</strong> {jsonData.amt}</p>
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
                setText(parsedText)
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
