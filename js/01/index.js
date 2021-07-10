function outer() {
	var counter = 0;
	return function() {
		counter ++;
		console.log(counter)
	}
}
var fn = outer();
fn();
fn();
fn = null;