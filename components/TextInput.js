import React from 'react'

const TextInput = (props) => {
    return (
        <div id="text-input-container">
            <textarea
                value={props.textInput}
                onInput={

                    (e) => {
                        props.setTextInput(e.target.value);
                        props.setFileSize(((e.target.value.length) + 1000));
                    }

                }
                autoFocus={true}
                className="m-3"
                id="exampleFormControlTextarea1"
                rows="12" />
        </div>
    )
}

export default TextInput
