var createEngine = require('voxel-engine');
var voxel = require('voxel');
var walk = require('voxel-walk');
var terrain = require('./lib/terrain.js');

var game = createEngine({
  generateChunks: false,
  chunkDistance: 2,
  texturePath: './textures/',
  materials: [['grass', 'dirt', 'grass_dirt'], 'dirt'],
  worldOrigin: [0, 0, 0],
  controls: { discreteFire: true }
});

// Generate terrain
var generateChunk = terrain();

game.voxels.on('missingChunk', function(p) {
  var voxels = generateChunk(p, 32);
  var chunk = {
    position: p,
    dims: [32, 32, 32],
    voxels: voxels
  };

  game.showChunk(chunk);
});

var container = document.body;
game.appendTo(container);

// Create a player
var createPlayer = require('voxel-player')(game);
var dude = new createPlayer('dude.png');
dude.possess();
dude.yaw.position.set(2, 3, 4);

var target = game.controls.target();

// Create clouds
var clouds = require('voxel-clouds')({
  game: game,
  high: 10,
  distance: 300,
  many: 100,
  speed: 0.01,
  material: new game.THREE.MeshBasicMaterial({
    emissive: 0xffffff,
    shading: game.THREE.FlatShading,
    fog: false,
    transparent: true,
    opacity: 0.5
  })
});

game.on('tick', function() {
  walk.render(target.playerSkin);
  var vx = Math.abs(target.velocity.x);
  var vz = Math.abs(target.velocity.z);
  if (vx > 0.001 || vz > 0.001) walk.stopWalking();
    else walk.startWalking();
});
game.on('tick', clouds.tick.bind(clouds));

// Create flowers
var flowers = require('./lib/flowers.js')({
  game: game,
  distance: 50,
  many: 200
});
game.on('tick', flowers.tick.bind(flowers));
