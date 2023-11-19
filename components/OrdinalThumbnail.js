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
            <Figure className='ordinal-thumbnail-picture'>
                <div style={{ position: 'relative' }}>
                    <iframe title="ordinal-iframe" className="ordinal-iframe"
                        src={`https://explorer.ordimint.com/preview/${props.collection.id}`}
                    >
                    </iframe>

                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} onClick={renderDetailModal} />
                </div>

            </Figure>
            <h5 className='ordinal-thumbnail-caption' title={props.collection.meta.name}>{props.collection.meta.name}</h5>


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
