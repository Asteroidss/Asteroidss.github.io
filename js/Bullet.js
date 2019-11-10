Bullet.all = {};
Bullet.max = 5;
Bullet.speed = 0.022;
Bullet.count = 0;
Bullet.active_count = 0;
Bullet.life = 35;

function Bullet(){
if(Bullet.active_count<Bullet.max){
    Bullet.active_count++;
    Bullet.count++;
    this.id = Bullet.count.toString();
    Bullet.all[this.id] = this;
    this.life = 0;
    this.a = Game.ship.a;
    this.x = Game.ship.points[0].x;
    this.y = Game.ship.points[0].y;
    this.modX = Math.sin(Math.PI/180 * this.a) * Bullet.speed * VAR.d;
    this.modY = -Math.cos(Math.PI/180 * this.a) * Bullet.speed * VAR.d;
}

}
Bullet.draw = function(){
    
for(var b in Bullet.all)
{
    for( var a in Asteroid.all)
    {
        if(Asteroid.all[a].collisiontest(Bullet.all[b].x,Bullet.all[b].y))
        {
            Bullet.all[b].life+=Bullet.life;
            Asteroid.all[a].remove();
            break;
        }
    }
    if(Bullet.all[b].life < Bullet.life)
    {
       
    Bullet.all[b].life++;
    Bullet.all[b].x += Bullet.all[b].modX;
    Bullet.all[b].y += Bullet.all[b].modY;

    if(Bullet.all[b].x < 0)
    {
        Bullet.all[b].x = VAR.w;
    }
    else if(Bullet.all[b].x > VAR.w)
    {
        Bullet.all[b].x -= VAR.w;
    }

    if(Bullet.all[b].y < 0)
    {
        Bullet.all[b].y = VAR.h;
    }
    else if(Bullet.all[b].y > VAR.h)
    {
        Bullet.all[b].y -= VAR.h;
    }

    Game.ctx.beginPath();
    Game.ctx.fillStyle = "white";
    
    Game.ctx.arc(Bullet.all[b].x, Bullet.all[b].y, 3, 0, Math.PI/180*360);
    Game.ctx.closePath();
    Game.ctx.fill();
    }
    else
    {
        Bullet.active_count--;
        delete Bullet.all[b];
    }
}
};