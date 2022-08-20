import { Color, extend, Object3DNode, useFrame } from "@react-three/fiber";
import { MeshLine, MeshLineMaterial } from "meshline";
import { useMemo, useRef } from "react";
import { CatmullRomCurve3, Vector3 } from "three";
import randomOnUnitSphere from "../utils/OnUnitSphere/randomOnUnitSphere";
import randomRange from "../utils/randomRange";

extend({ MeshLine, MeshLineMaterial });
declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLine: Object3DNode<MeshLine, typeof MeshLine>;
    meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}

function Fatline({
  curve,
  width,
  color,
  speed = 1,
}: {
  curve?: number[] | Float32Array;
  width?: number;
  color?: THREE.Color | string | number;
  speed?: number;
}) {
  const material = useRef<MeshLineMaterial>(null!);
  useFrame(
    (state, delta) => (material.current.uniforms.dashOffset.value -= speed)
  );
  return (
    <mesh>
      <meshLine attach="geometry" points={curve} />
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.9}
      />
    </mesh>
  );
}

const Lines = ({
  count,
  radius = 10,
  center = new Vector3(),
  colors = [
    "#A2CCB6",
    "#FCEEB5",
    "#EE786E",
    "#e0feff",
    "lightpink",
    "lightblue",
  ],
  pointCount = 30,
  curveCount = 1000,
  pointRadius = 4,
  innerRadius = 0,
}: {
  count: number;
  radius?: number;
  center?: Vector3;
  colors?: (string | number | Color | undefined)[];
  pointCount?: number;
  curveCount?: number;
  pointRadius?: number;
  innerRadius?: number;
}) => {
  const lines = useMemo(
    () =>
      [...Array(count)].map(() => {
        const pos = new Vector3(...randomOnUnitSphere())
          .multiplyScalar(Math.random() * (radius - innerRadius) + innerRadius)
          .add(center);
        const points = [...Array(pointCount)].map(() =>
          pos
            .clone()
            .add(
              new Vector3(...randomOnUnitSphere()).multiplyScalar(
                Math.random() * pointRadius
              )
            )
        );
        const curve = new CatmullRomCurve3(points).getPoints(curveCount);
        return {
          color: colors[Math.floor(colors.length * Math.random())],
          width: Math.max(0.1, 0.5 * Math.random()),
          speed: Math.max(0.0001, 0.0005 * Math.random()),
          curve,
        };
      }),
    [colors, count]
  );
  return (
    <>
      {lines.map((props, index) => (
        // @ts-ignore
        <Fatline key={index} {...props} />
      ))}
    </>
  );
};

export default Lines;
