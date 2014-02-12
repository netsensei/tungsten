
function Sprite(opts) {
  if (!(this instanceof Sprite)) return new Sprite(opts || {});
  this.game = opts.game;
  this.spriteTexture = this.game.THREE.ImageUtils.loadTexture(opts.spriteTexture);

  this.spriteMaterial = new this.game.THREE.SpriteMaterial({
    map: this.spriteTexture,
    useScreenCoordinates: false,
    alignment: this.game.THREE.SpriteAlignment.topLeft
  });

  this.sprite = new this.game.THREE.Sprite(this.spriteMaterial);

}
module.exports = Sprite;

Sprite.prototype.setPosition = function(x, y, z) {
 this.sprite.position.set(x, y, z); // imageWidth, imageHeight
};

Sprite.prototype.setScale = function(w, h) {
  this.sprite.scale.set( w, h, 1.0 ); // imageWidth, imageHeight
};

Sprite.prototype.addToScene = function() {
  this.game.scene.add(this.sprite);
};
