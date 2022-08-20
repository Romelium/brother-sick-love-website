import { OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { TextureLoader } from "three";
import Lines from "../components/Lines";
import ParticleExplosion from "../components/ParticleExplosion";
import SphereBoxesInstanced from "../components/SphereBoxesInstanced";
import styles from "../styles/Home.module.css";

const heart =
  typeof window === "undefined" ? null : new TextureLoader().load("/heart.png");
const sunflower =
  typeof window === "undefined"
    ? null
    : new TextureLoader().load("/sunflower.png");

const HomeCanvas = () => {
  const [confetti, setConfetti] = useState<boolean>(false);
  return (
    <Canvas>
      <color attach="background" args={[0xfff2f1]} />
      <pointLight />
      <SphereBoxesInstanced count={256} />
      <Text
        fontSize={0.6}
        color="white"
        onClick={() => {
          setConfetti(!confetti);
          console.log(confetti);
        }}
      >
        Hello Love!
      </Text>
      {confetti ? (
        <>
          <ParticleExplosion
            startDistance={2}
            endDistance={8}
            material={{
              size: 0.5,
              map: heart,
              transparent: true,
            }}
          />
          <ParticleExplosion
            startDistance={2}
            endDistance={8}
            material={{
              size: 0.5,
              map: sunflower,
              transparent: true,
            }}
          />
          <Lines count={30} radius={8} pointRadius={4} />
        </>
      ) : null}
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
