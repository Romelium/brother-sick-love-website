import { OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import randomOnUnitSphere from "../utils/randomOnUnitSphere";

const Home: NextPage = () => {
  const [test, setTest] = useState<boolean>(false);
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
      <Canvas>
        <color attach="background" args={[0xfff2f1]} />
        <pointLight />
        {[...Array(256)].map((x, i) => {
          const topScale = 16;
          const scale = Math.random() * topScale;
          return (
            <mesh
              scale={scale}
              position={
                randomOnUnitSphere().map(
                  (x) => x * (5 + scale + Math.random() * topScale)
                ) as [x: number, y: number, z: number]
              }
            >
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
        })}
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
      </Canvas>
    </div>
  );
};

export default Home;
