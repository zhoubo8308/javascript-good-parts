function class1(){
	this.name = "class1";
	this.showName = function(){
		console.log(this.name);
	};
}

function class2(){
	this.name = "class2";
}

var c1 = new class1();
var c2 = new class2();
//c1.showName方法作为c2对象的方法调用，class2中本来没有showName方法，通过call可以调用c1的showName方法。
c1.showName.call(c2);