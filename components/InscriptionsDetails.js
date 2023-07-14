import React, { useEffect } from 'react'
import { useState } from 'react'
import { TailSpin } from 'react-loading-icons';

const InscriptionsDetails = (props) => {

    const [inscriptionData, setInscriptionData] = useState(null)


    useEffect(() => {
        getInscriptionData(props.utxo)
    }, [])

    async function getInscriptionData(utxo) {
        try {
            const response = await fetch(`https://ordapi.xyz/output/${utxo.txid}:${utxo.vout}`)
            const inscriptionPerOutput = await response.json()
            // console.log(inscriptionPerOutput)
            const response2 = await fetch(`https://ordapi.xyz${inscriptionPerOutput.inscriptions}`)
            const response2JSON = await response2.json()
            setInscriptionData(response2JSON)

        }
        catch (e) {
            console.log(e)
        }

    }
    return (
        <div>

            {inscriptionData ?
                <p>#{inscriptionData.inscription_number}</p> : <p>
                    <br />
                    <TailSpin stroke="#ffffff" speed={0.75} />
                    <br />
                    Loading...</p>

            }

        </div>
    )
}

export default InscriptionsDetails
