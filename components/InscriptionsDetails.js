import React, { useEffect, useContext, useState } from 'react';
import { TailSpin } from 'react-loading-icons';
import { TestnetContext } from '../contexts/TestnetContext';
import { Button } from 'react-bootstrap';

const InscriptionsDetails = (props) => {
    const { testnet } = useContext(TestnetContext);
    const [inscriptionData, setInscriptionData] = useState(null);
    const explorerURL = testnet ? process.env.REACT_APP_TESTNET_URL : process.env.REACT_APP_MAINNET_URL;
    useEffect(() => {

        getInscriptionData(props.utxo);

    }, [testnet, props.utxo]);

    const getInscriptionDetails = async (inscriptionId) => {

        try {
            const response = await fetch(`${explorerURL}/inscription/${inscriptionId}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            if (response.headers.get('content-type').includes('application/json')) {
                const responseJSON = await response.json();

                return {
                    inscription_number: responseJSON.inscription_number,
                    value: responseJSON.output_value,
                    timestamp: responseJSON.timestamp,
                    inscription_id: responseJSON.inscription_id
                };
            } else {
                console.error('The response is not in JSON format');
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    async function getInscriptionData(utxo) {
        try {
            const explorerURL = testnet ? process.env.REACT_APP_TESTNET_URL : process.env.REACT_APP_MAINNET_URL;
            if (!explorerURL) {
                throw new Error('Explorer URL is not defined');
            }
            const response = await fetch(`${explorerURL}/output/${utxo.txid}:${utxo.vout}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok && response.headers.get('content-type').includes('application/json')) {
                const outputData = await response.json();

                // Check if inscriptions array is present and has at least one inscription
                if (Array.isArray(outputData.inscriptions) && outputData.inscriptions.length > 0) {
                    const inscriptionId = outputData.inscriptions[0]; // Take the first inscription
                    const inscriptionDetails = await getInscriptionDetails(inscriptionId);

                    if (inscriptionDetails) {
                        setInscriptionData(inscriptionDetails);
                    } else {
                        console.error('Failed to fetch inscription details');
                    }
                } else {
                    console.error('No inscriptions found');
                }
            } else {
                console.error('Failed to fetch data');
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>

            <div>
                {inscriptionData ? (
                    <>
                        <h5 className='m-3'>#{inscriptionData.inscription_number.toLocaleString('en-US')}</h5>
                        <h5 className='m-3'>{inscriptionData.value} Sats</h5>
                        <h5 className='m-3'>
                            {new Date(inscriptionData.timestamp * 1000).toLocaleDateString()}<br />
                            {new Date(inscriptionData.timestamp * 1000).toLocaleTimeString()}
                        </h5>
                        <a href={`/explorer/inscription/${inscriptionData.inscription_id}`} target="_blank" rel="noopener noreferrer">
                            <Button className='mb-2' variant='secondary'>Details</Button>
                        </a>
                    </>
                ) : (
                    <p>
                        <br />
                        <TailSpin stroke="#ffffff" speed={0.75} />
                        <br />
                        Loading...
                    </p>
                )}
            </div>

        </div>
    );
};

export default InscriptionsDetails;
