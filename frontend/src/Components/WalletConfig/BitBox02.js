import 'regenerator-runtime/runtime'

import {
    constants,
    BitBox02API,
    getDevicePath,
} from 'bitbox02-api';



export class BitBox02 {
    constructor(logout) {  // You can provide the `logout` callback of your application in the constructor
        this.logout = logout;
        this.status = undefined;
        this.pairingConfirmed = false;
    }

    async init(keypath) {
        try {
            const devicePath = await getDevicePath();
            this.api = new BitBox02API(devicePath);

            await this.api.connect(

                /** @param showPairingCb
                 *  Store the pairing code on the class instance. Show this to the user to compare with code
                 *  on the device when `this.status === 'unpaired'`
                 */
                pairingCode => {
                    this.pairingCode = pairingCode;
                },

                /** @param userVerify
                 *  Store the Promise's `resolve` on the class instance to call when the user clicks the corresponding button
                 *  in your application after confirming the pairing on device
                 */
                async () => {
                    return new Promise(resolve => {
                        this.pairingConfirmed = true;
                        this.pairingConfirmationResolve = resolve;
                    });
                },

                /** @param handleAttestationCb
                *  Store the attestation result on the class instance. If attestation fails, the user might have a fake device.
                *  Handle this condition below.
                */
                attestationResult => {
                    this.attestation = attestationResult;
                },

                /** @param onCloseCb
                *  Log the user out of your application when device is unplugged/the websocket closes.
                *  Here we use the `logout` function provided in the constructor as the callback.
                */
                () => {
                    this.logout();
                },

                /** @param setStatusCb
                *  Store the status on the class instance to take appropriate actions based on status.
                *  All possible status can be found here: https://github.com/digitalbitbox/bitbox02-api-go/blob/master/api/firmware/status.go
                */
                status => {
                    this.status = status;
                }
            );
        } catch (e) {
            alert(e);
            this.logout();
            return;
        }


        // Handle attestattion failure
        if (!this.attestation) {
            alert('Attestation failed');
        }

    }


}




// export const connectBitBox = async () => {
//     const device = new BitBox02()
//     await device.init()
//     console.log("device code", device.pairingCode)
//     const pubKey = await device.api.btcXPub(constants.messages.BTCCoin.BTC, "m/86'/0'/0'/0/0", constants.messages.BTCXPubType.btcXPub, false)
//     console.log("pubKey", pubKey)
//     return pubKey

// }


// export const getAddressInfoBitBox = (bitBoxPublicKey) => {


// }