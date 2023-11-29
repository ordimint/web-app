import React from 'react'
import { Row, Col } from 'react-bootstrap';
import OrdinalCard from '../OrdinalCard';
import { Suspense } from 'react';



const OrdinalGrid = ({ ordinalsData }) => {

    return (
        <Row className='ordinal-grid-row'>
            {
                Array.isArray(ordinalsData) && ordinalsData.map((ordinalData, index) => {
                    return (

                        <Col xs={6} sm={3} md={2} lg={2} xl={2} xxl={1} key={index} className='ordinal-grid-col'>
                            <Suspense fallback={<LoadingText />}>
                                <OrdinalCard
                                    ordinalData={ordinalData}
                                    timestamp={ordinalData.timestamp}
                                    inscription_id={ordinalData.inscription_id}
                                    inscription_number={ordinalData.inscription_number}
                                    content_type={ordinalData.content_type}
                                />
                            </Suspense>
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
