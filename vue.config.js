// module.exports = {
// 	baseUrl: '/StudentWork/',
// 	// publicPath: '/StudentWork/',
// 	// publicPath: './',
// 	devServer: {
// 		proxy: {
// 			'/StudentWork': {
// 				target: 'http://10.34.66.143:8080',  // 阿浩
// 				//target: 'http://localhost:3001', // mxy
// 				// target: 'http://192.168.0.75:8081',  // 虚拟机
// 				// target: 'http://10.34.66.126:8080', // 测试环境
// 				//target: 'http://10.34.66.128:8090', // 测试环境
// 				// ws: true,
// 				changeOrigin: true,
// 				timeout: 1000 * 60 * 10
// 			}
// 		},
// 		port:8081,
// 	},
// 	productionSourceMap: false,

// }

module.exports = getModelExports();

function getModelExports() {
	if (process.env.NODE_ENV === 'production') {
		let appName = process.argv.splice(2)[2];
		console.log(appName);
		return {
			// baseUrl: '/StudentWork/',
			baseUrl: '/' + appName + '/',
			// devServer: {
			// 	proxy: {
			// 		'/StudentWork': {
			// 			target: 'http://localhost:8080',  // 阿浩
			// 			//target: 'http://localhost:3001', // mxy
			// 			// target: 'http://192.168.0.75:8081',  // 虚拟机
			// 			// target: 'http://10.34.66.126:8080', // 测试环境
			// 			//target: 'http://10.34.66.128:8090', // 测试环境
			// 			// ws: true,
			// 			changeOrigin: true,
			// 			timeout: 1000 * 60 * 10
			// 		}
			// 	},
			// 	port:8081,
			// },
			// productionSourceMap: false,
		};
	} else {
		return {
			devServer: {
				proxy: {
					'/SW': {
						//target: 'http://4e5d0b85.cpolar.cn',
						target: 'http://10.34.66.143:8080',
						changeOrigin: true,
						timeout: 1000 * 60 * 10
					},
					'/SWE': {
						target: 'http://10.34.66.143:8080',
						changeOrigin: true,
						timeout: 1000 * 60 * 10
					}
				},
				port:8081,
				disableHostCheck:true,
			},
			productionSourceMap: false,
		};
	}
}
