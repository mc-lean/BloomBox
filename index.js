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


function DragAndDrop (container, boxData) {
	
	var _content = document.getElementById(container);
	var _width = _content.offsetWidth;
	var _coordinance = [];
	var _over = null;
	var _boxes = [];
	var _x = 0;
	var _y = 0;

	// Array of boxes
	_boxes = boxData.map(makeBox);

	// handle swapping of tiles
	_content.addEventListener('mouseup', function(e) {


		var activeBox = _boxes.find(function (box) {

			return box.moved();
		
		});


		activeBox.div.style.transitionDuration = "300ms";

		var pos = _coordinance[activeBox.id];

		

		if(_over) {
			// swap

			_over.div.style.transitionDuration = "300ms";
			_over.div.style.zIndex = "1";
			var move = _coordinance[_over.id];


			// Swap boxes
			activeBox.position(move.x, move.y);
			_over.position(pos.x, pos.y);

			// Update grid to keep everything in order
			_coordinance[activeBox.id] = move;
			_coordinance[_over.id] = pos;

			_over = null;
			
		}

		else {
			// send moved box back
			activeBox.position(pos.x, pos.y);
			
		}

		activeBox.inactive();


	}, false);

	_content.addEventListener('mousemove', function (e) {
		
		if (!e.which) { return; }
		

		var elements = document.elementsFromPoint(e.pageX, e.pageY);
		var element	= elements[1];


		if (element.className === 'box' && _over !== element) {

			_over = _boxes.find(function (box) {

				return element.innerHTML === box.div.innerHTML;
			
			});


		} 

		else if (element.className !== 'box') {

			_over = null;

		}

		
	},false);


	function makeBox(box, i) {

		var b = Box(box.id);

		_x += 100;

		if(i % 3 === 0){
			
			_y += 100;
			_x = 60;

		}

		_coordinance.push({ x: _x, y: _y });

		b.position(_x, _y);

		_content.appendChild(b.div);



		return b;

	}


}



// DragAndDrop();

(function () {

	DragAndDrop('content-box', data);
	

}());

