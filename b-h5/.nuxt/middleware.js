const middleware = {}

middleware['memberIsLogin'] = require('..\\middleware\\memberIsLogin.js')
middleware['memberIsLogin'] = middleware['memberIsLogin'].default || middleware['memberIsLogin']

middleware['salesmanIsLogin'] = require('..\\middleware\\salesmanIsLogin.js')
middleware['salesmanIsLogin'] = middleware['salesmanIsLogin'].default || middleware['salesmanIsLogin']

export default middleware
