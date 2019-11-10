ExploseInit.count = 0;
ExploseInit.all = {};
ExploseInit.maxd = 25;
ExploseInit.n=VAR.rand(10,20)
function ExploseInit(x,y)
{
ExploseInit.count++;
this.id = ExploseInit.count;
ExploseInit.all[this.id]=this;
this.x = x;
this.y = y;
this.d =0;
this.modX = VAR.rand(3,7) * (VAR.rand(0,1) ? 1 : -1);
this.modY = VAR.rand(3,7) * (VAR.rand(0,1) ? 1 : -1);

}
ExploseInit.prototype.draw = function()
{
    this.x += this.modX;
    this.y += this.modY;
    this.d ++;
    Game.ctx.fillRect(this.x,this.y,3,3);
    if(this.d > ExploseInit.maxd)
    {
        delete ExploseInit.all[this.id];
    }

    
};
ExploseInit.add = function(x,y)
{
   
    for (var i=0;i<this.n;i++)
    {
        new ExploseInit(x,y);
    }
}
ExploseInit.draw = function()
{
    for (var e in ExploseInit.all)
    {
        ExploseInit.all[e].draw();
    }
}