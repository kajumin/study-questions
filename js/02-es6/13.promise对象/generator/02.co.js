var co = require('co')
var fs = require('fs')
var thunkify = require('thunkify')
// co自带promise执行器, 需要yield传递一个promise对象, thunk函数, 
// 或者数组和对象里都是promise对象

var read = thunkify(fs.readFile) //是一个函数
var gen = function* () {
	var f1 = yield read('./1.txt') //thunk函数或者promise对象
	var f2 = yield read('./1.txt')
	console.log(f1.toString())
	console.log(f2.toString())
	return 'generator函数执行完了'
}

co(gen)
.then(res => {
	console.log(res)
})

co(function* (){
	// var res = yield [read('./1.txt'), read('./1.txt')] //数组
	var res = yield {0: read('./1.txt'), 1: read('./1.txt') } //对象
	console.log(res)
}).
catch(err => console.log(err))