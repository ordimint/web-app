import React from 'react'
import { Row, Col } from 'react-bootstrap';
import OrdinalCard from '../OrdinalCard';

const OrdinalGrid = ({ ordinals }) => {
    return (
        <Row>
            {
                Array.isArray(ordinals) && ordinals.map((inscriptionId, index) => {
                    return (
                        <Col xs={6} sm={4} md={3} lg={2} xl={2} xxl={1} key={index}>
                            <OrdinalCard ordinalId={inscriptionId} />
                        </Col>
                    );
                })
            }
        </Row>
    );
}

export default OrdinalGrid
