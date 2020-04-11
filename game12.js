(function () {


var Camera = function(x,y){

this.x = x;
this.y = y;

}

var timer = 0;
var timerh = 0;
var timerb = 0;

var camera = new Camera(-100,0);

var Game = function(canvasID){
var canvas = document.getElementById(canvasID);
var render = canvas.getContext('2d');
var gameSize = {
    			w:canvas.width,
    			h:canvas.height
   	 };

this.anim = new Animation(0.04,2,'First_Pirate/Walking/');

     
this.bodies = [new Player(this,gameSize)];

this.bodies.splice(1,1);


		 var self = this;
   		 var tick = function(){
		self.update();
		self.draw(render,gameSize);
        requestAnimationFrame(tick);
   	 }
    	tick();
	}



var b = false;
var hp = 100;
var chp = 500;

var player ;

var Bl = false;



Game.prototype = {
   update:function(){    
   if (hp>0 && chp>0){
   if (hp<0){hp = 0;
   document.getElementById('bt1').disabled=false;
   }
   if (hp>=100)hp = 100;
   if (chp<0)chp = 0;
   if (chp>500)chp = 500;

   timer++;

   if (timer>30){
  this.addBody(new Simple_Pirate('First_Pirate/',{x:100,y:600},4,10),this);

    timer = 0;
   }

   timerh++;
    if (timerh>150){
  this.addBody(new Huge_Pirate('Huge_Pirate/',{x:1200,y:600},1,10),this);

    timerh = 0;
   }

   timerb++;
   if (timerb>100){

    this.addBody(new Flying_Pirate('Flying_Pirate/',{x:100,y:200},4,10,this));
    timerb= 0;
   }

//var Flying_Pirate = function(path,pos,speed,damage,game){
    if (!b){
this.addBody(new Huge_Pirate('Huge_Pirate/',{x:1000,y:600},2,20,this));
this.addBody(new Flying_Pirate('Flying_Pirate/',{x:100,y:200},4,10,this));
  }
  b = true;
   for (var i = 0;i<this.bodies.length;i++){

    playerX = this.bodies[0].pos.x;
    playerY = this.bodies[0].pos.y;
    
     this.bodies[i].update();
     this.bodies[i].update(playerX,playerY);
     this.bodies[i].dx = 0;
     

     camera.x = playerX-400;
    
    if (camera.x<=0)camera.x = 0;
    if (camera.x>=400)camera.x = 400;

    
    player = this.bodies[0];

    if (this.bodies[i].name == 'bullet'){

    if (this.bodies[i].creator == 'player'){
    for (var n = 0;n<this.bodies.length;n++){
   
   if (this.bodies[n].name !='bullet' && this.bodies[n].name != 'player')
      if (this.bodies[i].pos.x>=this.bodies[n].pos.x && 
          this.bodies[i].pos.x<=this.bodies[n].pos.x+this.bodies[n].size.w && 
          this.bodies[i].pos.y>=this.bodies[n].pos.y && 
          this.bodies[i].pos.y<=this.bodies[n].pos.y+this.bodies[n].size.h 
        ){
         
        this.bodies[i].live = false;

        if (this.bodies[n].name == 'simple')this.bodies[0].score+=10;
        if (this.bodies[n].name == 'huge' )this.bodies[0].score+=10;

        this.bodies[n].hp -= this.bodies[i].damage;

      }

    } 

    }
}


if (this.bodies[i].name == 'Flying'){

if (this.bodies[i].droped){
this.addBody(new Falling_Baby({x:this.bodies[i].pos.x,y:this.bodies[i].pos.y}));
this.bodies[i].droped = false;
}

}

if (this.bodies[i].name == 'falling_boy'){
if (this.bodies[i].falled){

this.addBody(new Effect({x:this.bodies[i].pos.x,y:this.bodies[i].pos.y},100,10));

this.falled = false;
this.live = false;
}
}

    

    if (this.bodies[i].pos.x<0 || 
      this.bodies[i].pos.x>1200 
      ||this.bodies[i].pos.y<0 
      || this.bodies[i].pos.y>600
       || this.bodies[i].live == false){

      this.bodies.splice(i,1);
    }

     this.anim.update();
     
    }
         }
   },
  

  draw:function(screen,gameSize){
    screen.clearRect(0,0,gameSize.w,gameSize.h)

   if (hp>0 && chp>0){
    DrawImage({x:0,y:0},screen,'Background/bck.png');
    DrawImage({x:0,y:150},screen,'Background/Sky.png');
    DrawImage({x:0,y:300},screen,'Background/palms.png');
    DrawImage({x:0,y:300},screen,'Background/Sea.png');
    DrawImage({x:0,y:300},screen,'Background/castle2.png');
    DrawImage({x:0,y:300},screen,'Background/sand.png');
    DrawImage({x:0,y:300},screen,'Background/grass.png');
    

    for (var i = 0;i<this.bodies.length;i++){
    
    //DrawRect(screen,this.bodies[i]);

   this.bodies[i].draw(screen);
   }
     DrawImage({x:0,y:300},screen,'Background/ships.png');
     DrawImage({x:0,y:300},screen,'Background/bush.png');
     DrawImageC({x:30,y:30},hp,screen,'Interface/HealthBar.png');
     DrawImageC({x:650,y:30},100/500*chp,screen,'Interface/CastleHealthBar.png');
    // screen.fillText(this.bodies[0].score+':coins',30,70);
   }
   if (hp<=0 || chp<=0)DrawImageB({x:0,y:0},screen,'Ended.png');
 },

  addBody:function(body){
   this.bodies.push(body);
  }
  

}






var Simple_Pirate = function(path,pos,speed,damage,game){

this.name = 'simple';
this.game = game;
this.size = {w:43,h:43};
this.path = path;
this.pos = pos;
this.speed = speed;
this.damage = damage;

this.atacked = false;
this.it = 0;
this.atacking = false;
this.stoped = false;

this.live = true;
this.runing = false;
this.iterator = 0;
this.onground = false;
this.flip = false;
this.dx = 0;
this.dy = 0;
this.hp = 10;
this.state = 0;
this.anim = {};
this.anim[0] = new Animation(1,1,'First_Pirate/Staing/');
this.anim[1] = new Animation(0.08,2,'First_Pirate/Walking/');
this.anim[2] = new Animation(1,1,'First_Pirate/Atacking/');
}

Simple_Pirate.prototype = {

update:function(x,y){

if (this.hp<0)this.live = false;

if (x-this.pos.x>30)
  this.dx = this.speed;
if (x-this.pos.x<-30)
  this.dx = -this.speed;




this.dy += 0.1;
this.onground = false;
if (this.pos.y>600-this.size.h-30){this.pos.y = 600-this.size.h-30;this.dy = 0;this.onground = true;}

if (this.dx>0)this.flip=false;
if (this.dx<0)this.flip=true;

if (this.dx != 0 && this.dy ==0)this.state = 1;
if (this.dx == 0 && this.dy ==0)this.state = 0;




if (y>520 && x-this.pos.x>-35 && x-this.pos.x<35 && !this.atacking && !this.atacked){this.atacking = true;this.atacked = true;}


if (this.atacking){
if (this.atacked){
hp-=this.damage;
this.atacked = false;
}

this.state = 2;
this.dx = 0;
this.it++;
if (this.it>20){this.state=0;this.atacked = true;this.atacking = false;this.stoped=true;this.it=0;}
}



if (this.stoped){
this.state=0;
this.dx = 0;
this.it++;
if (this.it>50){this.stoped = false;this.it = 0;this.atacking = false;this.it = 0;this.atacked = false;}
}



this.pos.x += this.dx;
this.pos.y += this.dy;

if (this.dx != 0){
this.iterator+= 0.2;
var a = Math.sin(this.iterator)*1;
if (a<0)a*=-1;
this.pos.y = this.pos.y-a;
}

this.anim[this.state].update();
},

draw:function(screen){


this.anim[this.state].draw(screen,this.pos,43,43,this.flip);
}

}



var Bullet = function(pos,vel,creator){
this.pos = pos;
this.vel = vel;
this.name = 'bullet';
this.size = {w:3,h:3};
this.creator = creator;
this.live = true;
this.damage = 10;
}

Bullet.prototype = {

update:function(){

this.pos.x += this.vel.x;
this.pos.y += this.vel.y;
},

draw:function(screen){
if (this.creator != 'player')
DrawImage({x:this.pos.x,y:this.pos.y},screen,'bullets/bullet.png');
if (this.creator == 'player')
DrawImage({x:this.pos.x,y:this.pos.y},screen,'bullets/fireball.png');
}

}



var Shooting_Pirate = function(path,pos,speed,damage,game){

this.name = 'shooting';
this.game = game;
this.size = {w:43,h:43};
this.path = path;
this.pos = pos;
this.speed = speed-Math.random()*2;
this.damage = damage;
this.live = true;
this.iterator = 0;
this.hp = 100;
this.onground = false;
this.flip = false;
this.dx = 0;
this.dy = 0;

this.timer = 0;
this.atacked = false;
this.it = 0;
this.atacking = false;
this.stoped = false;

this.state = 0;
this.anim = {};
this.anim[0] = new Animation(1,1,'Second_Pirate/Staing/');
this.anim[1] = new Animation(0.08,2,'Second_Pirate/Walking/');
this.anim[2] = new Animation(1,1,'Second_Pirate/Atacking/')
}



Shooting_Pirate.prototype = {

update:function(x,y){

if (this.hp<=0)this.live = false;

if (x-this.pos.x>150)
  this.dx = this.speed;
if (x-this.pos.x<-150)
  this.dx = -this.speed;


this.dy += 0.1;
this.onground = false;

if (this.pos.y>600-this.size.h-30){this.pos.y = 600-this.size.h-30;this.dy = 0;this.onground = true;}

if (this.dx>0){this.flip=false;this.view = 1;}
if (this.dx<0){this.flip=true;this.view = -1;}

if (this.dx != 0 && this.dy ==0)this.state = 1;
if (this.dx == 0 && this.dy ==0)this.state = 0;



if (x-this.pos.x>-155 && x-this.pos.x<155 && !this.atacking && !this.atacked){this.atacking = true;this.atacked = true;}





this.pos.x += this.dx;
this.pos.y += this.dy;

if (this.dx != 0){
this.iterator+= 0.2;
var a = Math.sin(this.iterator)*1;
if (a<0)a*=-1;
this.pos.y = this.pos.y-a;
}

this.anim[this.state].update();
},

draw:function(screen){


this.anim[this.state].draw(screen,this.pos,43,43,this.flip);
},
addBody: function (body) {
  this.bodies.push(body);
}

}


var Huge_Pirate = function(path,pos,speed,damage,game){

this.name = 'huge';
this.game = game;
this.size = {w:72,h:72};
this.path = path;
this.pos = pos;
this.speed = 1;
this.damage = 40;
this.live = true;
this.iterator = 0;
this.hp = 100;
this.onground = false;
this.flip = false;
this.dx = 0;
this.dy = 0;

this.atacked = false;
this.it = 0;
this.atacking = false;
this.stoped = false;

this.state = 0;
this.anim = {};
this.anim[0] = new Animation(1,1,'Huge_Pirate/Staing/');
this.anim[1] = new Animation(0.04,2,'Huge_Pirate/Walking/');
this.anim[2] = new Animation(1,1,'Huge_Pirate/Atacking/')
}

Huge_Pirate.prototype = {

update:function(){

if (this.hp<0)this.live = false;

//choosepos
pos = {x:550,y:600};



var a = pos.x-this.pos.x;

if (a>60)
  this.dx = this.speed;
if (a<-60)
  this.dx = -this.speed;

// if (this.atacking){
// if (this.atacked){
// hp-=this.damage;
// this.atacked = false;
// }

// this.state = 2;
// this.dx = 0;
// this.it++;
// if (this.it>20){this.state=0;this.atacked = true;this.atacking = false;this.stoped=true;this.it=0;}
// }



// if (this.stoped){
// this.state=0;
// this.dx = 0;
// this.it++;
// if (this.it>50){this.stoped = false;this.it = 0;this.atacking = false;this.it = 0;this.atacked = false;}
// }

if (a<70 && a>-70 && !this.atacking && !this.atacked){

  this.atacked = true;
  this.atacking = true;
}


if (this.atacking){
if (this.atacked){
chp -= 40;
this.atacked = false;
}

this.it++;
this.dx = 0;
this.state = 2;
if (this.it>100){
this.state = 0;
this.it = 0;
this.atacked = true;
this.stoped = true;
this.atacking = false;
}
}

if (this.stoped){
this.it++;
this.dx = 0;
this.state = 0;
if (this.it>100){
this.stoped = false;
this.it = 0;
this.atacking = false;
this.atacked = false;
}
}


this.dy += 0.1;
this.onground = false;
if (this.pos.y>600-this.size.h-30){this.pos.y = 600-this.size.h-30;this.dy = 0;this.onground = true;}

//flip
if (this.dx>0)this.flip=false;
if (this.dx<0)this.flip=true;

//states
if (this.dx != 0 && this.dy ==0)this.state = 1;
if (this.dx == 0 && this.dy ==0)this.state = 0;

//sin
if (this.dx != 0){
this.iterator+= 0.2;
var a = Math.sin(this.iterator)*1;
if (a<0)a*=-1;
this.pos.y = this.pos.y-a;
}

//move
this.pos.x += this.dx;
this.pos.y += this.dy;

//anim
this.anim[this.state].update();
},

draw:function(screen){


this.anim[this.state].draw(screen,this.pos,43,43,this.flip);
}

}

var Effect = function(pos,r,damage){
this.live = true;
this.size = {w:30,h:30}
this.pos = pos;
this.r = r;
this.damage = damage
this.anim = {};
this.anim[0] =new Animation(0.05,3,'Explosion/');
this.anim[0].IsCycleble = true;
}

Effect.prototype = {

 
 update:function(){

this.anim[0].update();
 },

 draw:function(screen){
if (this.anim[0].currentframe == this.anim[0].count)this.live = false;
this.anim[0].draw(screen,this.pos,30,30);
 }

}


var Falling_Baby = function(pos){

this.name = 'falling_boy';
this.pos = pos;
this.size = {x:30,y:30};
this.dy = 0;
this.dx = 0;
this.live = true;
this.falled = false;
}

Falling_Baby.prototype = {

update:function(){
this.dy+=0.2;

this.size = {x:30,y:30}

this.pos.x+=this.dx;
this.pos.y+=this.dy;

if (this.pos.y>540){this.pos.y = 540;this.dy = 0;this.falled = true;this.live = false;}


},

draw:function(screen){

DrawImage(this.pos,screen,'Flying_Pirate/baby.png');
}
}


var Flying_Pirate = function(path,pos,speed,damage,game){
this.live = true;
this.name = 'Flying';
this.game = game;
this.size = {w:43,h:43};
this.path = path;
this.pos = pos;
this.speed = speed-Math.random()*2;
this.damage = damage;

this.withchild = true;

this.hp = 100;

this.iterator = 0;
this.speed2 = speed;

this.onground = false;
this.flip = false;
this.dx = 0;
this.dy = 0;

this.droped = false;

this.state = 0;
this.anim = {};
this.anim[0] = new Animation(0.05,2,'Flying_Pirate/');
this.anim[1] = new Animation(0.05,2,'Flying_Pirate/papu/');
}



Flying_Pirate.prototype = {

update:function(x,y){
if (this.hp<0)this.live = false;
if (this.withchild){
if (x-this.pos.x>15)
  this.dx = this.speed;
if (x-this.pos.x<-15)
  this.dx = -this.speed;
if (x-this.pos.x>=-20 && x-this.pos.x<=20){this.dx = 0;this.withchild=false;this.droped = true;}
}



if (this.withchild)this.state = 0;
if (!this.withchild){this.state = 1;this.dx=-4;}



this.dy = 0;

this.onground = false;
if (this.pos.y>600-this.size.h){this.pos.y = 600-this.size.h;this.dy = 0;this.onground = true;}

if (this.dx>0)this.flip=false;
if (this.dx<0)this.flip=true;


this.pos.x += this.dx;
this.pos.y += this.dy;

if (this.dx != 0){
this.iterator+= 0.3;
var a = Math.sin(this.iterator)*1;
this.pos.y = this.pos.y-a;
}

this.anim[this.state].update();
},

draw:function(screen){


this.anim[this.state].draw(screen,this.pos,43,43,this.flip);
}

}













var Player = function(game,gameSize){
this.name = 'player';
this.bull = 1;
this.game = game;
this.size = {w:43,h:43};
this.pos = {x:gameSize.w/2 , y:600};
this.keyboarder = new Keyboarder();
this.dx = 0;
this.dy = 0;
this.y2 = this.pos.y;
this.onground = false;
this.iterator = 0;
this.anim = {};
this.hp = 100;
this.state = 0;
this.flip = false;
this.score = 0;
this.anim[0] = new Animation(1,1,'PlayerAnimation/Staing/');
this.anim[1] = new Animation(0.08,2,'PlayerAnimation/Walking/');
this.anim[2] = new Animation(1,1,'PlayerAnimation/Staing/');
this.live = true;
this.view = 0;
this.timer = 299;
}


Player.prototype = {
update:function(){

if (hp<0)this.live = false;

if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)){this.dx= 3;}
if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)){this.dx= -3;}
if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)&&this.onground){this.dy=-5;}
if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)){ 

this.timer++;
if (this.timer>10){
    var bullet = new Bullet({x: this.pos.x, y:this.pos.y-10+this.size.h/2},
      {x:12*this.view, y:0},'player');
      this.game.addBody(bullet);
this.timer = 0;
    }
}

