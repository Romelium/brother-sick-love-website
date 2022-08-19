import { OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import SphereBoxesInstanced from "../components/SphereBoxesInstanced";
import styles from "../styles/Home.module.css";

const HomeCanvas = () => {
  const [test, setTest] = useState<boolean>(false);
  return (
    <Canvas>
      <gridHelper />
      <color attach="background" args={[0xfff2f1]} />
      <pointLight />
      <SphereBoxesInstanced count={256} />
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
