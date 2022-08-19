import { OrbitControls, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
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
const HomeCanvas = () => {
  const [test, setTest] = useState<boolean>(false);
  return (
    <Canvas>
      <gridHelper />
      <color attach="background" args={[0xfff2f1]} />
      <pointLight />
      {[...Array(256)].map((v, i) => (
        <SphereBoxes key={i} />
      ))}
      <Text
        fontSize={0.6}
        color="white"
        onClick={() => {
          setTest(test);
          console.log(test);
        }}
      >
        Hello Love!
      </Text>
      <OrbitControls
        makeDefault
        position={[0, 0, 0]}
        enableZoom={false}
        enablePan={false}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={16} />
        <Noise opacity={0.05} />
      </EffectComposer>
    </Canvas>
  );
};
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Can We Hang Out?</title>
        <meta
          name="description"
          content="My brother beg on his knees for me to make this site"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeCanvas />
    </div>
  );
};

export default Home;
