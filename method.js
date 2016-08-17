//array.concat(item)
var a = ['a','b','c'];
var b = ['x','y','z'];
var c = a.concat(b,true);
//alert(c);
//-----------------------------------------------------------------
//array.join(separator)
a.push('d');
var d = a.join('');
//alert(d);
//-----------------------------------------------------------------
//array.pop()
//var e = a.pop();
//alert(e + '-' + a.length );
//-----------------------------------------------------------------
//array.reverse
//var f = a.reverse();
//alert(f + ' ' + a);
//-----------------------------------------------------------------
//array.shift()
//var g = a.shift();
//alert(g + '-' + a);
//-----------------------------------------------------------------
//array.slice()
//var h = a.slice(0,1);
//var i = a.slice(1);
//var j = a.slice(1,2);
//alert(a+'-'+h+'-'+i+'-'+j);
//-----------------------------------------------------------------
//array.sort()
//var n = [4,28,25,16,23,42];
//n.sort(function(a,b){
//	return a-b;
//});
//alert(n);
//-----------------------------------------------------------------
var by = function (name) {
	return function (o, p) {
		var a, b;
		if (typeof o === 'object' && typeof p === 'object' && o && p) {
			a = o[name];
			b = p[name];
			if (a === b) {
				return 0;
			}
			if (typeof a === typeof b) {
				return a < b ? -1 : 1;
			}
			return typeof a < typeof b ? -1 : 1;
		} else {
			throw {
				name: 'Error',
				message: 'Expected an object when sorting by ' + name
				};
		}
	};
};

var s = [
{first: 'Joe', last: 'Besser'},
{first: 'Moe', last: 'Howard'},
{first: 'Joe', last: 'DeRita'},
{first: 'Shemp', last: 'Howard'},
{first: 'Larry', last: 'Fine'},
{first: 'Curly', last: 'Howard'}
];
//s.sort(by('first'));
//alert(s[1].first);

//-----------------------------------------------------------------------

var by2 = function (name, minor) {
	return function (o, p) {
		var a, b;
		if (o && p && typeof o === 'object' && typeof p === 'object') {
			a = o[name];
			b = p[name];
			if (a === b) {
				return typeof minor === 'function' ? minor(o, p) : 0;
			}
			if (typeof a === typeof b) {
				return a < b ? -1 : 1;
			}
			return typeof a < typeof b ? -1 : 1;
		} else {
			throw {
				name: 'Error',
				message: 'Expected an object when sorting by ' + name
			};
		}
	};
};
s.sort(by2('last', by2('first')));
var i;
for (i = 0; i < s.length; i += 1) {

document.writeln(s[i].first+"-"+s[i].last);

}

