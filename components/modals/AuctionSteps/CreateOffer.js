import React from 'react'
import { useState, useEffect } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { TailSpin } from 'react-loading-icons';
const CreateOffer = (props) => {


    useEffect(() => {
        getInscriptionData(props.currentUtxo)
    }, [])

    async function getInscriptionData(utxo) {
        try {
            const response = await fetch(`https://ordapi.xyz/output/${utxo.txid}:${utxo.vout}`)
            const inscriptionPerOutput = await response.json()
            const response2 = await fetch(`https://ordapi.xyz${inscriptionPerOutput.inscriptions}`)
            const response2JSON = await response2.json()
            props.setInscriptionData(response2JSON)
            console.log(response2JSON)

        }
        catch (e) {
            console.log(e)
        }

    }

    return (
        <>  {props.inscriptionData ?
            <>
                <h4>Content:</h4>
                <iframe id="create-offer-content" className='mb-2' src={`https://ordapi.xyz${props.inscriptionData.content}`} title="The Ordinal you want to sell"></iframe>

                <div className='bitcoin-address p-2'>
                    <h5>Owner Address:</h5>
                    {props.inscriptionData.address}</div>

                <div className='bitcoin-address p-2 m-2'    >
                    <h5>Inscription ID:</h5>
                    {props.inscriptionData.id}</div>


                <h4 className='m-2'>Inscription Number: {props.inscriptionData.inscription_number}</h4>


            </> : <p>  <br />
                <TailSpin stroke="#ffffff" speed={0.75} />
                <br />Loading...</p>
        }

            <InputGroup className="mb-3">
                <InputGroup.Text>Price</InputGroup.Text>
                <Form.Control aria-label="Amount in Sats" />
                <InputGroup.Text>Sats</InputGroup.Text>
            </InputGroup>

        </>
    )
}

export default CreateOffer
