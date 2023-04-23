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
			template: './main/index.html',
			filename: './main/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './main/family-ideas/index.html',
			filename: './main/family-ideas/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './main/friend-nights/index.html',
			filename: './main/friend-nights/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './main/party-ideas/index.html',
			filename: './main/party-ideas/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './contacts/index.html',
			filename: './contacts/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/index.html',
			filename: './catalogue/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/arkham-horror/index.html',
			filename: './catalogue/arkham-horror/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/black-rose-war/index.html',
			filename: './catalogue/black-rose-war/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/bunker/index.html',
			filename: './catalogue/bunker/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/carcasson/index.html',
			filename: './catalogue/carcasson/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/eldritch-horror/index.html',
			filename: './catalogue/eldritch-horror/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/fallout/index.html',
			filename: './catalogue/fallout/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/gravity-falls/index.html',
			filename: './catalogue/gravity-falls/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/imagenarium/index.html',
			filename: './catalogue/imagenarium/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/lotr/index.html',
			filename: './catalogue/lotr/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/munchkin/index.html',
			filename: './catalogue/munchkin/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/slovodel/index.html',
			filename: './catalogue/slovodel/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HTMLWebpackPlugin({
			template: './catalogue/ticket-to-ride/index.html',
			filename: './catalogue/ticket-to-ride/index.html',
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