function orderBy(arr,columns/*[{name:col1,asc:true},{name:col2,asc:false}]*/){//SQL like order object array by multiple columns
	return arr.sort(function(a, b) {
		if (a === b) return 0;
		var result = 0;
		for (var i in columns) {
			var sortKey = columns[i].name;
			var order = columns[i].asc==false?-1:1;
			if(columns[i].getValue===undefined ){
				eval("columns[i].getValue=function(obj){if(typeof obj=='object'){return obj."+sortKey+";} else return obj;};")
			}
			var va = columns[i].getValue(a);
			var vb =columns[i].getValue(b);

			result = (va === vb ? 0 : va > vb ? order : -order);
			console.log("a=" + va + ",b=" + vb + ",sortKey=" + sortKey + ",order=" + order + ",result=" + result);
			if (result !== 0) break;
		}
		return result;
	});
}

/*

var arr=[{a:2,b:5},{a:5,b:6},{a:2,b:4},{a:1,b:6},{a:2,b:6}];
console.log(JSON.stringify(arr));
var result=orderBy(arr,[{name:'a'},{name:'b',asc:false}]);
console.log(JSON.stringify(result));

*/
