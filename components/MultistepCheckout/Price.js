import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const Price = (props) => {

    const [priceUSDinSats, setPrice] = useState(0);

    useEffect(() => {
        async function getPrice() {
            return axios({
                method: "get",
                url: process.env.REACT_APP_PRICE_API,
            }).then(function (response) {
                return 100_000_000 / response.data.USD.buy;
            });
        }
        getPrice().then((result) => {
            setPrice(result);
        });
    }, []);




    return (

        <div className='m-3' >
            <h5 >
                <div id="price">

                    <div> {Math.round(props.price)} Sats {" "}


                    </div>

                    <div> {(props.price / priceUSDinSats).toFixed(2)}$</div>

                </div>
            </h5>
        </div>
    )
}

export default Price
