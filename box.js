/*
==============================================================    

	Box
	- Object to manage movement and events pertaining to 
	each drag and drop box

============================================================== 
*/

var Box = (function (boxId) {

	var _box		= document.createElement('div');
	var _pos 		= { x: 0, y: 0 };
	var _style      = _box.style;
	var _matrix3d	= Matrix3d();
	var _active		= false;
	var _rAFIndex	= 0;

	// Set content
	_style.transitionTimingFunction = "cubic-bezier(0.25,0.1,0.25,1)";
	_box.innerHTML = '<h1>' + (boxId + 1) + '</h1>';
	_box.id = 'box-' + boxId;
	_box.className = 'box';


	// Add event listeners
	_box.addEventListener('transitionend', reset, false);
	_box.addEventListener('mousedown', dragStart, false);
	_box.addEventListener('mouseup', drop, false);

	function _sendTo (x, y) {
		
		to(x,y),
		_position();

	}

	function to (x, y) {
		
		_pos.x = x;
		_pos.y = y;

	}


	function _position () {
		
		// try requestAnimationFrame
		if(_active) {

			_rAFIndex = requestAnimationFrame(_position);

		}

		// Center box on the mouse
		var x = (_pos.x - 32);
		var y = (_pos.y - 32);

		_style.transform = _matrix3d.position(x,y);

	}


	function div () {

		return _box;

	}

	function reset () {
		
		_style.transitionDuration = "0ms";
		_style.zIndex = "0";

	}

	function dragStart (e) {
		
		_style.transform = _matrix3d.skew(1.5,1.5);
		_style.transitionDuration = "0ms";
		_style.opacity = "0.6";
		_style.zIndex = "1";

		_active = true;

	  	cancelAnimationFrame(_rAFIndex);

		_rAFIndex = requestAnimationFrame(_position);

	}


	function drop (e) {
		// set style back to normal
		_style.transform = _matrix3d.skew(1,1);
		_style.opacity = "1";

		_active = false;

	}


	function transition (duration) {

		_style.transitionDuration = duration + "ms";

	}


	function isActive () {

		return _active;

	}

	// Freeze the object to maintain integrity 
	return Object.freeze({
		setTransitionDuration: transition,
		sendTo: _sendTo,
		moved: isActive,
		div: _box,
		id: boxId,
		to: to
	});

});