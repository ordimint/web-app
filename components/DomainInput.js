import React from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
const DomainInput = (props) => {



    return (

        <div>
            <div id="domain-input-container">

                <InputGroup className="m-4" id='domain-input-field'>
                    <Form.Control
                        placeholder="your domain name"

                        value={props.domainInput}

                        onInput={

                            (e) => {
                                props.setDomainInput(e.target.value);
                                props.setFileSize(((e.target.value.length)));
                                // props.checkDomain(e.target.value)
                            }

                        }
                    />
                    <InputGroup.Text id="basic-addon2">.sats</InputGroup.Text>
                </InputGroup>

                <p><a href="https://docs.sats.id/sats-names/about" target="_blank" rel="noopener noreferrer" >Learn more about Sats Names</a></p>
            </div>
        </div>
    )
}

export default DomainInput
