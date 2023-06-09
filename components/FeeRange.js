

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
            setSelectedFee(result.economyFee);
            props.setFee({ target: { value: result.economyFee } });
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
                        {minFee} sats/vByte <br></br><b> &gt; 1 day </b> <br></br>
                    </ToggleButton>
                    <ToggleButton
                        id="tbg-radio-4"
                        value={mediumFee}
                        onChange={() => handleFeeChange(mediumFee)}
                        title="normal"
                        disabled
                    >
                        {mediumFee} sats/vByte <br></br><b> 4 hours</b> <br></br>
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-5"
                        value={maxFee}
                        onChange={() => handleFeeChange(maxFee)}
                        title="fast"
                        disabled
                    >
                        {maxFee} sats/vByte <br></br><b> 1 hour</b> <br></br>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

        </div>
    );
};

export default FeeRange;
