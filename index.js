var createEngine = require('voxel-engine')
var voxel = require('voxel')
var walk = require('voxel-walk')
var terrain = require('./lib/terrain.js')

var game = createEngine({
  generateChunks: false,
  chunkDistance: 3,
  texturePath: './textures/',
  worldOrigin: [0, 0, 0],
  controls: { discreteFire: true }
})

var generateChunk = terrain()

game.voxels.on('missingChunk', function(p) {
  var voxels = generateChunk(p, 32)
  var chunk = {
    position: p,
    dims: [32, 32, 32],
    voxels: voxels
  }
  game.showChunk(chunk)
})


var container = document.body
game.appendTo(container)

var createPlayer = require('voxel-player')(game)
var dude = new createPlayer('dude.png')
dude.possess()
dude.yaw.position.set(2, 14, 4)

var target = game.controls.target()

game.on('tick', function() {
  walk.render(target.playerSkin)
  var vx = Math.abs(target.velocity.x)
  var vz = Math.abs(target.velocity.z)
  if (vx > 0.001 || vz > 0.001) walk.stopWalking()
    else walk.startWalking()
})
