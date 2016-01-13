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
	var _width			= _content.offsetWidth;
	var _coordinance	= [];
	var _boxes			= [];
	var _x				= 0;
	var _y				= 0;

	// Make array of boxes from data
	_boxes = boxData.map(makeBox);

	// handle swapping of tiles
	_content.addEventListener('mouseup', swap, false);


	function swap (e) {

		var activeBox	= _boxes.find(findActiveBox);

		if(!activeBox) { return; }

		// Coordinance of moved box
		var to_			= _coordinance[activeBox.id];  
		var dropBox		= findDrop(e);


		activeBox.setTransitionDuration(300);


		if(dropBox) {
			// Swap boxes

			dropBox.setTransitionDuration(300);
			dropBox.div.style.zIndex = "1";

			// Get coordinance of drop box
			var from_ = _coordinance[dropBox.id];


			// Swap boxes
			activeBox.position(from_.x, from_.y);
			dropBox.position(to_.x, to_.y);


			// Update grid to keep everything in order
			_coordinance[activeBox.id] = from_;
			_coordinance[dropBox.id] = to_;
			
		}

		else {
			// Send moved box back to original position 
			activeBox.position(to_.x, to_.y);
			
		}

		activeBox.inactive();

	}

	// Return box that is being moved
	function findActiveBox (box) {

		return box.moved();

	}

	// If: mouse up occurred over a box return the box
	// Else: return false
	function findDrop (event) {

		// Look for Drop elements
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
			_x = 60;

		}

		_coordinance.push({ x: _x, y: _y });

		newBox.position(_x, _y);

		_content.appendChild(newBox.div);



		return newBox;

	}


});



// DragAndDrop();

(function () {

	DragAndDrop('content-box', data);
	

}());

