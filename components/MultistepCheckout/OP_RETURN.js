import React from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'




const OP_RETURN = (props) => {
    let prevValue = "";
    return (

        <div id="opreturn-input-container">
            <InputGroup className="m-4" id='opreturn-input'>
                <Form.Control
                    placeholder="Your message"
                    value={props.opReturnInput}
                    onInput={
                        (e) => {

                            const byteSize = new Blob([e.target.value]).size;
                            if (byteSize > 80) {
                                props.OP_RETURNTooBig();
                                props.setOpReturnInput(prevValue);  // Reset to previous value if byte size is too big
                            } else {
                                prevValue = e.target.value;  // Update the previous value if byte size is within limit
                                props.setOpReturnInput(e.target.value);
                            }
                        }
                    }
                />
            </InputGroup>

            <p><a href="https://en.bitcoin.it/wiki/OP_RETURN" className='active_link' target="_blank" rel="noopener noreferrer" >Learn more about OP_RETURN.</a></p>
        </div>

    )
}

export default OP_RETURN
