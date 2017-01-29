var boxes = [];

function setup() {
	createCanvas(700,700);
	for (var i = 0; i < 10; i ++){
		var newBox = new Box();
		boxes.push(newBox);
	}
}

function draw() {
	background(0);
	for(var i = 0; i < 10; i++){
		boxes[i].display();
		boxes[i].update();
	}
}

function Box(){
	this.x = random(0, 650);
	this.y = random(0, 650);
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.savedXSpeed;
	this.savedYSpeed;
	this.c = color(255, 255, 255);
	this.display = function(){
		fill(this.c);
		rect(this.x,this.y,50,50);
	}
	this.update = function(){
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		this.checkBounds(this.x, this.y);
		//Change color and reverse direction when box hits wall
		if(this.hitWall()){
			this.changeColor();
			this.xSpeed = -this.xSpeed;
			this.ySpeed = -this.ySpeed;
		}
	}
	this.hitWall = function(){
		return this.x <= 0 || this.x >= 650 || this.y <= 0 || this.y >= 650;
	}
	//Change to random color
	this.changeColor = function(){
		var a = random(0,255);
		var b = random(0,255);
		var c = random(0,255);
		this.c = color(a,b,c);
	}
	this.checkBounds = function(x, y){
		if(x > 650){
			x = 650;
		}
		else if(x < 0){
			x = 0;
		}
		if(y > 650){
			y = 650;
		}
		else if(y < 0){
			y = 0;
		}
	}
}

//Movement
function keyPressed(){
	if(keyCode === LEFT_ARROW){
		for(var i = 0; i < 10; i++){
			var box = boxes[i];
			if(box.ySpeed !== 0){
				if(box.ySpeed > 0){
					box.xSpeed -= box.ySpeed;
				} else {
					box.xSpeed += box.ySpeed;
				}
			} else {
				box.xSpeed += -5;
			}
			box.ySpeed = 0;
		}	
	}
	if(keyCode === RIGHT_ARROW){
		for(var i = 0; i < 10; i++){
			var box = boxes[i];
			if(box.ySpeed !== 0){
				if(box.ySpeed > 0){
					box.xSpeed += box.ySpeed;
				} else {
					box.xSpeed -= box.ySpeed;
				}
			} else {
				box.xSpeed += 5;
			}
			box.ySpeed = 0;
		}	
	}
	if(keyCode === UP_ARROW){
		for(var i = 0; i < 10; i ++){
			var box = boxes[i];
			if(box.xSpeed !== 0){
				if(box.xSpeed > 0){
					box.ySpeed -= box.xSpeed;
				} else {
					box.ySpeed += box.xSpeed;
				}
			} else {
				box.ySpeed += -5;
			}
			box.xSpeed = 0;
		}
	}
	if(keyCode === DOWN_ARROW){
		for(var i = 0; i < 10; i++){
			var box = boxes[i];
			if(box.xSpeed !== 0){
				if(box.xSpeed > 0){
					box.ySpeed += box.xSpeed;
				} else {
					box.ySpeed -= box.xSpeed;
				}
			} else {
				box.ySpeed += 5;
			}
			box.xSpeed = 0;
		}
	}
	if(key === " "){
		for(var i = 0; i < 10; i++){
			var box = boxes[i];
			if(box.xSpeed === 0 && box.ySpeed === 0){
				box.xSpeed = box.savedXSpeed;
				box.ySpeed = box.savedYSpeed;
			} else {
				box.savedXSpeed = box.xSpeed;
				box.savedYSpeed = box.ySpeed;
				box.xSpeed = 0;
				box.ySpeed = 0;
			}
		}
	}
	return false;
}