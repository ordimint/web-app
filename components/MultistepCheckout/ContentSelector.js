import React from 'react'
import { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import FileUpload from './FileUpload'
import BRC from './BRC'
import TextInput from './TextInput';
import DomainInput from './DomainInput';
import NewsInput from './NewsInput';
import Rune from './Rune';

import TAP from './TAP';
import OP_RETURN from './OP_RETURN'


const ContentSelector = ({
    file,
    fileType,
    fileName,
    setFile,
    setFileType,
    setFileName,
    setFileSize,
    testnet,
    fileTooBig,
    OP_RETURNTooBig,
    tabKey,
    setTabKey,
    textInput,
    setTextInput,
    setNewsAuthor,
    setNewsText,
    setNewsTitle,
    setNewsUrl,
    domainInput,
    setDomainInput,
    tokenTicker,
    setTokenTicker,
    tokenSupply,
    setTokenSupply,
    mintLimit,
    setMintLimit,
    mintAmount,
    setMintAmount,
    transferAmount,
    setTransferAmount,
    setbrcRadioButton,
    brcRadioButton,
    setOpReturnInput,
    opReturnInput,
    setBtcItems

}) => {
    return (
        <div id="tab-container">
            <h3 className='m-3'>What do you want to inscribe?</h3>
            <Tabs
                transition={false}
                activeKey={tabKey}
                onSelect={(k) => setTabKey(k)}
                justify
                fill
                style={{ border: "none" }}
            >

                <Tab eventKey="file" title="File">
                    <hr className='seperation-line-tab' />
                    <FileUpload
                        file={file}
                        fileType={fileType}
                        fileName={fileName}
                        setFile={setFile}
                        setFileType={setFileType}
                        setFileName={setFileName}
                        setFileSize={setFileSize}
                        testnet={testnet}
                        fileTooBig={fileTooBig}
                    />

                </Tab>
                <Tab eventKey="text" title="Text">
                    <hr className='seperation-line-tab' />
                    <TextInput
                        setFileSize={setFileSize}
                        textInput={textInput}
                        setTextInput={setTextInput}
                    />
                </Tab>
                <Tab eventKey="news" title="News">
                    <hr className='seperation-line-tab' />
                    <NewsInput
                        setFileSize={setFileSize}
                        setNewsAuthor={setNewsAuthor}
                        setNewsText={setNewsText}
                        setNewsTitle={setNewsTitle}
                        setNewsUrl={setNewsUrl}
                    />
                </Tab>
                <Tab eventKey="domain" title=".sats Domain">
                    <hr className='seperation-line-tab' />
                    <DomainInput
                        setFileSize={setFileSize}
                        domainInput={domainInput}
                        setDomainInput={setDomainInput}

                    />
                </Tab>
                <Tab eventKey="brc" title="BRC-20">
                    <hr className='seperation-line-tab' />
                    <BRC
                        setTokenTicker={setTokenTicker}
                        setFileSize={setFileSize}
                        tokenSupply={tokenSupply}
                        setTokenSupply={setTokenSupply}
                        tokenName={tokenTicker}
                        setTokenName={setTokenTicker}
                        mintLimit={mintLimit}
                        setMintLimit={setMintLimit}
                        mintAmount={mintAmount}
                        setMintAmount={setMintAmount}
                        onChange={setbrcRadioButton}
                        brcRadioButton={brcRadioButton}
                        transferAmount={transferAmount}
                        setTransferAmount={setTransferAmount}
                    />

                </Tab>
                <Tab eventKey="tap" title="TAP-Token">
                    <hr className='seperation-line-tab' />
                    <TAP
                        setTokenTicker={setTokenTicker}
                        setFileSize={setFileSize}
                        tokenSupply={tokenSupply}
                        setTokenSupply={setTokenSupply}
                        tokenName={tokenTicker}
                        setTokenName={setTokenTicker}
                        mintLimit={mintLimit}
                        setMintLimit={setMintLimit}
                        mintAmount={mintAmount}
                        setMintAmount={setMintAmount}
                        onChange={setbrcRadioButton}
                        brcRadioButton={brcRadioButton}
                        transferAmount={transferAmount}
                        setTransferAmount={setTransferAmount}
                        onUpdateBtcFields={setBtcItems}
                    />
                </Tab>
                <Tab eventKey="opreturn" title="OP_RETURN">
                    <hr className='seperation-line-tab' />
                    <OP_RETURN
                        opReturnInput={opReturnInput}
                        setOpReturnInput={setOpReturnInput}
                        OP_RETURNTooBig={OP_RETURNTooBig}
                    />
                </Tab>

                {/* <Tab eventKey="rune" title="RUNE">
                    <hr className='seperation-line-tab' />
                    <Rune
                        setTokenTicker={setTokenTicker}
                        setFileSize={setFileSize}
                        tokenSupply={tokenSupply}
                        setTokenSupply={setTokenSupply}
                        tokenName={tokenTicker}
                        setTokenName={setTokenTicker}
                        mintLimit={mintLimit}
                        setMintLimit={setMintLimit}
                        mintAmount={mintAmount}
                        setMintAmount={setMintAmount}
                        onChange={setbrcRadioButton}
                        brcRadioButton={brcRadioButton}
                        transferAmount={transferAmount}
                        setTransferAmount={setTransferAmount}
                        onUpdateBtcFields={setBtcItems}
                    />
                </Tab> */}
            </Tabs>

        </div>
    )
}

export default ContentSelector
