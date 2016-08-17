var add = function(a,b){
	return a+b;
}

/*��չFunction��Ϊ�����һ��method����,��������ΪFunction������һ����Ϊname�ĺ���*/
Function.prototype.method = function(name, func){
	//����ط�Ϊʲô������this.prototype.name
	this.prototype[name] = func;
	return this;
};

/������method�ĺ�����ΪFuntion������Ϊcurry�ĺ�����/
Function.method('curry', function(){
	var slice = Array.prototype.slice,
	args = slice.apply(arguments), that = this;
	return function(){
		return that.apply(slice,args.concat(slice.apply(arguments)));
	}
});
//Functions are values��add is a Value��add1 is  the return function
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
}()//ע�����д����һ������ֱ�ӵ��ã�����û�С�;��
);
//fibonacci�е�n=10������������ݱȽ�ţ�ơ�
var temp = fibonacci(10);

//1.����һ��������memo-Array��formula��Function
var memoizer = function(memo, formula){
	//����һ��recur����
	var recur = function(n){
		//ȡmemo[n]��result�����n����0,1,��ôresult����undefine
		var result = memo[n];
		if(typeof result !== 'number'){
			//��������еݹ����
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
