import "../styles/globals.css";
import type { AppProps } from "next/app";

// const GltfModel = (
//   props: { path: string } & Omit<ThreeElements["primitive"], "object">
// ) => {
//   const gltf = useLoader(GLTFLoader, props.path);
//   return <primitive {...props} object={gltf.scene} />;
// };

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
