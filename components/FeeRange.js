

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
            setMinFee(result.hourFee);
            setMediumFee(result.halfHourFee);
            setMaxFee(result.fastestFee + 5);
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

            <div id="fee-range">
                <ToggleButtonGroup type="radio" name="options" className='toggle-button-custom' value={selectedFee}>
                    <ToggleButton id="tbg-radio-3" value={minFee} onChange={() => handleFeeChange(minFee)} title="slow">
                        {minFee} sats/vByte <br></br><b> normal </b> <br></br>
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-4" value={mediumFee} onChange={() => handleFeeChange(mediumFee)} title="normal">
                        {mediumFee} sats/vByte <br></br><b> fast</b> <br></br>
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-5" value={maxFee} onChange={() => handleFeeChange(maxFee)} title="fast">
                        {maxFee} sats/vByte <br></br><b> turbo</b> <br></br>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

        </div>
    );
};

export default FeeRange;
