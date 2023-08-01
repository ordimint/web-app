import React, { useContext, useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Container } from 'react-bootstrap';
import { TestnetContext } from '../contexts/TestnetContext';

const TestnetSwitch = () => {
    const { setTestnet } = useContext(TestnetContext);
    const [isTestnet, setIsTestnet] = useState(false);

    const handleSelectionChange = (value) => {
        setIsTestnet(value)
        setTestnet(value);

    };

    return (
        <div>
            <Container>
                <div id="switch-inscription-number-container">
                    <ToggleButtonGroup type="radio" name="switch-inscription-number" className='toggle-button-custom' defaultValue={false}>
                        <ToggleButton id="tbg-radio-inscription-number-1" value={false} onChange={() => handleSelectionChange(false)} title="positive">
                            <b> Mainnet </b> <br></br>
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-inscription-number-2" value={true} onChange={() => handleSelectionChange(true)} title="negative">
                            <b> Testnet</b> <br></br>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </Container>
        </div>
    );
};

export default TestnetSwitch;
