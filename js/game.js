window.onload=function(){
    Game.init();

};

VAR =
{
    fps:60,
    fadeTime:1,
    textAlpha:1,
    level:0,
    score:0,
    highscore:0,
    text:"",
    w:0,
    h:0,
    lives:3,
    lastTime:0,
    rand:function(min,max){
        return Math.floor(Math.random()*(max-min+1))+min
    }

};
Game =
{
    
    init:function(){
        Sound.init();
        Game.canvas = document.createElement("canvas");
        Game.hitcanvas = document.createElement("canvas");
        Game.ctx = Game.canvas.getContext("2d");
        Game.hitctx = Game.hitcanvas.getContext("2d");
        Game.live= new Array();
        Game.layout();
        window.addEventListener("resize",Game.layout);
        document.body.appendChild(Game.canvas);
     
      
      
      
       
        Game.newGame();
        Game.newLevel();
        window.addEventListener("keydown",Game.keyload);
        window.addEventListener("keyup",Game.keyload);
        Game.animationLoop();
    },
    
 newLevel:function() {
   
    VAR.text = `LEVEL ${VAR.level + 1}`;
    VAR.textAlpha = 1.0;
    Game.createAsteroids();
  },
    createAsteroids:function()
    {
        for (var i=0;i<2+VAR.level;i++)
        {
            new Asteroid(2);
           
        }
    },
    newGame:function(){    
       Game.ship= new Ship();
      },
    stop:function()
    {
        window.removeEventListener("keydown",Game.keyload);
        window.removeEventListener("keyup",Game.keyload);
    },
    keyload:function(e){

		if(e.keyCode==37 || e.keyCode==39 || e.keyCode==38 || e.keyCode==32 || e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 87){
			
			if(e.type=='keydown' && !Game['key_'+e.keyCode]){
				Game['key_'+e.keyCode] = true;
			
				if(e.keyCode==37 || e.keyCode == 65){
					Game.key_39 = false;
                }
                else if(e.keyCode==39 || e.keyCode == 68){
					Game.key_37 = false;
                }
                else if(e.keyCode==32){
                Sound.play('laser');
				new Bullet();
				}
			}else if(e.type=='keyup'){
				Game['key_'+e.keyCode] = false;
			}

		}
	},
    layout:function(){

        VAR.w = window.innerWidth;
        VAR.h = window.innerHeight;
        VAR.d = Math.min(VAR.w,VAR.h);

        Game.canvas.width = VAR.w;
        Game.canvas.height = VAR.h;

        Game.hitcanvas.width = VAR.w;
        Game.hitcanvas.height = VAR.h;

        Game.hitctx.fillStyle = "red";
        Game.ctx.fillStyle = "white";
        Game.ctx.strokeStyle = "white";
        Game.ctx.lineWidth = 3;
        Game.ctx.lineJoin = "round";
      
  for (var i=0;i<VAR.lives;i++)
        {
            Game.live[i]=new Ship(0.05*VAR.d *(i+1),0.07*VAR.d,false);
        }
        
    },
    drawText:function()
    {
        if (VAR.textAlpha >= 0) {
            Game.ctx.textAlign = "center";
            Game.ctx.textBaseline = "middle";
            Game.ctx.fillStyle = `rgba(255, 255, 255, ${VAR.textAlpha})`;
            Game.ctx.font = `small-caps ${0.15*VAR.d}px Montserrat`;
            Game.ctx.fillText(`${VAR.text}`, VAR.w / 2, VAR.h/1.5);
            VAR.textAlpha -= 1.0 / VAR.fadeTime / VAR.fps;
            
          }
    },
    drawScore:function()
    {

        Game.ctx.textAlign = "center";
        Game.ctx.textBaseline = "middle";
        Game.ctx.fillStyle = "white";
        Game.ctx.font = `${0.06*VAR.d}px dejavu sans mono`;
        Game.ctx.fillText(`Score: ${VAR.score}`, VAR.w/2, 0.06*VAR.d);
    }, 
     drawHighscore:function()
    {
        console.log (`Score: ${VAR.score} Higscore ${VAR.higscore}`)
if(VAR.score>VAR.highscore)
{
    VAR.highscore = VAR.score;
}
        Game.ctx.textAlign = "center";
        Game.ctx.textBaseline = "middle";
        Game.ctx.fillStyle = "white";
        Game.ctx.font = `${0.06*VAR.d}px dejavu sans mono`;
        Game.ctx.fillText(`Highscore: ${VAR.highscore}`, VAR.w/1.2, 0.06*VAR.d);
    },
    animationLoop:function(time){
        requestAnimationFrame(Game.animationLoop);
        if(time-VAR.lastTime>=1000/VAR.fps)
        {

            VAR.lastTime=time;
           
            Game.ctx.clearRect(0,0,VAR.w,VAR.h);
             
            Game.drawScore();
            Game.drawHighscore();
            for(var i=0;i<VAR.lives;i++)
            {
                Game.live[i].draw();
            }
            
            Game.ship.draw();
            Asteroid.draw();
            Bullet.draw();
            ExploseInit.draw();
            Game.drawText();
            
        }
    }
}
            