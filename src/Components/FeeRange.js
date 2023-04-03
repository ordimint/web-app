import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import RangeSlider from 'react-bootstrap-range-slider';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const getFeesRecommended = async () => {
    const response = await fetch("https://mempool.space/api/v1/fees/recommended");
    const data = await response.json();
    return data;
};

const FeeRange = (props) => {
    const [minFee, setMinFee] = useState(0);
    const [maxFee, setMaxFee] = useState(0);
    useEffect(() => {
        getFeesRecommended().then((result) => {
            setMinFee(result.hourFee + 10);
            setMaxFee(result.hourFee + 25);

        })
    }, [minFee, maxFee]);



    return (
        <div>

            <Form>

                <Form.Group as={Row}>

                    <Col>
                        <div id="fee-range" className='mt-3'>
                            <h6>Minting fee:  {props.value}{" "} Sats/vByte</h6>
                            <RangeSlider
                                value={props.value}
                                onChange={props.setFee}
                                min={minFee}
                                max={maxFee}
                            />
                        </div>
                    </Col>

                </Form.Group>
            </Form>
        </div>
    )
}

export default FeeRange

