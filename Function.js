var add = function(a,b){
	return a+b;
}

/*扩展Function，为其添加一个method属性,调用它就为Function增加了一个名为name的函数*/
Function.prototype.method = function(name, func){
	//这个地方为什么不能用this.prototype.name,防止name里有“-”
	this.prototype[name] = func;
	return this;
};

//调用method的函数，为Funtion增加名为curry的函数
Function.method('curry', function(){
	var slice = Array.prototype.slice,
	args = slice.apply(arguments), that = this;
	return function(){
		return that.apply(slice,args.concat(slice.apply(arguments)));
	}
});
//Functions are values，add is a Value，add1 is  the return function
var add1 = add.curry(1);
var result = add1(8);

var fibonacci = (function(){
	var memo=[0,1];
	var fib = function(n){
		var result = memo[n];
		if(typeof result !== 'number'){
			result = fib(n-1)+fib(n-2);
			memo[n] = result;
		}
		return result;
	};
	return fib;
}()//注意这个写法，一个函数直接调用，后面没有“;”
);
//fibonacci中的n=10，这个参数传递比较牛逼。
var temp = fibonacci(10);

//1.定义一个函数，memo-Array，formula：Function
var memoizer = function(memo, formula){
	//定义一个recur函数
	var recur = function(n){
		//取memo[n]给result，如果n不是0,1,那么result就是undefine
		var result = memo[n];
		if(typeof result !== 'number'){
			//在这里进行递归操作
			result = formula(recur,n);
			memo[n] = result;
		}
		return result;
	}
	return recur;
}

var fibonacci2 = memoizer([0,1],function(recur,n){
	return recur(n-1)+recur(n-2);
});

alert(fibonacci2(10));
