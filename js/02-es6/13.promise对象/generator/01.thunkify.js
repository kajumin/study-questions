var thunkify = require('thunkify')
var fs = require('fs')

// var read = thunkify(fs.readFile)
// console.log('thunkify')
// read('./1.txt')(function(err, data) {
// 	if (err) return 
// 	console.log(data)
// })

// 自动执行案例
function* gen(x) {
	yield x + 1
	yield x + 2
	yield x + 3
}

// 自己写的自动执行器 --只能支持同步的
// var g = gen(0)
// var result = g.next()
// while(!result.done) {
// 	console.log(result.value)
// 	result = g.next()
// }

// generator执行器
function run(fun) {
	var gen = fun()
	function next(err, data) {
		// console.log('data: ', data)
		var result = gen.next(data)
		// console.log('result: ', result)
		if(result.done) return
		result.value(next) //是一个函数
	}
	next()
}

var read = thunkify(fs.readFile) //是一个函数
// var Thunk3 = function(fn) {
// 	return function(...args) {
// 		return function(callback) {
// 			console.log(callback)
// 			return fn.call(this, ...args, callback)
// 		}
// 	}
// }
// var read = Thunk3(fs.readFile) //自己写的thunk函数
function* gen2() {
	var res1 = yield read('./1.txt') //是一个函数
	console.log(res1)
	var res2 = yield read('./1.txt')
	console.log(res2)
	var res3 = yield read('./1.txt')
	console.log(res3)
}
// run(gen2) //执行 


// promise自动执行器
var read2 = function(fileName) {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, function(err, data) {
			if(err) return
			resolve(data)
		})
	})
}

var gen3 = function* () {
	var f1 = yield read2('./1.txt')
	console.log(f1.toString())
	var f2 = yield read2('./1.txt')
	console.log(f2.toString())
}

// 手动执行
// var g3 = gen3()
// g3.next().value.then(res => {
// 	console.log(res)
// 	g3.next(res).value.then(res => {
// 		console.log(res)
// 		g3.next(res)
// 	})
// })

// 自动执行器
function run2(fun) {
	var g = fun()

	function next(data) {

		var result = g.next(data)
		// console.log(result.value)
		if(result.done) return result.value

		result.value
		.then(data => {
			console.log('data: ', data)
			next(data)
		})
	}
	next()
}
run2(gen3)

//co模块同样是自动执行器