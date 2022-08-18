import { OrbitControls, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

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
      <Canvas shadows={true}>
        <pointLight castShadow={true} position={[10, 10, 10]} />
        <mesh
          receiveShadow={true}
          scale={100}
          position={[0, -5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry />
          <meshStandardMaterial />
        </mesh>
        <TransformControls mode="translate">
          <mesh castShadow={true} scale={1} position={[0, 0, 0]}>
            <sphereGeometry />
            <meshStandardMaterial />
          </mesh>
        </TransformControls>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};

export default Home;
