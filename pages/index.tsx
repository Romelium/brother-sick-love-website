import { OrbitControls, Text, TransformControls } from "@react-three/drei";
import {
  Canvas,
  PrimitiveProps,
  useFrame,
  useLoader,
} from "@react-three/fiber";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import type { NextPage } from "next";
import Head from "next/head";
import { Suspense, useRef, useState } from "react";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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

const Cat = (props: Omit<PrimitiveProps, "object"> & { refPrimi: any }) => {
  const gltf = useLoader(GLTFLoader, "/banana-cat/scene.glb");
  return (
    <Suspense fallback={null}>
      <primitive {...props} ref={props.refPrimi} object={gltf.scene} />
    </Suspense>
  );
};
const CanHang = () => {
  const [Yes, SetYes] = useState(false);
  const cat = useRef<any>(null!);
  const bigSign = useRef<Mesh<BufferGeometry, Material | Material[]>>(null!);
  const bigSignText = useRef<any>(null!);
  const yesSign = useRef<Mesh<BufferGeometry, Material | Material[]>>(null!);
  const yesSignText = useRef<any>(null!);
  const noSign = useRef<Mesh<BufferGeometry, Material | Material[]>>(null!);
  const noSignText = useRef<any>(null!);
  const pleaseSign = useRef<Mesh<BufferGeometry, Material | Material[]>>(null!);
  const pleaseSignText = useRef<any>(null!);
  useFrame((state, delta) => {
    if (Yes) {
      cat.current.rotation.x += Math.PI * delta;
      bigSign.current.rotation.y += Math.PI * delta;
      bigSignText.current.rotation.y += Math.PI * delta;
      yesSign.current.rotation.y -= Math.PI * delta;
      yesSignText.current.rotation.y -= Math.PI * delta;
      noSign.current.rotation.y -= Math.PI * delta;
      noSignText.current.rotation.y -= Math.PI * delta;
      pleaseSign.current.rotation.z += Math.PI * delta;
      pleaseSignText.current.rotation.z += Math.PI * delta;
    }
  });
  return (
    <>
      <mesh ref={bigSign} position={[0, 2, -0.125]} scale={[4, 1, 0.5]}>
        <boxGeometry />
        <meshToonMaterial />
      </mesh>
      <Text
        ref={bigSignText}
        fontSize={0.3}
        position={[0, 2, 0.1251]}
        color="black"
      >
        Can we hang out sometime?
      </Text>
      <mesh
        ref={pleaseSign}
        position={[0, -0.125, 0.375]}
        rotation={[-Math.PI * 0.3, 0, 0]}
        scale={[3, 1, 0.1]}
      >
        <boxGeometry />
        <meshToonMaterial />
      </mesh>
      <Text
        ref={pleaseSignText}
        fontSize={0.6}
        position={[0, 0, 0.35]}
        rotation={[-Math.PI * 0.3, 0, 0]}
        color="black"
      >
        Pleeease
      </Text>
      <mesh ref={noSign} position={[1.5, 0.875, -0.5]} scale={[1.5, 1, 0.5]}>
        <boxGeometry />
        <meshToonMaterial />
      </mesh>
      <Text
        ref={noSignText}
        fontSize={0.5}
        position={[1.5, 0.875, -0.249]}
        color="black"
        onClick={() => {
          // SetYes(!Yes);
          // console.log(Yes);
        }}
      >
        NO
      </Text>
      <mesh
        ref={yesSign}
        position={[-1.5, 0.875, -0.5]}
        scale={[1.5, 1, 0.5]}
        onClick={() => {
          SetYes(!Yes);
          console.log(Yes);
        }}
      >
        <boxGeometry />
        <meshToonMaterial />
      </mesh>
      <Text
        ref={yesSignText}
        fontSize={0.5}
        position={[-1.5, 0.875, -0.249]}
        color="black"
      >
        Yes
      </Text>
      <Cat refPrimi={cat} position={[0, -1, 0]} />
      {Yes ? (
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
          <Lines count={30} radius={8} pointRadius={4} innerRadius={4} />
        </>
      ) : null}
    </>
  );
};
const HomeCanvas = () => {
  return (
    <Canvas>
      <Suspense
        fallback={
          <Text fontSize={0.5} color="white">
            Loading...
          </Text>
        }
      >
        <color attach="background" args={[0xfff2f1]} />
        <pointLight />
        <Suspense fallback={null}>
          <SphereBoxesInstanced count={256} />
        </Suspense>
        <Suspense
          fallback={
            <Text fontSize={0.5} color="black">
              Loading...
            </Text>
          }
        >
          <CanHang />
        </Suspense>
        <OrbitControls
          makeDefault
          position={[0, 0, 0]}
          enableZoom={false}
          enablePan={false}
        />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            height={16}
          />
          <Noise opacity={0.05} />
        </EffectComposer>
      </Suspense>
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
