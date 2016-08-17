if(typeof Object.create !== 'function'){
	Object.create = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	};
}

Function.prototype.method = function(name, func){
	//����ط�Ϊʲô������this.prototype.name
	this.prototype[name] = func;
	return this;
};

Function.method('new', function ( ) {
// Create a new object that inherits from the constructor's prototype.
	var that = Object.beget(this.prototype);
// Invoke the constructor, binding �Cthis- to the new object.
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
/**ͨ�����幹�캯������Mammal��ʵ����ȡ��cat��prototype����ʵ�ּ̳�Mammal*/
var Cat = function(name){
	this.name = name;
	this.saying = 'meow';
}

Cat.prototype = new Mammal();

//��չcat ��prototype������purr��get_name
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

/**�Զ���inherits������ʵ�ּ̳�*/
Function.method('inherits', function(Parent){//parent---Ҫ�̳еĸ�����
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

/**�򵥵��¼��������*/

var eventuality = function(that){
	var registry = {};
	that.fire = function(event){
	
	//����һ�������ϵ�һ���¼�������¼�������һ���ַ������¼������֣�������һ���������¼����������Ժ��������ԡ�handlers��on��ע�ᣬһ���¼�name�ǺϾʹ�����
		var array, func, handler, i, 
		type = typeof event ==='String'? event:event.Type;
		
		//���һ���¼�����һ�������handlers��ѭ��������飬��˳��ִ��handlers
		if(registry.hasOwnProperty(type)){
			array = registry[type];
			for(i=0; i<array.length;i+=1){
				handler = array[i];
		//һ��handler record����һ��method��һ����ѡ�Ĳ������飬���method��һ��name������һ��name�ķ�����		
				func = handler.method;
				if(typeof func === 'String'){
					func = this[func];
				}
		//�������handler��������record���в������ʹ��ݲ��������򣬴���event		
				func.apply(this, handler.parameters || [event]);
			}
		}
		return this;
	};
	that.on = function(type, method, parameters){
	//ע��һ��event������һ��handler record������handler array�У������Ӧ���type�Ĳ����ڣ��򴴽�һ��handler
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