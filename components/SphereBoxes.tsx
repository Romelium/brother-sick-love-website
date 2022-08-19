import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import sphericalCoordinates from "../utils/OnUnitSphere/sphericalCoordinates";
import randomOnUnitCircle from "../utils/randomOnUnitCircle";

const SphereBoxes = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const topScale = 16;
  const scale = Math.random() * topScale;
  const velocity = randomOnUnitCircle().map((x) => x * 0.01);
  let coord = [Math.random(), Math.random()] as [x: number, y: number];
  useFrame((state, delta) => {
    coord[0] += velocity[0] * delta;
    coord[1] += velocity[1] * delta;
    ref.current.position.set(
      ...(sphericalCoordinates(...coord).map((x) => x * (5 + scale)) as [
        x: number,
        y: number,
        z: number
      ])
    );
    ref.current.lookAt(0, 0, 0);
  });
  return (
    <mesh ref={ref} scale={scale}>
      <boxGeometry />
      <meshToonMaterial
        color={
          [0xff5c58, 0xfe8f8f, 0xfcd2d1, 0xffedd3][
            Math.floor(Math.random() * 4)
          ]
        }
      />
    </mesh>
  );
};

export default SphereBoxes;
