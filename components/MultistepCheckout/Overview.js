import React, { useState, useEffect } from 'react';
import axios from "axios";

const Overview = (props) => {

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

    const [brcString, setBrcString] = useState("")

    const constructPreview = () => {

        if (props.tokenStandard === "brc") {
            var brcString = "";
            if (props.brcRadioButton === "deploy") {
                brcString = `{ "p": "brc-20", "op": "deploy", "tick": "${props.tokenTicker}", "max": "${props.tokenSupply}", "lim": "${props.mintLimit}" }`

            }
            else if (props.brcRadioButton === "mint") {
                brcString = `{ "p": "brc-20", "op": "mint", "tick": "${props.tokenTicker}", "amt": "${props.mintAmount}" }`
            }
            else if (props.brcRadioButton === "transfer") {
                brcString = `{ "p": "brc-20", "op": "transfer", "tick": "${props.tokenTicker}", "amt": "${props.transferAmount}" }`
            }
            const jsonObj = JSON.parse(brcString);
            const prettyJsonString = JSON.stringify(jsonObj, null, 2);
            setBrcString(prettyJsonString)

        }
        else if (props.tokenStandard === "tap") {
            var tapString = "";
            if (props.brcRadioButton === "deploy") {
                tapString = `{ "p": "tap", "op": "token-deploy", "tick": "${props.tokenTicker}", "max": "${props.tokenSupply}", "lim": "${props.mintLimit}" }`

            }
            else if (props.brcRadioButton === "mint") {
                tapString = `{ "p": "tap", "op": "token-mint", "tick": "${props.tokenTicker}", "amt": "${props.mintAmount}" }`
            }
            else if (props.brcRadioButton === "transfer") {
                tapString = `{ "p": "tap", "op": "token-transfer", "tick": "${props.tokenTicker}", "amt": "${props.transferAmount}" }`
            }
            else if (props.brcRadioButton === "token-send") {

                const items = props.btcItems.map(item => (

                    {
                        tick: item.tick,
                        amt: item.amt,
                        address: item.address
                    }));
                tapString = JSON.stringify({
                    p: "tap",
                    op: "token-send",
                    items: items
                });
            }
            const jsonObj = JSON.parse(tapString);
            const prettyJsonString = JSON.stringify(jsonObj, null, 2);
            setBrcString(prettyJsonString)

        }

    }
    useEffect(() => {
        console.log(brcString)
        constructPreview()
    }, [props.tokenStandard, props.brcRadioButton, props.tokenTicker, props.tokenSupply, props.mintLimit, props.mintAmount, props.transferAmount, props.tapRadioButton])


    const fees = props.fee * props.filesize;
    const postageSize = 1000;
    const networkFee = 300;
    const totalAmount = props.price;

    return (
        <div id='overview-container'>


            {props.tabKey === "tap" &&
                <>
                    <h5>TAP operation: {props.brcRadioButton} </h5>


                    <pre className='token-preview-string'>{brcString}</pre>

                </>
            }
            {props.tabKey === "brc" &&
                <>
                    <h5>BRC-20 operation: {props.brcRadioButton} </h5>


                    <pre className='token-preview-string'>{brcString}</pre>

                </>
            }

            {props.tabKey === "text" &&
                <>
                    <h5>Text inscription:</h5>
                    <div className='token-preview-string'>

                        <h6>{props.textInput}</h6>

                    </div>
                </>
            }
            {props.tabKey === "news" &&
                <>
                    <h5>News inscription:</h5>
                    <div className='token-preview-string'>

                        <h6>News Title: {props.newsTitle}</h6>
                        <h6>News Author: {props.newsAuthor}</h6>
                        <h6>News Url:{props.newsUrl}</h6>
                        <h6>News Text: {props.newsText}</h6>


                    </div>
                </>
            }
            {props.tabKey === "opreturn" &&
                <>
                    <h5>OP_RETURN message </h5>

                    <div className='token-preview-string'>

                        <h5>{props.opReturnInput}</h5>

                    </div>
                </>
            }
            {props.tabKey === "domain" &&
                <>
                    <h5>Domain inscription </h5>

                    <div className='token-preview-string'>

                        <h5>{props.domainInput}.sats</h5>

                    </div>
                </>
            }
            {props.tabKey === "file" &&
                <>
                    <h5>File inscription </h5>

                    <div className='token-preview-string'>

                        <h6>{props.fileName}</h6>

                    </div>
                </>
            }
            <table className="overview-table">
                <tbody>
                    {/* <tr>
                        <td>Price:</td>
                        <td>~{Math.round(price)} Sats</td>
                        <td>~${(price / priceUSDinSats).toFixed(2)}</td>
                    </tr> */}
                    {/* <tr>
                        <td>Mining-Fees:</td>
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
                    </tr> */}
                    <tr className="separation-linee">
                        <td><strong>Total:</strong></td>
                        <td><strong>~{totalAmount} Sats</strong></td>
                        <td><strong> ~${(totalAmount / priceUSDinSats).toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>

            <div id='info-text-home-bottom'>
                <p className='mt-2'>We mint directly to your address. No intermediaries.</p>
                {/* <p>You get ~1000 Sats back when you receive the Ordinal.</p> */}
            </div>
        </div>
    );
};

export default Overview;
