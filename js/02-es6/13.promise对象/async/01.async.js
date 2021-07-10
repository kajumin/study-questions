var fs = require('fs')

var readFile = function(fileName) {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, function(err, data) {
			if(err) return
			resolve(data)
		})
	})
}

var gen = async function () {
	var f1 = await readFile('./1.txt')
	console.log(f1.toString())
	var f2 = await readFile('./1.txt')
	console.log(f2.toString())
}

gen()
// 自动执行器  async自带执行器 不需要
// function run(fun) {

// 	var g = fun()
// 	function next(data) {
// 		var result = g.next(data)
// 		// console.log(result.value)
// 		if(result.done) return result.value

// 		result.value
// 		.then(data => {
// 			console.log('data: ', data)
// 			next(data)
// 		})
// 	}
// 	next()
// }
