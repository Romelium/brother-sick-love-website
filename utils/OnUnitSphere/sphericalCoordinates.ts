const sphericalCoordinates = (
  u: number,
  v: number
): [x: number, y: number, z: number] => {
  var theta = 2 * Math.PI * u;
  var phi = 2 * Math.PI * v;
  var x = Math.sin(phi) * Math.cos(theta);
  var y = Math.sin(phi) * Math.sin(theta);
  var z = Math.cos(phi);
  return [x, y, z];
};

export default sphericalCoordinates;
