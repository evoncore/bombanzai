
class WorldMap
{

  map = new PIXI.Container();

  containers = {
    players: new PIXI.Container(),
    bombs: new PIXI.Container(),
    walls: new PIXI.Container(),
    boxes: new PIXI.Container()
  };

  landscape = {
    earth: new PIXI.Container(),
    water: new PIXI.Container(),
    jungle: new PIXI.Container(),
    sand: new PIXI.Container()
  };

}