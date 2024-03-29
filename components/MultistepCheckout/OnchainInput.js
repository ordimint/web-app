import React from 'react'
import { InputGroup, Form } from 'react-bootstrap'

const OnchainInput = (props) => {
    return (

        <div id='onchain-input'>
            <InputGroup className="mb-3">
                {/* <InputGroup.Text id="basic-addon1">Receiver address</InputGroup.Text> */}
                <Form.Control

                    value={props.onChainAddress || ''}
                    placeholder="Enter a Bitcoin address or connect a wallet"
                    aria-label="onchain-address"
                    aria-describedby="basic-addon1"
                    onChange={(e) => props.setOnChainAddress(e.target.value)}

                />
            </InputGroup>
        </div>
    )
}

export default OnchainInput
