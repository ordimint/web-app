import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'

const PayOffer = (props) => {
    return (
        <div id="offer-invoice-modal">
            <h4>Yout offer is signed and ready. All you have to do is pay the listing fee of 5$</h4>
            <hr></hr>
            <p>
                This QR-Code is a Lightning invoice. Pay with a Wallet like{" "}
                <a
                    href="https://phoenix.acinq.co/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Phoenix
                </a>
                ,{" "}
                <a href="https://muun.com/" target="_blank" rel="noreferrer">
                    Muun
                </a>
                ,{" "}
                <a
                    href="https://breez.technology/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Breez
                </a>
                ,{" "}
                <a href="https://bluewallet.io/" target="_blank" rel="noreferrer">
                    BlueWallet
                </a>{" "}
                or with{" "}
                <a href="https://strike.me/" target="_blank" rel="noreferrer">
                    Strike
                </a>{" "}
                and{" "}
                <a href="https://cash.app/" target="_blank" rel="noreferrer">
                    Cash App
                </a>{" "}
                . You can also pay with a browser extension like{" "}
                <a href="https://getalby.com/" target="_blank" rel="noreferrer">
                    Alby
                </a>
                .
            </p>
            <a href={"lightning:" + props.invoice}>
                <QRCodeCanvas value={props.invoice} size={256} />
            </a>
            <h6>After you paid the invoice your offer is listed.</h6>
        </div>
    )
}

export default PayOffer
