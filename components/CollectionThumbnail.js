import React from 'react'
import { Figure } from 'react-bootstrap'
import Link from 'next/link'

const isValidUrl = (string) => {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }
    return true;
}

const CollectionThumbnail = (props) => {
    const icon = props.collection.inscription_icon;
    const url = icon ? `https://explorer.ordimint.com/preview/${icon}` : '';
    const validUrl = isValidUrl(url);
    const placeholderUrl = 'https://explorer.ordimint.com/preview/6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799i0'; // replace with your placeholder image URL

    return (

        <div>

            <Figure>

                <iframe title="ordinal-iframe" className="ordinal-iframe"
                    src={validUrl ? url : placeholderUrl}
                >
                </iframe>

                <Figure.Caption>
                    <h4>
                        {props.collection.name}
                    </h4>
                </Figure.Caption>
            </Figure>

        </div>

    );
}

export default CollectionThumbnail;