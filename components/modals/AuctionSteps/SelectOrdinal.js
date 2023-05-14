import React, { useEffect } from 'react'
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';




const SelectOrdinal = (props) => {

    const [showSpinner, setShowSpinner] = useState(true);
    const [ordinal, setOrdinal] = useState(0);
    const [publicKey, setPublicKey] = useState('');

    useEffect(() => {

        if (props.selectedWallet === 'Ordimint') {


        }
        else if (props.selectedWallet === 'Alby') {

        }
        else if (props.selectedWallet === 'Ledger') {

        }

    }, [props.selectedWallet]);


    return (

        <>
            {
                showSpinner ? (
                    <Spinner>
                        <span className="sr-only"></span>
                    </Spinner>) :
                    (
                        <>{publicKey}</>
                    )
            }

        </>
    )
}

export default SelectOrdinal
