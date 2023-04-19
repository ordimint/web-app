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
                                props.setFileSize(((e.target.value.length) + 1000));
                                // props.checkDomain(e.target.value)
                            }

                        }
                    />
                    <InputGroup.Text id="basic-addon2">.sats</InputGroup.Text>
                </InputGroup>

                {/* <Button variant="primary"
                    onClick={() => checkDomain(props.domainInput)}>Check Availability</Button> */}


                {/* <h4 className='mb-3'>
                    {props.domainAvailable ? <div className='available'>Domain is available</div> : <div className='not-available'>Domain is not available</div>}
                </h4>
                <p>Don't trust, verify!</p> */}
                <p><a href="https://docs.sats.id/sats-names/about" target="_blank" rel="noopener noreferrer" >Learn more about Sats Names</a></p>
            </div>
        </div>
    )
}

export default DomainInput
