Asteroid.count=0;
Asteroid.all={};
Asteroid.data =[
{r:0.025, speed:0.0005, minA:60, maxA:90},
{r:0.08, speed:0.00025, minA:50, maxA:70},
{r:0.2, speed:0.00007, minA:30, maxA:45}
];
function Asteroid(size,x,y)
{
Asteroid.count++;
this.id = Asteroid.count;
Asteroid.all[this.id] = this;
this.size = size !== undefined ? size : 2;

this.x = x!==undefined ? x : ((VAR.rand(0,1) ? VAR.rand(0,3) : VAR.rand(7,10))/10)*VAR.w;
this.y = y!==undefined ? y : ((VAR.rand(0,1) ? VAR.rand(0,3) : VAR.rand(7,10))/10)*VAR.h;

this.modX = Asteroid.data[this.size].speed * VAR.rand(1,10) * (VAR.rand(0,1) ? 1 : -1);
this.modY = Asteroid.data[this.size].speed * VAR.rand(1,10) * (VAR.rand(0,1) ? 1 : -1);

this.points = [];
this.r = Asteroid.data[this.size].r;
var a=0;
while(a<360){
    a+=VAR.rand(Asteroid.data[this.size].minA,Asteroid.data[this.size].maxA);
    this.points.push({
        x:Math.sin(Math.PI/180 * a) * this.r,
        y:Math.cos(Math.PI/180 * a) * this.r
    });
 
}

// console.log(this.points);

}
Asteroid.prototype.collisiontest = function(x,y)
{
    if(x > this.x - this.r * VAR.d && x< this.x +this.r * VAR.d && y > this.y - this.r *VAR.d && y < this.y + this.r * VAR.d)
    {
        Game.hitctx.clearRect(this.x - this.r * VAR.d,this.y - this.r * VAR.d,this.r * 2*VAR.d, this.r *2* VAR.d);
        Game.hitctx.beginPath(); 
    for(var i=0;i<this.points.length;i++)
    {
        Game.hitctx[i===0 ? 'moveTo' : 'lineTo'](this.points[i].x*VAR.d+this.x,this.points[i].y*VAR.d+this.y)
    }
    Game.hitctx.closePath();
    Game.hitctx.fill();
        if(Game.hitctx.getImageData(x,y,1,1).data[0]==255)
        {
            return true;
        }
    }
  
    return false;
}
Asteroid.prototype.draw = function()
{
    this.x += this.modX * VAR.d;
    this.y += this.modY * VAR.d;

    
    if(this.x + this.r * VAR.d < 0)
    {
        this.x += VAR.w + (this.r * 2 * VAR.d);
    }

    else if(this.x - this.r * VAR.d > VAR.w)
    {
        this.x -= VAR.w + (this.r * 2 * VAR.d);
    }



    if(this.y + this.r * VAR.d < 0)
    {
        this.y += VAR.h + (this.r * 2 * VAR.d);
    }

    else if(this.y - this.r * VAR.d > VAR.h)
    {
        this.y -= VAR.h + (this.r * 2 * VAR.d);
    }


    Game.ctx.beginPath(); 
     
    for(var i=0;i<this.points.length;i++)
    {
        Game.ctx[i===0 ? 'moveTo' : 'lineTo'](this.points[i].x*VAR.d+this.x,this.points[i].y*VAR.d+this.y)
        Game.hitctx[i===0 ? 'moveTo' : 'lineTo'](this.points[i].x*VAR.d+this.x,this.points[i].y*VAR.d+this.y)
    }
   
    Game.ctx.closePath();
    Game.ctx.stroke();
}
Asteroid.prototype.remove= function()
{
    Sound.play('bum'+(VAR.rand(1,2)))
    if(this.size > 0)
    {
        for (var i=0, j=VAR.rand(2,4);i<j;i++)
        {
            new Asteroid(this.size-1,this.x,this.y);
        }
    }
    if(Asteroid.all[this.id].size==0)
    {
        ExploseInit.n=VAR.rand(4,7);
        VAR.score+=100;
    }
    else if(Asteroid.all[this.id].size==1)
    {
        ExploseInit.n=VAR.rand(7,12);
        VAR.score+=50;
    }
    else if(Asteroid.all[this.id].size==2)
    {
        ExploseInit.n=VAR.rand(10,14);
        VAR.score+=10;
    }
    ExploseInit.add(this.x,this.y);
    delete Asteroid.all[this.id];
}
Asteroid.draw = function()
{
    Asteroid.num=0;
    for(var a in Asteroid.all)
    {
        Asteroid.num++;
        Asteroid.all[a].draw();
    }
    if(Asteroid.num==0 && !Game.succes)
    {
        VAR.level++;
        Game.succes=false;
        Sound.play('win');
      Game.newLevel();
        
    }
}