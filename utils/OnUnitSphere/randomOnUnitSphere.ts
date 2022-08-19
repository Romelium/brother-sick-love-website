import sphericalCoordinates from "./sphericalCoordinates";

const randomOnUnitSphere = (): [x: number, y: number, z: number] => {
  return sphericalCoordinates(Math.random(), Math.random());
};

export default randomOnUnitSphere;
