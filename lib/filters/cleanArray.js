module.exports = function(str) {
	var newArray = new Array();
		for(var i = 0; i<str.length; i++){
			if (str[i]){
				newArray.push(str[i]);
			}
		}
	return newArray;
}