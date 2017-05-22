//dao/countryDao.js

//实现与MySql交互
var mysql = require('mysql');
var $conf = require('../conf/db');//加载配置项
var $util = require('../util/util');//加载工具类
var $sql = require('./nodeuserSqlMapping');//加载mapping文件
var log = require('log4js').getLogger('countryDao');

//使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

//获取数据库连接
var getConnection = function(callFunc){
	pool.getConnection(function(err,connect){
		if(err){
			return log.info(err);
		}
		callFunc(connect);
	});
};

//释放连接
var release = function(connect){
	connect.release();
}
//向前台返回JSON方法的简单封装
var jsonWrite = function(res,ret){
	if(typeof ret === 'undefined'){
		res.json({
			code:'1',
			 msg:'请求失败'
		});
	}else{
		res.json(ret);
	}
};

//查询所有国家
var qryCountry = function(req,res,next){
	//获取数据连接回调
	var qryCall = function(connect){
		//获取页面传过来的参数
		var param = req.query||req.params;
		log.inf("sql---"+$sql.qryCountry);
		connect.query($sql.qryCountry,function(err,result){
			if(err){
				log.info(err);
			}
			//返回json数据
			jsonWrite(res,result);
			//关闭数据库连接
			release(connect);

		});
	};
	getConnection(qryCall);
};

var countryDao = {
	qryCountry:qryCountry
};
module.exports = countryDao;