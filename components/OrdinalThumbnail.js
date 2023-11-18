import React from 'react'
import { useState } from 'react'
import { Button, Figure } from 'react-bootstrap'
import SingleOrdinalModal from '../components/modals/SingleOrdinalModal';

const OrdinalThumbnail = (props) => {

    const [isDetailModal, showDetailModal] = useState(false);
    const renderDetailModal = () => showDetailModal(true);
    const hideDetailModal = () => showDetailModal(false);

    return (
        <div >



            <Figure>
                <div style={{ position: 'relative' }}>
                    <iframe title="ordinal-iframe" className="ordinal-iframe"
                        src={`https://explorer.ordimint.com/preview/${props.collection.id}`}
                    >
                    </iframe>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} onClick={renderDetailModal} />
                </div>

                <h5 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.collection.meta.name}</h5>
            </Figure>

            <SingleOrdinalModal
                show={isDetailModal}
                handleClose={hideDetailModal}
                selectedOrdinal={props.collection.id}
                selectedOrdinalName={props.collection.meta.name}
            />
        </div >
    )
}

export default OrdinalThumbnail
