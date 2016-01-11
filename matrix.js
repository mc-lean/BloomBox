

function Matrix3d () {
	
	var m = [
		[1,0,0,0],
		[0,1,0,0],
		[0,0,1,0],
		[0,0,0,1]
	];

	function _value () {
		
		return "matrix3d("+ m.toString() +")";

	}

	function position (x, y) {

		m[3][0] = x;
		m[3][1] = y;
		
		return _value();
	}

	function skew (sX, sY) {
		
		m[0][0] = sX;
		m[1][1] = sY;

		return _value();
	}


	return {
		position: position,
		skew: skew,
	};

}