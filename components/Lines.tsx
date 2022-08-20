import { Color, extend, Object3DNode, useFrame } from "@react-three/fiber";
import { MeshLine, MeshLineMaterial } from "meshline";
import { useMemo, useRef } from "react";
import { CatmullRomCurve3, Vector3 } from "three";

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
  colors,
}: {
  count: number;
  colors: (string | number | Color | undefined)[];
}) => {
  const lines = useMemo(
    () =>
      [...Array(count)].map(() => {
        const pos = new Vector3(
          10 - Math.random() * 20,
          10 - Math.random() * 20,
          10 - Math.random() * 20
        );
        const points = [...Array(count)].map(() =>
          pos
            .add(
              new Vector3(
                4 - Math.random() * 8,
                4 - Math.random() * 8,
                2 - Math.random() * 4
              )
            )
            .clone()
        );
        const curve = new CatmullRomCurve3(points).getPoints(1000);
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
