const path = require('path');

const config = {
	mode: 'none',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'assets/fonts/'
					}
				}]
			}
		]
	},
	entry: './src/index.ts',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};

module.exports = (env, argv) => {

	// configuration for development mode
	if (argv.mode === 'development') {
		config.output.path = path.resolve(__dirname, 'dist');
	}

	// configuration for production mode
	if (argv.mode === 'production') {
		config.output.path = path.resolve(__dirname, 'deploy');
	}

	return config;
};
