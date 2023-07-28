
import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { TailSpin } from 'react-loading-icons';
import { TestnetContext } from '../contexts/TestnetContext';
const InscriptionsDetails = (props) => {
    const { testnet } = useContext(TestnetContext)

    const [inscriptionData, setInscriptionData] = useState(null)


    useEffect(() => {
        getInscriptionData(props.utxo)
    }, [testnet, props.utxo])

    async function getInscriptionData(utxo) {
        if (testnet) return
        try {
            const response = await fetch(`https://ordapi.xyz/output/${utxo.txid}:${utxo.vout}`)
            const inscriptionPerOutput = await response.json()
            const response2 = await fetch(`https://ordapi.xyz${inscriptionPerOutput.inscriptions}`)
            const response2JSON = await response2.json()
            setInscriptionData(response2JSON)
        }
        catch (e) {
            console.log(e)
        }

    }
    return (
        <>
            {
                testnet ? <></>
                    :
                    <div>

                        {inscriptionData ?
                            <p>#{inscriptionData.inscription_number}</p> : <p>
                                <br />
                                <TailSpin stroke="#ffffff" speed={0.75} />
                                <br />
                                Loading...</p>
                        }
                    </div>
            }
        </>
    )
}

export default InscriptionsDetails
