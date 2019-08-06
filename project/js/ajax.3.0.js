// ajax({
// 	type:"get",					//可选，默认为get
// 	url:"",						//必传
// 	data:{						//可选
// 		user:"admin",
// 		pass:123
// 	},
// 	success:function(){},		//必传
// 	error:function(){},			//可选
// 	timeout:100,				//可选，默认500
// 	beforeSend:function(){}		//可选
// })

function ajax(options){
	// 1.不用管功能，先规划参数
	let {type,url,data,beforeSend,timeout,success,error} = options;
	type = type || "get";
	timeout = timeout || 500;
	data = data || {};

	// 2.通用信息的处理：
	// 发送数据的拼接：user=admin&pass=123
	let str = "";
	for(var i in data){
		str += `${i}=${data[i]}&`;
	}
	// 日期对象的获取
	let d = new Date();
	// xhr对象的创建
	let ajax = new XMLHttpRequest();

	// 3.决定执行什么功能
	if(type == "get"){
		url = url + "?" + str + "__qft=" + d.getTime();
		ajax.open("get",url,true);
		ajax.onreadystatechange = function(){
			if(ajax.readyState != 4){
				// 因为ajax的readystate不止拿到一个状态，为了防止beforeSend执行多次，在执行之后，立即删除方法
				beforeSend && beforeSend();
				beforeSend = null;
			}else if(ajax.readyState == 4 && ajax.status == 200){
				// 因为成功执行了，所以不存在超时报错，所以成功之后，清除失败
				success && success(ajax.responseText);
				error = null;
			}else if(ajax.readyState == 4 && ajax.status != 200){
				// 因为已经请求失败了，所以也不存在超时报错，所以请求失败之后，清除失败
				error && error(ajax.status);
				error = null;
			}
		}
		ajax.send();
	}else if(type == "post"){
		ajax.open("post",url,true);
		ajax.onreadystatechange = function(){
			if(ajax.readyState != 4){
				beforeSend && beforeSend();
				beforeSend = null;
			}else if(ajax.readyState == 4 && ajax.status == 200){
				success && success(ajax.responseText);
				error = null;
			}else if(ajax.readyState == 4 && ajax.status != 200){
				error && error(ajax.status);
				error = null;
			}
		}
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(str.slice(0,str.length-1));
	}else if(type == "jsonp"){
		url = url + "?" + str + "__qft=" + d.getTime();
		let script = document.createElement("script");
		script.src = url;
		document.body.appendChild(script);

		beforeSend && beforeSend();
		beforeSend = null;

		window[data[data.columnName]] = function(res){
			success && success(res);
			error = null;
		}
	}
	setTimeout(() => {
		error && error("timeout");
		success = null;
	}, timeout);
}