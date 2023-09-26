import React from 'react'
import { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import FileUpload from './FileUpload'
import BRC from './BRC'
import TextInput from './TextInput';
import DomainInput from './DomainInput';
import NewsInput from './NewsInput';

import TAP from './TAP';


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
                    <TextInput
                        setFileSize={setFileSize}
                        textInput={textInput}
                        setTextInput={setTextInput}
                    />
                </Tab>
                <Tab eventKey="news" title="News">
                    <NewsInput
                        setFileSize={setFileSize}
                        setNewsAuthor={setNewsAuthor}
                        setNewsText={setNewsText}
                        setNewsTitle={setNewsTitle}
                        setNewsUrl={setNewsUrl}
                    />
                </Tab>
                <Tab eventKey="domain" title=".sats Domain">
                    <DomainInput
                        setFileSize={setFileSize}
                        domainInput={domainInput}
                        setDomainInput={setDomainInput}

                    />
                </Tab>
                <Tab eventKey="brc" title="BRC-20">
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
            </Tabs>
        </div>
    )
}

export default ContentSelector
