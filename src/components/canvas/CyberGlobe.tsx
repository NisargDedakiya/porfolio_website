"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PointSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Points>(null);

  // Generate particles on a sphere structure
  const [positions, linePositions] = useMemo(() => {
    const tempPositions: number[] = [];
    const count = 130; // Node count
    const radius = 2.4;

    // Golden spiral algorithm for even node distribution on sphere surface
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      tempPositions.push(x, y, z);
    }

    // Connect close points together
    const tempLinePositions: number[] = [];
    for (let i = 0; i < count; i++) {
      const p1 = new THREE.Vector3(
        tempPositions[i * 3],
        tempPositions[i * 3 + 1],
        tempPositions[i * 3 + 2]
      );

      // Find nearest neighbors to draw connections
      const distances = [];
      for (let j = i + 1; j < count; j++) {
        const p2 = new THREE.Vector3(
          tempPositions[j * 3],
          tempPositions[j * 3 + 1],
          tempPositions[j * 3 + 2]
        );
        const dist = p1.distanceTo(p2);
        if (dist < 1.0) {
          distances.push({ dist, index: j });
        }
      }

      // Connect up to 2 nearest neighbors
      distances.sort((a, b) => a.dist - b.dist);
      const connections = distances.slice(0, 2);
      connections.forEach((conn) => {
        const j = conn.index;
        tempLinePositions.push(
          tempPositions[i * 3], tempPositions[i * 3 + 1], tempPositions[i * 3 + 2],
          tempPositions[j * 3], tempPositions[j * 3 + 1], tempPositions[j * 3 + 2]
        );
      });
    }

    return [
      new Float32Array(tempPositions),
      new Float32Array(tempLinePositions),
    ];
  }, []);

  // Handle auto rotation and mouse pointer drift feedback loop
  useFrame((state) => {
    if (!groupRef.current || !sphereRef.current) return;
    
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    // Slow drift rotation based on cursor location
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointerX * 0.35, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointerY * 0.35, 0.05);

    // Auto rotate around y-axis
    sphereRef.current.rotation.y += 0.0012;
  });

  return (
    <group ref={groupRef}>
      <group ref={sphereRef}>
        {/* Nodes */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#FF4D4D" // Primary Accent (Crimson)
            size={0.065}
            sizeAttenuation={true}
            transparent={true}
            opacity={0.85}
            depthWrite={false}
          />
        </points>

        {/* Connections */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#3B82F6" // Secondary Accent (Steel Blue)
            transparent={true}
            opacity={0.16}
            depthWrite={false}
            linewidth={1}
          />
        </lineSegments>
      </group>
    </group>
  );
}

export function CyberGlobe() {
  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <PointSphere />
      </Canvas>
    </div>
  );
}
