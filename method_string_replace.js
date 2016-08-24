var regep = /:(\w+)/g;
var testStr = ':method :url'
var req = {method:'get',url:'www.lottery-bob.com'}
var str = testStr.replace(regep,function(match,property){
	console.log(match+'	'+property);
	return req[property];
});
console.log(str);