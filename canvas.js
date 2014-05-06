function init() {
	var c = document.getElementById('c');
	start = 0;
	ctx = c.getContext('2d');
	W = c.width
	H = c.height;
	r = 1;
	l = -2.5;
	t = 1;
	b = -1;
	mandelbrot(r,l,t,b);
	c.onclick = navbrot;
}

function navbrot(e) {
	var totalX = 0;
	var totalY = 0;
	var canvasX = 0;
	var canvasY = 0;
	var child = this;

	do {
		totalX += child.offsetLeft - child.scrollLeft;
		totalY += child.offsetTop - child.scrollTop;
	} while(child = child.offsetParent);

	canvasX = e.pageX - totalX;
	canvasY = e.pageY - totalY;
	console.log('click: (' + canvasX + ', ' + canvasY + ')');

	if(canvasY < H / 2) {
		b = (t + b) / 2;
	} else {
		t = (t + b) / 2;
	}
	
	if(canvasX < W / 2) {
		r = (r + l) / 2;
	} else {
		l = (r + l) / 2;
	}
	console.log('calling: mandelbrot('+r+','+l+','+t+','+b+')');
	mandelbrot(r,l,t,b);
}

function mandelbrot(r, l, t, b) {
	ctx.save();
	for(var i = 0; i < W; i++) {
		for(var j = 0; j < H; j++) {
			var x0 = ((r - l) * i) / W + l;
			var y0 = ((b - t) * j) / H + t;
			var x = 0;
			var y = 0;
			var k = 0;
			for(; (x*x + y*y) < 4 && k < 256; k++) {
				var xtemp = x*x - y*y + x0;
				y = 2*x*y + y0;
				x = xtemp;
			}
			ctx.fillStyle = 'rgb(' + k + ',0,0)';
			ctx.fillRect(i,j,1,1);
		}
	}
	ctx.restore();
}

init();
