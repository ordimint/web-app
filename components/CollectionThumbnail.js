import React from 'react'
import { useState, useEffect } from 'react'
import { Image, Figure } from 'react-bootstrap'
import { getContentType } from '../public/functions/ordinalFunctions';

const CollectionThumbnail = (props) => {


    const [isText, setIsText] = useState(false)


    async function setContentType() {
        const response = await getContentType(props.collection.inscription_icon)
        const contentType = response
        if (contentType.includes("text")) {
            // console.log(contentType)
            setIsText(true)
        }
        else {
            setIsText(false)
        }
    }


    useEffect(() => {
        setContentType()
    }, [])



    return (
        <div>
            {isText ? (
                <Figure>

                    <iframe className="ordinal-iframe image-thumbnail"
                        title="ordinal-iframe"

                        src={`https://explorer.ordimint.com/preview/${props.collection.inscription_icon}`}
                    >
                    </iframe>


                    <Figure.Caption>
                        <h4>
                            {props.collection.name}
                        </h4>
                    </Figure.Caption>
                </Figure>

            ) :
                <Figure>
                    <Figure.Image
                        thumbnail
                        width={200}
                        height={200}
                        alt={props.collection.name}
                        src={`https://explorer.ordimint.com/content/${props.collection.inscription_icon}`}
                    />
                    <Figure.Caption>
                        <h4>
                            {props.collection.name}
                        </h4>
                    </Figure.Caption>
                </Figure>
            }

        </div >
    )
}

export default CollectionThumbnail