this.dy += 0.1;
this.onground = false;
if (this.pos.y>600-this.size.h-30){this.pos.y = 600-this.size.h-30;this.dy = 0;this.onground = true;}

if (this.dx>0){this.flip=false;this.view=1;}
if (this.dx<0){this.flip=true;this.view=-1;}

if (this.dx != 0 && this.dy ==0)this.state = 1;
if (this.dx == 0 && this.dy ==0)this.state = 0;


this.pos.x += this.dx;

this.pos.y += this.dy;

if (this.dx != 0){
this.iterator+= 0.2;
var a = Math.sin(this.iterator)*1;
if (a<0)a*=-1;
this.pos.y = this.pos.y-a;


this.anim[this.state].update();
}

},

draw:function(screen){
this.anim[this.state].draw(screen,this.pos,43,43,this.flip);
},


}



var Keyboarder = function(){

var keyState = {};

window.onkeydown = function(e){
keyState[e.keyCode] = true;
}

window.onkeyup = function(e){
keyState[e.keyCode] = false;
}

this.isDown = function(keyCode){
return keyState[keyCode] == true;
}
this.KEYS = {LEFT: 37,RIGHT:39,SPACE:32,UP:38,DOWN:40};
}



var DrawRect = function(screen,body){

screen.fillRect(body.pos.x-camera.x,body.pos.y-camera.y,body.size.w,body.size.h);

}

