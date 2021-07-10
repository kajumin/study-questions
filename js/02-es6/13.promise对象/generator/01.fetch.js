// var fetch = require('node-fetch')

// function* gen() {
// 	var url = 'http://localhost:3000/getJson'
// 	var result = yield fetch(url)
// }

// var g = gen()
// var result = g.next()

// result.value.then(data => {
// 	return data.json()
// }).then(data => {
// 	console.log('data: ', data)
// }).catch(err => {
// 	console.log(err)
// })

var fetch = require('node-fetch')
function* gen() {
	var url,
		result
	url = 'http://localhost:3000/getText1'
	result = yield fetch(url)
	url = 'http://localhost:3000/getText2'
	result = yield fetch(url)
}

var g = gen()
var result = g.next()
result.value.then(data => {
	return data.json()
}).then(data => {
	console.log('data: ', data)
	var result = g.next()
	result.value.then(data => {
		return data.json()
	})
	.then(data => {
		console.log('data2:', data)
	})
}).catch(err => {
	console.log(err)
})

// 异步操作表示得很简洁, 但是流程管理且不是很方便