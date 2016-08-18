if(typeof Object.create !== 'function'){
	Object.create = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	};
}

Function.prototype.method = function(name, func){
	//这个地方为什么不能用this.prototype.name
	this.prototype[name] = func;
	return this;
};

Function.method('new', function ( ) {
// Create a new object that inherits from the constructor's prototype.
	var that = Object.beget(this.prototype);
// Invoke the constructor, binding –this- to the new object.
	var other = this.apply(that, arguments);
// If its return value isn't an object,substitute the new object.
	return (typeof other === 'object' && other) || that;
});

var Mammal = function (name) {
this.name = name;
};
Mammal.prototype.get_name = function ( ) {
return this.name;
};
Mammal.prototype.says = function ( ) {
return this.saying || '';
};

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name( ); // 'Herb the Mammal'

console.log(name);

/**----inherits from Mammal by defining its constructor function and replacing prototype with an instance of Mammal--------------------*/
/**通过定义构造函数和用Mammal的实例来取代cat的prototype，来实现继承Mammal*/
var Cat = function(name){
	this.name = name;
	this.saying = 'meow';
}

Cat.prototype = new Mammal();

//扩展cat 的prototype，增加purr和get_name
Cat.prototype.purr = function(n){
	var i, s = '';
	for(i=0; i<n; i+=1){
		if(s){
			s += '-';
		}
		s += 'r';
	}
	return s;
}

Cat.prototype.get_name = function(){
	return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henrietta');
var says = myCat.says(); console.log('says = ' +says);
var purr = myCat.purr(5); console.log('purr = ' + purr);
var name = myCat.get_name(); console.log('name = '+name);

/**自定义inherits方法来实现继承*/
Function.method('inherits', function(Parent){//parent---要继承的父对象
	this.prototype = new Parent();
	return this;
});

/*functional pattern in mammal*/
var mammal = function(spec){
	var that = {};
	that.get_name = function(){
		return spec.name;
	};
	
	that.says = function(){
		return spec.saying || '';
	};
	
	return that;
}

var myMammal = mammal({name:'Herb'});
console.log(myMammal.get_name());

var cat = function(spec){
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);
	that.purr = function(n){
		var i, s = '';
		for(i=0; i<n; i+=1){
			if(s){
				s += '-';
			}
			s += 'r';
		}
		return s;
	};
	that.get_name = function(){
		return this.says() + ' ' + spec.name + ' ' + this.says();
	};
	return that;
};
var myCat = cat({name: 'henrietta'});
console.log(myCat.purr() + ' ' + myCat.get_name());

/**deal with super methods*/
Object.method('superior',function(name){
	var that = this, method = that[name];
	return function(){
		return method.apply(that, arguments);
	};
});

var coolcat = function(spec){
	var that = cat(spec), super_get_name = that.superior('get_name');
	that.get_name = function(n){
		return 'like ' + super_get_name() + ' baby';
	};
	return that;
};

var myCoolCat = coolcat({name:'Bix'});
var name = myCoolCat.get_name();
console.log(name);

/**简单的事件处理程序*/

var eventuality = function(that){
	var registry = {};
	that.fire = function(event){
	
	//触发一个对象上的一个事件，这个事件可以是一个字符串（事件的名字），或者一个对象有事件的名字属性和类型属性。
	//handlers由on来注册，一旦事件name吻合就触发。
		var array, func, handler, i, 
		type = typeof event ==='String'? event:event.Type;
		
		//如果一个事件上有一个数组的handlers，循环这个数组，按顺序执行handlers
		if(registry.hasOwnProperty(type)){
			array = registry[type];
			for(i=0; i<array.length;i+=1){
				handler = array[i];
		//一个handler record包含一个method和一个可选的参数数组，如果method是一个name，查找一个name的方法。		
				func = handler.method;
				if(typeof func === 'String'){
					func = this[func];
				}
		//调用这个handler，如果这个record含有参数，就传递参数，否则，传递event		
				func.apply(this, handler.parameters || [event]);
			}
		}
		return this;
	};
	that.on = function(type, method, parameters){
	//注册一个event，创建一个handler record，放入handler array中，如果对应这个type的不存在，则创建一个handler
		var handler = {
			method : method;
			parameters : parameters
		};
		
		if(registry.hasOwnProperty(type)){
			registry[type].push(handler);
		}else{
			registry[type] = handler;
		}
		return this;
	};
	return that;
};
