const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Ruta de entrada
    output: {
        filename: 'bundle.js', // Archivo de salida
        path: path.resolve(__dirname, 'dist'), // Ruta de salida
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Regla para archivos JS
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Usar Babel para transpilar JS
                },
            },
            // Puedes agregar más reglas aquí si es necesario
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Plantilla HTML
            filename: 'index.html', // Nombre del archivo HTML generado
        }),
    ],
    resolve: {
        extensions: ['.js'], // Extensiones que Webpack debe resolver
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // Carpeta donde se sirven los archivos
        compress: true,
        port: 9000, // Puerto del servidor
    },
};
