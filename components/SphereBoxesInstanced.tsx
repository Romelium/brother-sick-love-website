import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, Object3D, Vector2 } from "three";
import sphericalCoordinates from "../utils/OnUnitSphere/sphericalCoordinates";
import randomOnUnitCircle from "../utils/randomOnUnitCircle";

const niceColors = [0xff5c58, 0xfe8f8f, 0xfcd2d1, 0xffedd3];

const tempObject = new Object3D();
const tempColor = new Color();

const SphereBoxesInstanced = ({
  count,
  maxScale = 16,
  insideSize = 5,
  speed = 0.01,
}: {
  count: number;
  maxScale?: number;
  insideSize?: number;
  speed?: number;
}) => {
  const mesh = useRef<
    THREE.InstancedMesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
  >(null!);
  const boxesData = useMemo(
    () =>
      [...Array(count)].map(() => {
        return {
          color: niceColors[Math.floor(Math.random() * 4)],
          coord: new Vector2(Math.random(), Math.random()),
          scale: Math.random() * maxScale,
          velocity: new Vector2(...randomOnUnitCircle()).multiplyScalar(speed),
        };
      }),
    [count]
  );
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        [...Array(count)].flatMap((_, i) =>
          tempColor.set(boxesData[i].color).toArray()
        )
      ),
    [count]
  );
  const loopBoxesData = (
    f: (
      value: {
        color: number;
        coord: THREE.Vector2;
        scale: number;
        velocity: THREE.Vector2;
      },
      index: number
    ) => void
  ) => {};
  useFrame((state, delta) => {
    boxesData.forEach((v, i) => {
      v.coord.x += v.velocity.x * delta;
      v.coord.y += v.velocity.y * delta;
      tempObject.scale.setScalar(v.scale);
      tempObject.position.set(
        ...(sphericalCoordinates(v.coord.x, v.coord.y).map(
          (x) => x * (insideSize + v.scale)
        ) as [x: number, y: number, z: number])
      );
      tempObject.lookAt(0, 0, 0);

      tempObject.updateMatrix();
      mesh.current.setMatrixAt(i, tempObject.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={mesh} args={[, , count]}>
      <boxGeometry>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </boxGeometry>
      <meshToonMaterial vertexColors />
    </instancedMesh>
  );
};

export default SphereBoxesInstanced;
