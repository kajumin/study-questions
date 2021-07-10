async function async1 () {
	console.log(1)
	await async2()
	// await async3()  第二组值
	// 下面的代码自动放到一次循环执行 promise.then等价微任务
	console.log(2)
}
async function async2 () {
	console.log(3)
	async3()
	// await async3() //不能这样调用
	console.log(12)
}
async function async3 () {
	console.log(4)
}

setTimeout(() => {
	console.log(5)
}, 0)
async1()
new Promise(function(resolve, reject) {
	console.log(6)
	resolve()
	console.log(7)
})
.then(res => {
	console.log(8)
})

setImmediate(() => {
	console.log(9)
})
process.nextTick(() => {
	console.log(10) //优先于promise.then
})
console.log(11)

//134(12)67(11)(10)2859
//134(12)67(11)(10)48259