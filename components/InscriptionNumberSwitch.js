import React from 'react';
import { ToggleButtonGroup, ToggleButton, Container } from 'react-bootstrap';

const InscriptionNumberSwitch = ({ onChange }) => {
    const handleSelectionChange = (value) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div>
            <Container>
                <div id="switch-inscription-number-container">
                    <ToggleButtonGroup type="radio" name="switch-inscription-number" className='toggle-button-custom' defaultValue={true}>
                        <ToggleButton id="tbg-radio-inscription-number-1" value={true} onChange={() => handleSelectionChange(true)} title="positive">
                            <b> Positive </b> <br></br>
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-inscription-number-2" value={false} onChange={() => handleSelectionChange(false)} title="negative">
                            <b> Negative</b> <br></br>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </Container>
        </div>
    );
};

export default InscriptionNumberSwitch;
