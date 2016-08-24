//string.replace(searchValue,replaceValue);
/**
*The search value can be a string or regular expression object. If it is a string,only the first occurance of the value is replaced.
*If it is a regular expression object without 'g', only the first occurance of the value is replaced.
*If it is a regular expression object with 'g', all the occurance of the value are replaced.
*result1 = mother_in-law
*result2 = mother_in-law
*result3 = mother_in_law
*/

var result1='mother-in-law'.replace('-','_');
var result2='mother-in-law'.replace(/-/,'_');
var result3='mother-in-law'.replace(/-/g,'_');
console.log('result1 = ' + result1);
console.log('result2 = ' + result2);
console.log('result3 = ' + result3);

/**
* If the replaceValue is a string, the character $ has special meaning.
*p = 555-666-1212
*p1 = $666-1212
*p2 = (555)666-1212
*p3 = 666-1212
*p4 = 666-1212666-1212
*/
var oldAreaCode = /\((\d{3})\)/g;
var p = '(555)666-1212'.replace(oldAreaCode,'$1-');//replace with caputure group text "555"
var p1 = '(555)666-1212'.replace(oldAreaCode,'$$');//replace with '$'
var p2 = '(555)666-1212'.replace(oldAreaCode,'$&');//replace with the matched text "(555)"
var p3 = '(555)666-1212'.replace(oldAreaCode,'$`');//replace with the text preceding the match ""
var p4 = '(555)666-1212'.replace(oldAreaCode,"$'");//replace with the text following the match "666-1212"
console.log('p = ' + p);
console.log('p1 = ' + p1);
console.log('p2 = ' + p2);
console.log('p3 = ' + p3);
console.log('p4 = ' + p4);


/**
*replaceValue is a function
* The first parameter passed to the function is the matched value, the second parameter is the text of capture group1,
* the next paramter is the text of capture group2, and so on.
*/
var regep = /:(\w+)/g;
var testStr = ':method :url'
var req = {method:'get',url:'www.lottery-bob.com'}
var str = testStr.replace(regep,function(match,property){
	console.log(match+'	'+property);
	return req[property];
});
console.log(str);