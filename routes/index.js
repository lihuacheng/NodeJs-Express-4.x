var express = require('express');
var router = express.Router();
console.log('index');
var countryDao = require('../dao/nodeuserDao');
var log = require("log4js").getLogger("index");

/**路由配置**/
/* GET home page. */
router.get('/', function(req, res, next) {
	posts = [];	
  	res.render('index', { title: 'Express' });
});

//获取所有国家
router.get('/qryCountry',function(req,res,next){
	countryDao.qryCountry(req,res,next);
})

router.get('/initChat',function(req,res,next){
	
});


// var app = express();
// var server2 = require('http').createServer(app);
// var io = require('socket.io').listen(server2); //引入socket.io模块并绑定到服务器
// server2.listen(8081);

// //socket部分
// io.on('connection', function(socket) {
//     //接收并处理客户端发送的foo事件
//     socket.on('foo', function(data) {
//         //将消息输出到控制台
//         console.log(data);
//     })
// });

module.exports = router;
