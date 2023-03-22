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
    useEffect(() => {
        getFeesRecommended().then((result) => {
            setMinFee(result.economyFee + 6);
            setMaxFee(result.fastestFee + 15);

        })
    }, []);

    const [minFee, setMinFee] = useState(getFeesRecommended().economyFee);
    const [maxFee, setMaxFee] = useState((getFeesRecommended().fastestFee + 15));

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

