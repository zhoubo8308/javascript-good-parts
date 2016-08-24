//var reg1 = /^a+?$/;
//var reg2 = /^a+$/;
//console.log(reg1.test('aaa'));
//console.log(reg2.test('aaa'));
//console.log(/^a{4}$/.test('aaa'));
//console.log(/^a{4}$/.test('aaaa'));
/*
console.log(/^([dtn])a\1/.test('tat'));

console.log(""?1:2);

console.log(Number('99,,'.replace(/,+/,'')));

console.log('中国人名'.charCodeAt(2));

console.log('fontFamily'.replace(/(a)/g,'-$1').toUpperCase());
*/
function trim(str) {
        return (str||"").replace(/^\s+|\s+/g, "");          //#1
      }
console.log(trim(" #id div.class "));
console.log(trim(" #id div.class ") == "#id div.class");
