import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router'
import Link from 'next/link';






const OrdinalCard = (props) => {
    const router = useRouter()

    const [data, setData] = useState(null);
    let explorerURL = process.env.REACT_APP_MAINNET_URL;
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(`${explorerURL}/inscription/${props.ordinalId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const responseJSON = await response.json();
                    setData(responseJSON);

                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [props.ordinalId]);



    return (
        <Card className='ordinal-card'>

            {/* <Card.Title>#{data?.inscription_number}</Card.Title> */}
            <Link href={`/${props.ordinalId}`}>

                <Card.Body>
                    <div style={{ position: 'relative' }} onClick={() => router.push(`/${props.ordinalId}`)}>
                        <iframe src={`${explorerURL}/preview/${props.ordinalId}`} style={{ width: '100%', height: '100%' }} />
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
                    </div>
                </Card.Body>
            </Link>

        </Card>
    );
};

export default OrdinalCard;