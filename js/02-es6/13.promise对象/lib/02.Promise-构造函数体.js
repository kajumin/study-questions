/*
	自定义Promise函数模块
*/ 
// IFFE 
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

	const PENDING = 'pending'
	const RESOLVED = 'resolved'
	const REJECTED = 'rejected'
	function Promise (excutor) {
		
		const that = this
		that.status = PENDING
		that.data= undefined
		that.callbacks = [] //每一个元素的结构 { onResolved () {}, onRejected () {} }
		
		
		function resolve (value) {
			// 如果当前状态不是padding 直接结束
			if (that.status !== PENDING) return 
			// 将状态改为resolved
			that.status = RESOLVED
			// 保存数据
			that.data = value
			
			// 先改变状态还是先指定回调函数的两种情况 先执行了就立马执行
			// 如果有待执行callback函数, 立即异步执行回调
			if (that.callbacks.length > 0) {
				setTimeout(() => { // 放入队列中执行所有回调
					that.callbacks.forEach(callbacksObj => {					
						callbacksObj.onResolved(value)
					})
				})
			}
		}
		function reject (reason) {
			// 如果当前状态不是padding 直接结束
			if (that.status !== PENDING) return 
			// 将状态改为resolved
			that.status = REJECTED
			// 保存数据
			that.data = reason
			
			// 先改变状态还是先指定回调函数的两种情况 先指定了就立马执行
			// 如果有待执行callback函数, 立即异步执行回调onRejected
			if (that.callbacks.length > 0) {
				setTimeout(() => { //放入队列中执行所有回调
					that.callbacks.forEach(callbacksObj => {					
						callbacksObj.onRejected(reason)
					})
				})
			}
		}

		// 如果执行器抛出异常, promise对象变为失败状态
		try {
			excutor(resolve, reject)
		} catch(error) {
			reject(error)
		}
		
		
	}
	
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

	Promise.resolveDelay = function(value, time) {}

	Promise.rejectDelay = function(reason, time) {}
	
	window.Promise = Promise
})(window)

// function fn (event) {}
// div.onclick = function (event) {
// 	fn(event)
// }
// div.onclick = fn  //简写