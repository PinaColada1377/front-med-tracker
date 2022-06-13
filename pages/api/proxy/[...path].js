import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = process.env.API_URL

const proxy = httpProxy.createProxyServer()

export const config = {
	api: {
		bodyParser: false,
	},
}

export default (req, res) => {
	return new Promise((resolve, reject) => {
		const pathname = url.parse(req.url).pathname
		const isSignIn = pathname === '/api/proxy/v1/auth/sign-in'
		const isLogOut = pathname === '/api/proxy/v1/auth/log-out'

		const cookies = new Cookies(req, res)
		const accessToken = cookies.get('Authorization')

		// Rewrite URL, strip out leading '/api'
		// '/api/proxy/*' becomes '${API_URL}/*'
		req.url = req.url.replace(/^\/api\/proxy/, '')

		// Don't forward cookies to API
		req.headers.cookie = ''

		// Set auth-token header from cookie
		if (accessToken) {
			req.headers['Authorization'] = accessToken
		}

		proxy
			.once('proxyRes', (proxyRes, req, res) => {
				if (isSignIn) {
					let responseBody = ''
					proxyRes.on('data', (chunk) => {
						responseBody += chunk
					})

					proxyRes.on('end', () => {
						try {
							const { accessToken } = JSON.parse(responseBody)
							const cookies = new Cookies(req, res)
							cookies.set('Authorization', accessToken, {
								httpOnly: true,
								sameSite: 'lax', // CSRF protection
							})

							res.status(200).json({ loggedIn: true })
							resolve()
						} catch (err) {
							reject(err)
						}
					})
				} if(isLogOut) {
					let responseBody = ''
					proxyRes.on('data', (chunk) => {
						responseBody += chunk
					})

					proxyRes.on('end', () => {
						try {
							
							const cookies = new Cookies(req, res)
							cookies.set('Authorization')

							res.status(200).json({ loggedIn: false})
							resolve()
						} catch (err) {
							reject(err)
						}
					})
				} else {
					resolve()
				}
			})
			.once('error', reject)
			.web(req, res, {
				target: API_URL,
				autoRewrite: false,
				selfHandleResponse: isSignIn,
			})
	})
}
