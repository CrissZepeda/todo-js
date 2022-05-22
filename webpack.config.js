//importacion de la libreria html-webpack-plugin
const HtmlWebPack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// exportamos los modulos
module.exports = {
    mode: "development", // modo en el cual estamos trabajando none | production | development

    // configuracion de que pasara cuando se compile y salga la aplicacion
    output: {
        // con esto se limpiara el dist
        clean: true, // false
        filename: "main.[contenthash].js", // cambiar el nombre del archivo
    },

    // en modules utilizaremos las librerias y su configuracion
    module: {
        rules: [
            {
                test: /\.html$/, // Buscar los archivos html
                loader: "html-loader", // con esto los dejara en el dist
                options: {
                    sources: false,
                },
            },
            {
                test: /\.css$/,
                exclude: /style.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /style.css$/,
                use: [MiniCssExtract.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "file-loader",
            },
        ],
    },

    optimization: {},

    // Configuraciones adicionales de las librerias
    plugins: [
        new HtmlWebPack({
            title: "Mi Webpack App", // cambiar el title de la pagina
            //filename: "Holamundo.html", // podemos cambiar los nombres
            template: "./src/index.html", // con este le indicamos al webpack que utilice el archivo que creamos como template
        }),
        new MiniCssExtract({
            filename: "[name].css", // o cambiarle el nomnre a otro ej: otro.css tambien podemos agregarle un hash css.edaefasreda.css con [name].[fullhash.css]
            ignoreOrder: false, // esto para que ignore el orden las importaciones de los css
        }),
        new CopyPlugin({
            patterns: [{ from: "./src/assets/img/", to: "./assets/" }],
        }),
    ],
};
