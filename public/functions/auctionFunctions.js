const bitcoin = require('bitcoinjs-lib')
const { networks, Psbt } = bitcoin

// Seller's details
const seller = {
    privateKey: 'cRwq3Nq5C5xSpYHDGSDkXTpdtpFhAVbFET8SmG1sgutnKoGcF8Cg',
    address: 'n1MzXjK5sF4h8cUy3nMjKNSqWZtJYxhRj7'
}

// Buyer's details
const buyer = {
    privateKey: 'cRwq3Nq5C5xSpYHDGSDkXTpdtpFhAVbFET8SmG1sgutnKoGcF8Cg',
    address: 'n1MzXjK5sF4h8cUy3nMjKNSqWZtJYxhRj7'
}

// Auction starting price in satoshis
let auctionPrice = 100000

// Mainnet or testnet
const network = networks.testnet

const sellerKeyPair = bitcoin.ECPair.fromWIF(seller.privateKey, network)
const sellerP2wpkh = bitcoin.payments.p2wpkh({ pubkey: sellerKeyPair.publicKey, network })

const buyerKeyPair = bitcoin.ECPair.fromWIF(buyer.privateKey, network)

// Function to create PSBT
function createPSBT(inputTxId, inputVout, price, buyerAddress) {
    const psbt = new Psbt({ network })

    psbt.addInput({
        hash: inputTxId,
        index: inputVout,
        witnessUtxo: {
            script: sellerP2wpkh.output,
            value: auctionPrice,
        }
    })

    psbt.addOutput({
        address: buyerAddress,
        value: price,
    })

    // Seller signs PSBT
    psbt.signInput(0, sellerKeyPair)

    return psbt
}

// Buyer signs the PSBT
function signPSBT(psbt) {
    psbt.signInput(0, buyerKeyPair)
    psbt.finalizeAllInputs()

    // Broadcast the transaction
    const txHex = psbt.extractTransaction().toHex()
    console.log(`Finalized transaction hex: ${txHex}`)

    // In real-world application, you would broadcast the transaction to the Bitcoin network here
}

// Example of creating a new PSBT for a potential buyer
let psbt = createPSBT('inputTransactionId', 0, auctionPrice, buyer.address)

// Buyer decides to sign the PSBT and finalize the auction
signPSBT(psbt)