var DrawImage = function(pos,screen,scr){
img = new Image();

img.src = scr;

screen.drawImage(img,pos.x-camera.x,pos.y-camera.y);
}

var DrawImageB = function(pos,screen,scr){
img = new Image();

img.src = scr;

screen.drawImage(img,pos.x,pos.y);
}


var DrawImageC = function(pos,w,screen,scr){

img = new Image();

img.src = scr;
if (w>0)
screen.drawImage(img,0,0,w,img.height,pos.x,pos.y,w,img.height);
}

var DrawImage2 = function(pos,screen,img){
screen.drawImage(img,pos.x,pos.y);
}




var Animation = function(speed,count,path){

this.currentframe = 0;
this.speed = speed;
this.count = count;
this.path = path;
this.IsCycleble = false;

}

Animation.prototype ={

update:function(){

this.currentframe += this.speed;

  if (!this.IsCycleble)
if (this.currentframe>=this.count)this.currentframe = 0;
  if (this.IsCycleble)
  if (this.currentframe>=this.count)this.currentframe = this.count;
},

draw:function(screen,pos,w,h,flip = false){
  if (!flip)
DrawImage(pos,screen,this.path+Math.floor(this.currentframe)+'.png');
  if (flip)
DrawImage(pos,screen,this.path+Math.floor(this.currentframe)+'f.png');
}

}







 window.onload = function(){

new Game("screen");

}

})();


