var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleGroup;
var gameState = "PLAY";
 



function preload ()
{
 towerImage = loadImage("tower.png"); 
 doorImage = loadImage("door.png"); 
 climberImage = loadImage("climber.png");
 ghostImage = loadImage("ghost-standing.png"); 
}

function setup()
{
  createCanvas(600,600);
  
  tower = createSprite(300,300,20,20);
  tower.addImage(towerImage);
  tower.velocityY = +1;
  
  doorGroup =  new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
  
  ghost = createSprite(300,300,20,20);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3 ;
}

function draw()
{
 background("black");
  
  if(gameState==="PLAY")
  {
   
 
  if(tower.y>400)
    {
       tower.y = 300 ;
    }
  
  if(keyDown("left_arrow"))
   {
     ghost.x = ghost.x-3;
   }
   if(keyDown("right_arrow"))
   {
     ghost.x = ghost.x+3;
   }
   if(keyDown("space"))
   {
     ghost.velocityY = -5;
   }
  
 ghost.velocityY = ghost.velocityY+0.8;
  
  if(climberGroup.isTouching(ghost))
   {
     ghost.velocityY = 0; 
   }
  
  if(invisibleGroup.isTouching(ghost)||ghost.y>600)
   {
     ghost.destroy();
     gameState="END";
   }
 spawndoors();
 drawSprites(); 
}
  if(gameState==="END")
    { 
      textSize(20);
      fill("yellow");
      text("GAME OVER",300,300);
      
    }
}
function spawndoors()
{
   if(frameCount%250===0)
    {
      door = createSprite(300,300,20,20);
      door.addImage(doorImage);
      door.x = Math.round(random(120,400));
      door.velocityY = +1 ;
      doorGroup.add(door);
      door.lifetime = 800;
      
      climber = createSprite(300,365,20,20);
      climber.addImage(climberImage);
      climber.x = door.x;
      climber.velocityY = +1 ;
      climberGroup.add(climber);
      climber.lifetime = 800 ;
      ghost.depth = door.depth ;
      ghost.depth += 1;
      
      invisibleBlock = createSprite(300,370,20,2);
      invisibleBlock.width = climber.width;
      invisibleBlock.x = door.x ;
      invisibleBlock.velocityY = +1 ;
      invisibleGroup.add(invisibleBlock);
      
    } 
  
}

