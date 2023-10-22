import React from 'react'
import { useState, useEffect } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'



const TAP = (props) => {
    const [btcFields, setBtcFields] = useState([{ tick: '', amt: '', address: '' }]);

    const addField = () => {
        const newFields = [...btcFields, { tick: '', amt: '', address: '' }];
        setBtcFields(newFields);
        props.onUpdateBtcFields(newFields);
    };


    const removeField = (index) => {
        const newFields = [...btcFields];
        newFields.splice(index, 1);
        setBtcFields(newFields);
        props.onUpdateBtcFields(newFields);
    };


    const updateField = (index, key, value) => {
        const newFields = [...btcFields];
        newFields[index][key] = value;
        setBtcFields(newFields);
        props.onUpdateBtcFields(newFields);
    };


    const constructJsonData = () => {
        return {
            p: "tap",
            op: "token-send",
            items: btcFields
        };
    };

    const logData = () => {
        console.log(constructJsonData());
    };

    const transferFields = (
        <>
            <InputGroup className='news-input-group'>
                <InputGroup.Text htmlFor='basic-url' required>
                    Amount
                </InputGroup.Text>
                <Form.Control
                    type='number'
                    aria-label='transfer-amount'
                    aria-describedby='basic-addon1'
                    value={props.transferAmount}
                    onInput={(e) => {
                        props.setTransferAmount(e.target.value);
                    }}
                />
            </InputGroup>
        </>
    );

    const renderBtcFields = () => {
        return btcFields.map((field, index) => (
            <>
                <InputGroup className='tap-group-repeat' key={index} >
                    <div className='input-field-tap'>
                        <InputGroup.Text required>Ticker</InputGroup.Text>
                        <Form.Control
                            value={field.tick}
                            placeholder="Token ticker"
                            onInput={(e) => updateField(index, 'tick', e.target.value)}
                        />
                    </div>

                    <div className='input-field-tap'>
                        <InputGroup.Text required>Amount</InputGroup.Text>
                        <Form.Control
                            type='number'
                            value={field.amt}
                            placeholder="Transfer amount"
                            onInput={(e) => updateField(index, 'amt', e.target.value)}
                        />

                    </div>
                    <div className='input-field-tap'>
                        <InputGroup.Text required>Bitcoin Address</InputGroup.Text>
                        <Form.Control
                            value={field.address}
                            placeholder="Receiver Address"
                            onInput={(e) => updateField(index, 'address', e.target.value)}
                        />
                    </div>
                </InputGroup>
                {index === btcFields.length - 1 && btcFields.length > 1 && (
                    <div className="news-input-group d-flex justify-content-end">
                        <Button variant="danger" onClick={() => removeField(index)}>
                            Remove
                        </Button>
                    </div>
                )}

            </>
        ));
    };

    return (
        <div id="brc-20-input-container">
            <div className='mt-2'>
                <h5 className='mt-3'>Deploy, mint or transfer TAP token.</h5>
            </div>
            <Form className="mt-2">

                <div key={`inline-radio`} className="mb-3 " >

                    <input className="form-check-input custom-radio" type="radio" value="deploy" onChange={(e) => { props.onChange(e.target.value) }}
                        checked={props.brcRadioButton === "deploy"} />
                    <label className="form-check-label"  >
                        Deploy
                    </label>


                    <input className="form-check-input custom-radio" type="radio" value="mint" onChange={(e) => { props.onChange(e.target.value) }}
                        checked={props.brcRadioButton === "mint"} />
                    <label className="form-check-label"  >
                        Mint
                    </label>

                    <input className="form-check-input custom-radio" type="radio" value="transfer" onChange={(e) => { props.onChange(e.target.value) }}
                        checked={props.brcRadioButton === "transfer"} />
                    <label className="form-check-label"  >
                        Transfer
                    </label>

                    <input className="form-check-input custom-radio" type="radio" value="token-send" onChange={(e) => { props.onChange(e.target.value) }}
                        checked={props.brcRadioButton === "token-send"} />
                    <label className="form-check-label">
                        Token Send
                    </label>


                </div>

            </Form>
            {props.brcRadioButton !== "token-send" && (
                <>
                    <InputGroup className='news-input-group'>

                        <InputGroup.Text htmlFor="basic-url" required>Ticker</InputGroup.Text>
                        <Form.Control
                            value={props.tokenTicker}
                            placeholder="Token ticker"
                            aria-label="toke-ticker"
                            aria-describedby="basic-addon1"
                            onInput={
                                (e) => {
                                    props.setFileSize(((e.target.value.length)));
                                    props.setTokenTicker(e.target.value);
                                }
                            }
                        />
                    </InputGroup>
                    {props.brcRadioButton === "deploy" ? (
                        <>
                            <InputGroup className='news-input-group'>
                                <InputGroup.Text htmlFor="basic-url" required>Total Supply</InputGroup.Text>
                                <Form.Control
                                    type='number'
                                    aria-label="token-supply"
                                    aria-describedby="basic-addon1"
                                    value={props.tokenSupply}
                                    onInput={
                                        (e) => {
                                            props.setTokenSupply(e.target.value);
                                        }
                                    }
                                />
                            </InputGroup>
                            <InputGroup className='news-input-group'>
                                <InputGroup.Text htmlFor="basic-url" required>Limit Per Mint</InputGroup.Text>
                                <Form.Control
                                    type='number'
                                    aria-label="mint-limit"
                                    aria-describedby="basic-addon1"
                                    value={props.mintLimit}
                                    onInput={
                                        (e) => {
                                            props.setMintLimit(e.target.value);
                                        }
                                    }
                                />
                            </InputGroup>
                        </>)
                        : props.brcRadioButton === 'transfer' ? (
                            transferFields
                        ) : (
                            <>
                                <InputGroup className='news-input-group'>
                                    <InputGroup.Text htmlFor="basic-url" required>Amount</InputGroup.Text>
                                    <Form.Control
                                        type='number'
                                        aria-label="deploy-amount"
                                        aria-describedby="basic-addon1"
                                        value={props.mintAmount}
                                        onInput={
                                            (e) => {
                                                props.setMintAmount(e.target.value);
                                            }
                                        }
                                    />
                                </InputGroup>

                            </>)
                    }
                </>)}
            {props.brcRadioButton === "token-send" && (
                <>
                    {renderBtcFields()}
                    <Button className='m-3' variant="primary" onClick={addField}>
                        Add More
                    </Button>
                    {/* <Button variant="info" onClick={logData}>
                        Log Data
                    </Button> */}
                </>
            )}

            <p><a href="https://github.com/BennyTheDev/tap-protocol-specs" className='active_link' target="_blank" rel="noopener noreferrer" >Read more about TAP tokens here</a></p>
        </div>
    )
}

export default TAP
