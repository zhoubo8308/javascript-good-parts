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
//c1.showName������Ϊc2����ķ������ã�class2�б���û��showName������ͨ��call���Ե���c1��showName������
c1.showName.call(c2);