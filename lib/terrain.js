module.exports = function() {

return function generateChunk(position, width) {
  var startX = position[0] * width
  var startY = position[1] * width
  var startZ = position[2] * width
  var chunk = new Int8Array(width * width * width)

  pointsInside(startX, startZ, width, function(x, z) {
    var y = 2
    if (startY < y && y < startY + width) {
      var xidx = Math.abs((width + x % width) % width)
      var yidx = Math.abs((width + y % width) % width)
      var zidx = Math.abs((width + z % width) % width)
      var idx = xidx + yidx * width + zidx * width * width
      chunk[idx] = 1
    }
  })

  return chunk
}

function pointsInside(startX, startZ, width, func) {
  for (var x = startX; x < startX + width; x++) {
    for (var z = startZ; z < startZ + width; z++) {
      func(x, z)
    }
  }
}
