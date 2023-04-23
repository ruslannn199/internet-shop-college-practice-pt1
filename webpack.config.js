const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (isProd) {
		config.minimizer = [
			new CssMinimizerPlugin(),
			new TerserWebpackPlugin()
		]
	}
	return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				esModule: isDev
			},
		},
		'css-loader'
	]
	if (extra) {
		loaders.push(extra)
	}
	return loaders
}

const babelOptions = preset => {
	const opts = {
		presets: [
			'@babel/preset-env'
		]
	}
	if (preset) {
		opts.presets.pop('@babel/preset-env')
		opts.presets.push(preset)
	}
	return opts
}

const plugins = () => {
	const base = [
		new HTMLWebpackPlugin({
			template: './main/main.html',
			filename: './main/main.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './main/family-ideas/family-ideas.html',
			filename: './main/family-ideas/family-ideas.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './main/friend-nights/friend-nights.html',
			filename: './main/friend-nights/friend-nights.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './main/party-ideas/party-ideas.html',
			filename: './main/party-ideas/party-ideas.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './contacts/contacts.html',
			filename: './contacts/contacts.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/catalogue.html',
			filename: './catalogue/catalogue.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/arkham-horror/arkham-horror.html',
			filename: './catalogue/arkham-horror/arkham-horror.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/black-rose-war/black-rose-war.html',
			filename: './catalogue/black-rose-war/black-rose-war.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/bunker/bunker.html',
			filename: './catalogue/bunker/bunker.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/carcasson/carcasson.html',
			filename: './catalogue/carcasson/carcasson.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/eldritch-horror/eldritch-horror.html',
			filename: './catalogue/eldritch-horror/eldritch-horror.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/fallout/fallout.html',
			filename: './catalogue/fallout/fallout.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/gravity-falls/gravity-falls.html',
			filename: './catalogue/gravity-falls/gravity-falls.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/imagenarium/imagenarium.html',
			filename: './catalogue/imagenarium/imagenarium.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/lotr/lotr.html',
			filename: './catalogue/lotr/lotr.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/munchkin/munchkin.html',
			filename: './catalogue/munchkin/munchkin.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/slovodel/slovodel.html',
			filename: './catalogue/slovodel/slovodel.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/ticket-to-ride/ticket-to-ride.html',
			filename: './catalogue/ticket-to-ride/ticket-to-ride.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets/images/'),
					to: path.resolve(__dirname, 'dist/assets/images')
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: filename('css')
		})
	]

	if (isProd) {
		base.push(new WebpackBundleAnalyzer())
	}

	return base
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: { import: './index.js', filename: 'index.js'}
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: filename('js'),
    assetModuleFilename: 'assets/images/main/[name][ext]',
		clean: true
	},
	resolve: {
		extensions: ['.js', '.json', '.png'],
		alias: {
			'@models': path.resolve(__dirname, 'src/models'),
			'@': path.resolve(__dirname, 'src')
		}
	},
	optimization: optimization(),
	devServer: {
		port: 9000,
		static: {
			directory: path.join(__dirname, 'src'),
		},
		compress: true,
		open: true,
		hot: isDev
	},
	devtool: isDev ? 'source-map' : 'hidden-nosources-source-map',
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders()
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader')
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				type: 'asset/resource'
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext]'
        }
			},
			{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions()
        }
      }
		]
	}
}