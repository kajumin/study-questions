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
	Promise.prototype.then = function (onResolved, onRejected) {
		const that = this
		// 指定的成功回调不是一个函数, 向后传递成功的value
		onResolved = typeof onResolved  === 'function' ? onResolved : value => value
		// 指定默认的失败的回调, 向后传递失败的value, 异常穿透的关键点
		onRejected = typeof onRejected  === 'function' ? onRejected : reason => { throw reason }
		
		// 返回一个新的promise对象
		return new Promise((resolve, reject) => {
			// handle 调用回调函数处理, 根据执行结果, 改变return的promise状态
			function handle(callback) {
				try {
					/*
					1.回调函数抛出异常 return的promise就会失败, reason就是error
					2.回调函数执行返回不是promise对象, return的promise状态成功, value就是返回的值
					3.回调函数返回是promise对象, retrun的promise的状态由该promise对象决定, value就是该promise的结果
					*/
						const result = callback(that.data)
						if (result instanceof Promise) {
							// 情况3
							// 当result成功时 让return的promise也成功
							// 当result失败时 让return的promise也失败
							// result.then(
							// 	value => resolve(value)	
							// 	reason => reject(reason)
							// )
							// 简洁写法
							result.then(resolve, reject)
						} else {
							// 情况2
							resolve(result)
						}
					
				} catch (error) {
					// 情况1
					reject(error)
				}
			}
			// 当前状态还是pending状态
			if (that.status === PENDING) {
				that.callbacks.push({ 
					onResolved (value) {
						// 需要有能力改变新的promise状态
						handle(onResolved)
					},
					onRejected (reason) {
						handle(onRejected)
					}
				})
			} else if (that.status === RESOLVED) {
				// 状态为resolved, 异步执行OnResolved并改变return的promise状态
				setTimeout(() => {
					handle(onResolved)
				})
				
			} else {
				// 状态为resolved, 异步执行OnResolved并改变return的promise状态
				setTimeout(() => {
					handle(onRejected)
				})
			}
		})
	}
	/*
		Promise.prototype.catch 原型对象方法
		指定失败回调函数
		返回新的promise对象
	*/
	Promise.prototype.catch = function (onRejected) {
		return this.then(undefined, onRejected)
	}
	
		/*
			Promise.resolve 原型静态方法
			返回一个指定结果的成功的promise对象
		*/
	Promise.resolve = function (value) {
		return new Promise((resolve, reject) => {
			// 是promise
			if(value instanceof Promise) {
				// 使用value的结果
				value.then(resolve, reject)
			} else {
				// 不是promise promise成功  数据是value
				resolve(value)
			}
			
		})
	}
		
		/*
			Promise.reject 原型静态方法
			返回一个指定reason的失败的promise对象
		*/
	Promise.reject = function (reason) {
		return new Promise((resolve, reject) => {
			reject(reason)
		})
	}
		/*
			Promise.all 原型静态方法
			返回一个promise, 只有当所有promise都成功时才成功,
			否则只要有一个失败的就失败
		*/
	Promise.all = function (promises) {
		return new Promise((resolve, reject) => {
			// 遍历获取每个promise的结果
			// 创建一个数组保存结果, 并指定长度
			var count = 0
			var length = promises.length
			var values = new Array(length)
			promises.forEach((p, index) => {
				console.log(p)
				Promise.resolve(p).then(
					value => {
						values[index] = value
						count++	
						// 不用计时器也是可以的
						// if(index === promises.length - 1) {
						if(count === length) {				
							resolve(values)
						}
					},
					reason => {
						// 一个失败就全部失败
						reject(reason)
					})
			})
		}) 
	}
	
		/*
			Promise.race 原型静态方法
			返回一个promise, 其结果状态由第一个完成的promise决定
		*/
	Promise.race = function (promises) {
		return new Promise((resolve, reject) => {
			promises.forEach((p, index) => {
				Promise.resolve(p).then(
					value => {
						resolve(value)
					},
					reason => {
						reject(reason)
					})
			})
		})
	}

	window.Promise = Promise
})(window)

// function fn (event) {}
// div.onclick = function (event) {
// 	fn(event)
// }
// div.onclick = fn  //简写