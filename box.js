
// NOTES

// add move listener on mouse down to avoid mouse losing box


function Box (boxId) {

	var _box = document.createElement('div');
	var _matrix3d = Matrix3d();
	var _active = false;
	var _currentX = 0;
	var _currentY = 0;


	_box.style.transitionTimingFunction = "cubic-bezier(0.25,0.1,0.25,1)";
	_box.innerHTML = '<h1>' + (boxId + 1) + '</h1>';
	_box.className = 'box';

	_box.addEventListener('transitionend', reset, false);
	_box.addEventListener('mousedown', dragStart, false);
	_box.addEventListener('mouseup', drop, false);
	_box.addEventListener('mouseout', function (e) {
		
		if(!e.which) { return; }

		console.log( 'reset!!!' );
		drop();
	
	});


	function position (x, y) {
		x = x || 0;
		y = y || 0;

		_currentX = x;
		_currentY = y;

		_box.style.transform = _matrix3d.position(x,y);

	}


	function div () {

		return _box;

	}

	function reset () {
		
		_box.style.transitionDuration = "0ms";
		_box.style.zIndex = "0";

	}

	function dragStart (e) {

		_box.style.transform = _matrix3d.skew(1.5,1.5);
		_box.style.pointerEvents = "auto";
		_box.style.opacity = "0.6";
		_box.style.zIndex = "1";
		
		_active = true;

		_box.addEventListener('mousemove', dragBox, false);


	}

	function dragBox (e) {

		
		if (!e.which){ return; }


		var moveX = Math.abs(e.movementX + _currentX),
			moveY = Math.abs(e.movementY + _currentY);

		
		position(moveX, moveY);

	}

	function drop (e) {

		_box.style.transform = _matrix3d.skew(1,1);
		_box.style.opacity = "1";

	}

	function inactive () {
		
		_active = false;

	}


	function isActive () {

		return _active;

	}


	return {
		position: position,
		inactive: inactive,
		moved: isActive,
		div: _box,
		id: boxId
	};

}