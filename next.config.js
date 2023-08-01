const withTM = require('next-transpile-modules')(['react-bootstrap']);

module.exports = withTM({
    webpack: (config) => {
        // Enable async WebAssembly
        config.experiments = {
            asyncWebAssembly: true,
        };

        // Set the module type for .wasm files
        config.module.rules.push({
            test: /\.wasm$/,
            type: 'webassembly/async',
        });

        return config;
    },
    async rewrites() {
        return [
            {
                source: '/invoicehook',
                destination: 'http://localhost:5000/invoicehook',
            }]
    },
    async redirects() {
        return [
            {
                source: '/collections/:path*',
                destination: '/ordinal-collections/:path*',
                permanent: true,
            },
        ]
    }, images: {
        domains: ['explorer.ordimint.com', 'testnet.ordimint.com'],
    },
});
