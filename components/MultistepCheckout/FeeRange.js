

import React, { useEffect, useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

const getFeesRecommended = async () => {
    const response = await fetch('https://mempool.space/api/v1/fees/recommended');
    const data = await response.json();
    return data;
};

const FeeRange = (props) => {
    const [minFee, setMinFee] = useState(0);
    const [mediumFee, setMediumFee] = useState(20);
    const [maxFee, setMaxFee] = useState(0);
    const [selectedFee, setSelectedFee] = useState(null);

    useEffect(() => {
        const fetchFees = async () => {
            const result = await getFeesRecommended();
            setMinFee(result.economyFee);
            setMediumFee(result.halfHourFee);
            setMaxFee(result.fastestFee);
            setSelectedFee(result.halfHourFee);
            props.setFee({ target: { value: result.halfHourFee } });
        };

        fetchFees();
    }, []);

    const handleFeeChange = (val) => {
        setSelectedFee(val);
        props.setFee({ target: { value: val } });
    };

    return (

        <div>
            <h4>How fast should your Ordinal be minted?</h4>
            <div id="fee-range">
                <ToggleButtonGroup type="radio" name="options" className='toggle-button-custom2' value={selectedFee}>
                    <ToggleButton id="tbg-radio-3" value={minFee} onChange={() => handleFeeChange(minFee)} title="slow">
                        <h5>Slow</h5>
                        <h5> &gt; 1 day </h5>  {minFee} sats/vByte <br></br>
                    </ToggleButton>
                    <ToggleButton
                        id="tbg-radio-4"
                        value={mediumFee}
                        onChange={() => handleFeeChange(mediumFee)}
                        title="normal"

                    >
                        <h5>Normal</h5>
                        <h5> 4 hours</h5>   {mediumFee} sats/vByte <br></br>
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-5"
                        value={maxFee}
                        onChange={() => handleFeeChange(maxFee)}
                        title="fast"

                    >
                        <h5>Fast</h5>
                        <h5> 1 hour</h5>   {maxFee} sats/vByte <br></br>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

        </div>
    );
};

export default FeeRange;
