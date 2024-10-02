"use client"

import { Canvas, useThree } from "@react-three/fiber"
import Model from "./Model"
import { Suspense } from "react"
import { useProgress, Html, ScrollControls, OrbitControls } from "@react-three/drei"
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

function Loader() {
  const { progress, active } = useProgress()
//{progress.toFixed(1)} % loaded
  return <Html center>          <TextGenerateEffect
            words="Bitte warten"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          /></Html>
}

export default function Scene() {
  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} camera={{ position: [0, 4, 4],  zoom:2.2}} className="z-10  pt-36"> 
     <OrbitControls enableZoom enablePan enableRotate />  0
      <directionalLight position={[-5, -5, 5]} intensity={4} />
      <Suspense fallback={<Loader />}>
       
        {/* <ScrollControls damping={0.5} pages={2}> */}
          <Model />
{/* </OrbitControls > */}
        {/* </ScrollControls> */}
      </Suspense>
    </Canvas>
  )
}
