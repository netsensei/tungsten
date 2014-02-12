/* var Sprite = require('./lib/sprite.js')({
  game: game,
  spriteTexture: 'sprites/redball.png'
});
Sprite.position(3, 4, 0);
Sprite.scale(16, 16);
Sprite.draw(); */

function Flowers(opts) {
  if (!(this instanceof Flowers)) return new Flowers(opts || {});
  if (opts.THREE) opts = {game:opts};
  this.game = opts.game;
  this.distance = opts.distance || 300;
  this.many = opts.many || 100;
  this.high = 1;
  this.flowers = [];
  for (var i = 0; i < this.many; i++) {
    this.generate();
  }
}
module.exports = Flowers;

Flowers.prototype.generate = function() {
  var flower = require('./sprite.js')({
    game: this.game,
    spriteTexture: 'sprites/dandelion.png'
  });

  flower.setScale(6, 6);

  flower.addToScene();

  this._position(flower);

  this.flowers.push(flower);

  return flower;
};

Flowers.prototype.tick = function(dt) {
  var self = this;
  var player = self.game.controls.target().avatar.position;
  self.flowers.forEach(function(flower) {
    if (distanceTo(flower.sprite.position, player) > self.distance) {
      self._position(flower);
    }
  });
};

Flowers.prototype._position = function(flower) {
  var player = this.game.controls.target().avatar.position;
  var x = rand(player.x - this.distance, player.x + this.distance);
  var y = 3.5;
  var z = rand(player.z - this.distance, player.z + this.distance);
  flower.setPosition(x, y, z);
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function distanceTo(a, b) {
  if (!Array.isArray(a)) a = [a.x, a.y, a.z];
  if (!Array.isArray(b)) b = [b.x, b.y, b.z];
  var dx = b[0] - a[0];
  var dy = b[1] - a[1];
  var dz = b[2] - a[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
