var backgroundImg;
var balloon,balloon_rotating;
var position;


function preload(){
    backgroundImg = loadImage("Hot Air ballon-01.png");
    balloon_rotating = loadAnimation("Hot Air ballon-02.png","Hot Air ballon-03.png","Hot Air ballon-04.png")
}

function setup() {
  database = firebase.database();

  createCanvas(1000,600);
  
   //Creating ballon
  balloon = createSprite(300,480,600,10);
  balloon.addAnimation("moving",balloon_rotating);
  balloon.scale = 0.5;

  var balloonposition = database.ref('balloon/position');
    balloonposition.on("value",readPosition,showerror);


 }

function draw() {
  background(backgroundImg);

  textSize(25);
  fill("black");
  text("Use Arrow keys to move the Hot Air Balloon",10,50);

  //Moving the ballon with the arrow keys
  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;
  }else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x + 10;
  }else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y - 10;
  }else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y + 10;
  }
   
drawSprites();
}


function updateHeight(x,y){
  database.ref('balloon/position').set({
      'x': position.x + x,
      'y': position.y + y
  })
}
function readPosition(data){
  position = data.val();
  console.log(position);
  balloon.x = position.x;
  balloon.y = position.y;
}
function showerror(){
  console.log("only error")
}
