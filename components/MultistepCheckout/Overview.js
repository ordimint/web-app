import React, { useState, useEffect } from 'react';
import axios from "axios";

const Overview = ({ price }) => {

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

    const fees = 100;
    const postageSize = 200;
    const networkFee = 300;
    const totalAmount = price + fees + postageSize + networkFee;

    return (
        <div id='overview-container'>
            <table className="overview-table">
                <tbody>
                    <tr>
                        <td>Price:</td>
                        <td>~{Math.round(price)} Sats</td>
                        <td>~${(price / priceUSDinSats).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Fees:</td>
                        <td>~{fees} Sats</td>
                        <td>~${(fees / priceUSDinSats).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Postage Size:</td>
                        <td>~{postageSize} Sats</td>
                        <td>~${(postageSize / priceUSDinSats).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Network Fee:</td>
                        <td>~{networkFee} Sats</td>
                        <td>~${(networkFee / priceUSDinSats).toFixed(2)}</td>
                    </tr>
                    <tr className="separation-line">
                        <td><strong>Total:</strong></td>
                        <td><strong>~{totalAmount} Sats</strong></td>
                        <td><strong>~${(totalAmount / priceUSDinSats).toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>

            <div id='info-text-home-bottom'>
                <p className='mt-2'>We mint directly to your address. No intermediaries.</p>
                <p>You get ~1000 Sats back when you receive the Ordinal.</p>
            </div>
        </div>
    );
};

export default Overview;
