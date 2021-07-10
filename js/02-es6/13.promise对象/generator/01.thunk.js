var fs = require('fs')

var fileName = './1.txt'
// 正常版本的readFile(多参数)	
fs.readFile(fileName, callback)

// thunk版本的readFile(单参数版本)
var Thunk = function (fileName) {
	return function(callback) {
		return fs.readFile(fileName, callback)
	}
}
var readFileThunk = Thunk(fileName)
readFileThunk(callback)
function callback (err, data) {
	console.log(data)
}

// es5版本
var Thunk2 = function(fn) {
	return function() {
		var args = [].slice.call(arguments)
		return function(callback) {
			args.push(callback)
			return fn.apply(this, args)
		}
	}
}
// es6版本
var Thunk3 = function(fn) {
	return function(...args) {
		return function(callback) {
			return fn.call(this, ...args, callback)
		}
	}
}

function more(a, callback) {
	if(a > 10) {
		callback()
		return
	}
	console.log('报错')
}
function cb() {
	console.log('callback')
}
// var resultFun = Thunk2(more)
var resultFun = Thunk3(more)
var resultMore = resultFun(11)
resultMore(cb)

// 生成fs.readFile的thunk函数
var readFileThunk = Thunk2(fs.readFile)
readFileThunk(fileName)(callback)