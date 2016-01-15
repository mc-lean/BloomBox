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

	Drag And Drop
	- Object / Controller to create boxes, handle box swapping 
	and maintain coordinance of the boxes

============================================================== 
*/

var DragAndDrop = (function (container, boxData) {
	
	var _content		= document.getElementById(container);
	var _position		= { x: 0, y: 0 };
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

		_x += 100;

		if(i % 3 === 0){
			
			_y += 100;
			_x = 70;

		}

		console.log( 'x', _x );

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

