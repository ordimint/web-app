import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router'
import Link from 'next/link';




const OrdinalCard = ({ ordinalData, inscription_id, content_type, timestamp, inscription_number }) => {
    const router = useRouter()
    const [data, setData] = useState(null);
    const [jsonOperator, setJsonOperator] = useState(false);
    const [textContent, setTextContent] = useState('');
    const [renderedContent, setRenderedContent] = useState(null);
    const [loading, setLoading] = useState(true);

    let explorerURL = process.env.REACT_APP_MAINNET_URL;

    function renderJsonData(jsonData) {
        switch (jsonData.p) {
            case "ons":
                return (
                    <>
                        <h4>News</h4>
                        <div><strong>Title:</strong> {jsonData.title}</div>
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
                            <p>BRC-20 {jsonData.op}</p>
                            <div><strong>Ticker:</strong> {jsonData.tick}</div>
                            <div><strong>Amount:</strong> {jsonData.amt}</div>
                        </>

                    );
                } else if (jsonData.op === "transfer") {
                    return (

                        <>
                            <p>BRC-20 {jsonData.op}</p>
                            <div><strong>Ticker:</strong> {jsonData.tick}</div>
                            <div><strong>Amount:</strong> {jsonData.amt}</div>
                        </>

                    );
                }
                else if (jsonData.op === "deploy") {
                    return (

                        <>
                            <p>BRC-20 {jsonData.op}</p>
                            <div><strong>Ticker:</strong> {jsonData.tick}</div>
                            {jsonData.max && <div><strong>Max:</strong> {jsonData.max}</div>}
                            {jsonData.lim && <div><strong>Limit:</strong> {jsonData.lim}</div>}
                        </>

                    );
                }

            case "tap":

                if (jsonData.op === "token-send") {
                    return (
                        <>
                            <p>TAP Token {jsonData.op}</p>
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
                                <p>TAP {jsonData.op}</p>
                                <div><strong>Ticker:</strong> {jsonData.tick}</div>
                                <div><strong>Amount:</strong> {jsonData.amt}</div>
                            </>

                        );
                    } else if (jsonData.op === "token-transfer") {
                        return (

                            <>
                                <p>TAP {jsonData.op}</p>
                                <div><strong>Ticker:</strong> {jsonData.tick}</div>
                                <div><strong>Amount:</strong> {jsonData.amt}</div>
                            </>

                        );
                    }
                    else if (jsonData.op === "dmt-mint") {
                        return (

                            <>
                                <p>TAP {jsonData.op}</p>
                                <div><strong>Ticker:</strong> {jsonData.tick}</div>
                                <div><strong>Dep:</strong> {jsonData.dep.substring(0, 4)}</div>
                                <div><strong>Block:</strong> {jsonData.blk}</div>
                            </>

                        );
                    }
                    else if (jsonData.op === "token-deploy") {
                        return (

                            <>
                                <p>TAP {jsonData.op}</p>
                                <div><strong>Ticker:</strong> {jsonData.tick}</div>
                                {jsonData.max && <div><strong>Max:</strong> {jsonData.max}</div>}
                                {jsonData.lim && <div><strong>Limit:</strong> {jsonData.lim}</div>}
                            </>

                        );
                    }
            default:
                setJsonOperator(false);
                return <p>Unknown operation.</p>;
        }
    }



    useEffect(() => {

        if (ordinalData) {
            setData(ordinalData);
            setLoading(false);
        }
    }, [ordinalData]);

    useEffect(() => {
        if (data) {
            const processData = async (responseJSON) => {
                if (getContentTypeDisplay(responseJSON.content_type).includes('text')) {
                    const textResponse = await fetch(`${explorerURL}/content/${inscription_id}`);
                    let textContent;
                    try {
                        textContent = await textResponse.json();
                        setJsonOperator(true);
                        setTextContent(textContent);
                    } catch (error) {
                        // console.error(error);
                        setTextContent(textResponse)
                    }

                }
            }
            processData(data);
        }

    }, [data]);


    useEffect(() => {
        if (jsonOperator) {
            setRenderedContent(renderJsonData(textContent));
        }
    }, [jsonOperator]);

    function getContentTypeDisplay(contentType) {
        try {
            const type = contentType?.split(';')[0];
            if (type === 'text/plain') {
                return 'text';
            } else if (type === 'application/json') {
                return 'json';
            } else if (type === 'model/gltf-binary') {
                return 'gltf';
            } else if (type === 'image/svg+xml') {
                return 'svg';
            }
            else {
                return type?.split('/')[1];
            }
        } catch (error) {
            console.error(`Error processing content type: ${error}`);
            return 'unknown';
        }
    }

    if (loading) {

        return (
            <div className='ordinal-card-loading-spinner'>
                <Spinner className='ordinal-card-loading-spinner' animation="border" />

            </div>); // Render placeholder content
    }


    return (
        <Card className='ordinal-card'>
            <Link href={`/${inscription_id}`}>
                <Card.Body>
                    <div className='ordinal-card-content' onClick={() => router.push(`/${inscription_id}`)}>
                        {jsonOperator ? (

                            <div className='ordinal-card-text-content'>
                                {renderedContent}
                            </div>

                        ) :
                            (

                                <iframe className='ordinal-card-iframe' src={`${explorerURL}/preview/${inscription_id}`} />

                            )}
                        <div className='ordinal-card-overlay-div' />
                    </div>
                    <div className='ordinal-card-inscription-first-line'>

                        <span className='ordinal-card-inscription-number'>
                            {inscription_number}
                        </span>
                        <span className='ordinal-card-content-type'>
                            {getContentTypeDisplay(content_type)}
                        </span>

                    </div>

                    <div className='ordinal-card-timestamp'>
                        {Math.floor((Date.now() / 1000 - timestamp) / 86400)} days old
                    </div>
                </Card.Body>
            </Link>
        </Card>
    );
};


export default OrdinalCard;