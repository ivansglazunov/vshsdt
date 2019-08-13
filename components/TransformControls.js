import React, { useRef } from 'react';
import { useThree, useRender } from 'react-three-fiber';
import { TransformControls as THREETransformControls } from 'three-full';
import { useOrbit } from './OrbitControls';

export default function TransformControls(props) {
  const { children } = props;
  const { camera, scene, canvas } = useThree();  
  const orbitRef = useOrbit();
  const meshRef = useRef();
  
  const control = new THREETransformControls(camera, canvas);
  control.attach(meshRef.current);
  scene.add(control);

  control.addEventListener( 'dragging-changed', function ( event ) {
    orbitRef.current.enabled = !event.value;
  });

  return (
      <mesh ref={meshRef}>
        {children}
      </mesh>
  );
}
