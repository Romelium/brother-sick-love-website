import { PointsMaterialProps, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BufferGeometry, Vector3 } from "three";
import randomOnUnitSphere from "../utils/OnUnitSphere/randomOnUnitSphere";
import randomRange from "../utils/randomRange";

const ParticleExplosion = ({
  count = 100,
  speed = 1,
  startDistance = 0,
  endDistance = 10,
  material,
}: {
  count?: number;
  speed?: number;
  startDistance?: number;
  endDistance?: number;
  material?: PointsMaterialProps;
}) => {
  const mesh = useRef<BufferGeometry>(null!);
  const points = useMemo(
    () => [...Array(count)].map(() => new Vector3()),
    [count]
  );
  const endPositions = useMemo(
    () =>
      [...Array(count)].map(() =>
        new Vector3(...randomOnUnitSphere()).multiplyScalar(
          randomRange(startDistance, endDistance)
        )
      ),
    [count]
  );
  useFrame((state, delta) => {
    endPositions.forEach((endPosition, i) => {
      points[i].add(
        endPosition
          .clone()
          .sub(points[i])
          .multiplyScalar(delta * speed)
      );
    });
    mesh.current.setFromPoints(points);
  });
  return (
    <points>
      <bufferGeometry ref={mesh}></bufferGeometry>
      <pointsMaterial {...material} />
    </points>
  );
};

export default ParticleExplosion;
