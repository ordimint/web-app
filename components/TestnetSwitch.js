import React, { useContext, useEffect } from 'react';
import { ToggleButtonGroup, ToggleButton, Container } from 'react-bootstrap';
import { TestnetContext } from '../contexts/TestnetContext';

const TestnetSwitch = () => {
    const { testnet, setTestnet } = useContext(TestnetContext);

    const handleSelectionChange = (value) => {
        setTestnet(value);
    };



    useEffect(() => {
        handleSelectionChange(testnet);
    }, [testnet]);

    return (
        <div id="testnet-switch">
            <Container>
                <div id="switch-inscription-number-container">
                    <ToggleButtonGroup type="radio" name="switch-inscription-number" className='toggle-button-custom' value={testnet}>
                        <ToggleButton id="tbg-radio-inscription-number-1" value={false} onChange={() => handleSelectionChange(false)} title="positive">
                            <b> Mainnet </b> <br></br>
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-inscription-number-2" value={true} onChange={() => handleSelectionChange(true)} title="negative">
                            <b> Testnet </b> <br></br>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </Container>
        </div>
    );
};

export default TestnetSwitch;
