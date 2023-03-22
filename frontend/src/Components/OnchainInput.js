import React from 'react'
import { InputGroup, Form } from 'react-bootstrap'

const OnchainInput = (props) => {
    return (

        <div >
            <InputGroup className="mb-3" id='onchain-input'>
                <InputGroup.Text id="basic-addon1">Receiver address</InputGroup.Text>
                <Form.Control
                    value={props.onChainAddress}
                    placeholder="No address entered"
                    aria-label="onchain-address"
                    aria-describedby="basic-addon1"
                    onChange={(e) => props.setOnChainAddress(e.target.value)}

                />
            </InputGroup>
        </div>
    )
}

export default OnchainInput
