module.exports = {
    apps: [
        {
            name: 'txscanner',
            script: '/src/app.js',
            watch: true,
            ignore_watch: ['node_modules', 'block_data_*.csv']
        }
    ]
};
