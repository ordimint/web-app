import React, { createContext, useState } from 'react';

export const TestnetContext = createContext();

export const TestnetProvider = ({ children }) => {
    const [testnet, setTestnet] = useState(false);

    return (
        <TestnetContext.Provider value={{ testnet, setTestnet }}>
            {children}
        </TestnetContext.Provider>
    );
};
