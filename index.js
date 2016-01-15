data =[
	{ id: 0 },
	{ id: 1 },
	{ id: 2 },
	{ id: 3 },
	{ id: 4 },
	{ id: 5 },
	{ id: 6 },
	{ id: 7 },
	{ id: 8 }
];


/*
==============================================================    

	Matrix
	- Object to manage transforms of 3d Matrix

============================================================== 
*/

var Matrix3d =(function () {
	
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


	return Object.freeze({
		position: position,
		skew: skew,
	});

});

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
		
		if(_active) {

			_rAFIndex = requestAnimationFrame(_position);

		}


		_style.transform = _matrix3d.position(_pos.x, _pos.y);

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

/*
==============================================================    

	Drag And Drop
	- Object / Controller to create boxes, handle box swapping 
	and maintain coordinance of the boxes

============================================================== 
*/

var DragAndDrop = (function (container, boxData) {
	
	var _content		= document.getElementById(container);
	var _position		= { x: 0, y: 0 };
	var _boxMargin		= 15;
	var _boxWidth		= 85;
	var _coordinance	= [];
	var _boxes			= [];
	var _x				= 0;
	var _y				= 0;
	var _activeBox;

	// Make array of boxes from data
	_boxes = boxData.map(makeBox);

	// handle swapping of tiles
	_content.addEventListener('mousemove', move, false);
	_content.addEventListener('mouseup', swap, false);


	function swap (e) {
		
		if(!_activeBox) { return; }

		// Coordinance of moved box
		var to_			= _coordinance[_activeBox.id];  
		var dropBox		= findDrop(e);


		_activeBox.setTransitionDuration(300);


		if(dropBox) {
			// Swap boxes

			dropBox.setTransitionDuration(300);
			dropBox.div.style.zIndex = "1";

			// Get coordinance of drop box
			var from_ = _coordinance[dropBox.id];


			// Swap boxes
			_activeBox.to(from_.x, from_.y);
			dropBox.sendTo(to_.x, to_.y);


			// Update grid to keep everything in order
			_coordinance[_activeBox.id] = from_;
			_coordinance[dropBox.id] = to_;
			
		}

		else {
			// Send moved box back to original position
			_activeBox.to(to_.x, to_.y);
			
		}


		_activeBox = null;

	}

	// Return box that is being moved
	function findActiveBox (box) {

		return box.moved();

	}

	// If: mouse up occurred over a box return the box
	// Else: return false
	function findDrop (event) {

		// Look for Drop elements beneath the mouse down event
		var elements = document.elementsFromPoint(event.pageX, event.pageY);
		var element	= elements[1];


		if (element.className === 'box') {

			return _boxes.find(function (box) {
				
				return element.id === box.div.id;
			
			});

		} 

		else {

			return false;

		}

	}

	function makeBox(box, i) {

		var newBox = Box(box.id);

		_x += _boxWidth + _boxMargin;

		// Set Initial X and Y position
		if(i % 3 === 0){
			
			_y += 100;
			// Center Boxes horizontally in 'content-box' div and screen
			_x = Math.floor((400 - (_boxWidth * 3 + _boxMargin * 2)) / 2);

		}



		_coordinance.push({ x: _x, y: _y });

		newBox.sendTo(_x, _y);

		_content.appendChild(newBox.div);


		return newBox;

	}

	function move (e) {
		
		// Set active box
		_activeBox = _boxes.find(findActiveBox);

		if(!_activeBox) { return; }

		// Move active box
		_activeBox.to(e.layerX - 32, e.layerY - 32);

	}


});



// DragAndDrop();

(function () {

	DragAndDrop('content-box', data);
	

}());

