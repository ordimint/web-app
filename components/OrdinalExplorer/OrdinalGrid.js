import React from 'react'
import { Row, Col } from 'react-bootstrap';
import OrdinalCard from '../OrdinalCard';
import { Suspense } from 'react';
import dynamic from 'next/dynamic'
// const OrdinalCard = dynamic(() => import('../OrdinalCard'), {
//     loading: () => <div className='m-4 p4'>🌀 Loading...</div>,
// })


const OrdinalGrid = ({ ordinalsData }) => {
    // console.log('OrdinalGrid ordinalsData:', ordinalsData); // Check the prop
    // Rest of the component
    return (
        <Row className='ordinal-grid-row'>
            {
                Array.isArray(ordinalsData) && ordinalsData.map((ordinalData, index) => {
                    return (

                        <Col xs={3} sm={3} md={2} lg={2} xl={2} xxl={1} key={index} className='ordinal-grid-col'>

                            <OrdinalCard
                                timestamp={ordinalData.timestamp}
                                inscription_id={ordinalData.inscription_id}
                                inscription_number={ordinalData.inscription_number}
                                content_type={ordinalData.content_type}
                            />

                        </Col>
                    );
                })
            }
        </Row>
    );
}

export default OrdinalGrid

function LoadingText() {
    return (
        <div>
            <p>🌀 Loading...</p>
        </div>
    );
};
