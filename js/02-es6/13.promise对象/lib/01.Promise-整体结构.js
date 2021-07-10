/*
	自定义Promise函数模块
*/ 
// IFFE 立即执行函数 
/*
Promise 构造函数
excutor 执行器
Promise.prototype.then 原型对象方法
Promise.prototype.catch 原型对象方法
Promise.resolve 对象静态方法
Promise.reject  对象静态方法
Promise.all  对象静态方法
Promise.race  对象静态方法
*/
/*
	promise属性
*/
(function(window){

	function Promise (excutor) {}
	
	/*
		Promise.prototype.then 原型对象方法
		指定成功回调函数和失败回调函数
		返回新的promise对象 返回的结果由指定回调函数执行结果决定
	*/
	Promise.prototype.then = function (onResolved, onRejected) {}
	
	/*
		Promise.prototype.catch 原型对象方法
		指定失败回调函数
		返回新的promise对象
	*/
	Promise.prototype.catch = function (onRejected) {}
	
	/*
		Promise.resolve 原型静态方法
		返回一个指定结果的成功的promise对象
	*/
	Promise.resolve = function (value) {}
		
	/*
		Promise.reject 原型静态方法
		返回一个指定reason的失败的promise对象
	*/
	Promise.reject = function (reason) {}
	
	/*
		Promise.all 原型静态方法
		返回一个promise, 只有当所有promise都成功时才成功,
		否则只要有一个失败的就失败
	*/
	Promise.all = function (promises) {}
	
	/*
		Promise.race 原型静态方法
		返回一个promise, 其结果状态由第一个完成的promise决定
	*/
	Promise.race = function (promises) {}

	// 指定秒数后状态改变, 状态成功
	Promise.resolveDelay = function(value, time) {}

	// 指定秒数后状态改变, 状态失败
	Promise.rejectDelay = function(reason, time) {}

	window.Promise = Promise
})(window)

// function fn (event) {}
// div.onclick = function (event) {
// 	fn(event)
// }
// div.onclick = fn  //简写