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
});
