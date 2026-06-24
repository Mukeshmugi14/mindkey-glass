import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

function FloatingParticles() {
  const count = 300;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const s = Math.max(1.5, Math.cos(t) * 5);
      
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#c3a154" emissive="#c3a154" emissiveIntensity={0.5} roughness={0.1} />
    </instancedMesh>
  );
}

function BrainStructure() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.2;
      group.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  // Stylized brain lobes built with overlapping icosahedrons
  return (
    <group ref={group} position={[-5, 5, -15]}>
      <mesh position={[-2, 0, 0]} rotation={[0.5, 0.5, 0]}>
        <icosahedronGeometry args={[3, 1]} />
        <meshStandardMaterial color="#463464" emissive="#5a4482" emissiveIntensity={0.6} wireframe />
      </mesh>
      <mesh position={[2, 0, 0]} rotation={[-0.5, -0.5, 0]}>
        <icosahedronGeometry args={[3, 1]} />
        <meshStandardMaterial color="#463464" emissive="#5a4482" emissiveIntensity={0.6} wireframe />
      </mesh>
      {/* Synaptic connecting nodes */}
      <mesh position={[0, -1, 1]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#c3a154" emissive="#c3a154" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function SynapticNode() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = -state.clock.elapsedTime * 0.15;
      group.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group} position={[12, -5, -20]}>
      <mesh>
        <octahedronGeometry args={[4, 0]} />
        <meshStandardMaterial color="#c3a154" emissive="#c3a154" emissiveIntensity={0.3} wireframe />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial color="#c3a154" emissive="#c3a154" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

export default function HeroBackground3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto opacity-40">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#c3a154" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#463464" />
        <FloatingParticles />
        <BrainStructure />
        <SynapticNode />
      </Canvas>
    </div>
  );
}
