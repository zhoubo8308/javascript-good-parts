	var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
	var url = "http://www.ora.com:80/goodparts?q#fragment";
	var result = parse_url.exec(url);
	var names = ['url', 'scheme', 'slash', 'host', 'port','path', 'query', 'hash'];
	var blanks = ' ';
	var i;
	for (i = 0; i < names.length; i += 1) {
		document.write("<br>");//write this to make the writeln work
		document.writeln(names[i] + ':' + blanks.substring(names[i].length), result[i]);
		document.write("</br>");
	}
	function make_a_matcher(){
		return /a/gi;
	}
	var x = make_a_matcher();
	var y = make_a_matcher();
	x.lastIndex = 10;
	document.writeln(y.lastIndex);