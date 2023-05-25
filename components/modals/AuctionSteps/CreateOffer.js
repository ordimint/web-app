import React from 'react'
import { useState, useEffect } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
const CreateOffer = (props) => {
    const [inscriptionData, setInscriptionData] = useState(null)

    useEffect(() => {
        getInscriptionData(props.currentUtxo)
    }, [])

    async function getInscriptionData(utxo) {
        try {
            const response = await fetch(`https://ordapi.xyz/output/${utxo.txid}:${utxo.vout}`)
            const inscriptionPerOutput = await response.json()
            const response2 = await fetch(`https://ordapi.xyz${inscriptionPerOutput.inscriptions}`)
            const response2JSON = await response2.json()
            setInscriptionData(response2JSON)
            console.log(response2JSON)

        }
        catch (e) {
            console.log(e)
        }

    }

    return (
        <>  {inscriptionData ?
            <>
                <h4>Content:</h4>
                <iframe id="create-offer-content" className='mb-2' src={`https://ordapi.xyz${inscriptionData.content}`} title="The Ordinal you want to sell"></iframe>

                <div className='bitcoin-address p-2'>
                    <h5>Owner Address:</h5>
                    {inscriptionData.address}</div>

                <div className='bitcoin-address p-2 m-2'    >
                    <h5>Inscription ID:</h5>
                    {inscriptionData.id}</div>


                <h4 className='m-2'>Inscription Number: {inscriptionData.inscription_number}</h4>


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
