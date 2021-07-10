process.nextTick(function() {
  console.log('nextTick');
})
setTimeout(function() {
  console.log('setTimeout');
})
setImmediate(function() {
  console.log('setImmediate');
})
new Promise((resolve, reject) => {
  resolve('promise');
})
.then(res => {
  console.log(res);
  return 'promise2'
})
.then(res => {
  console.log(res);
  return 'promise3'
})
.then(res => {
  console.log(res);
})
// nextTick
// promise
// setTimeout
// setImmediate