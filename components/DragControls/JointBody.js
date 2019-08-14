import React, { useState } from 'react';
import { useThree, useUpdate } from 'react-three-fiber';
import ClickMarker from './ClickMarker';
import Gplane from './Gplane';
import * as THREE from 'three';

export default function JointBody({ position }) {
    const cannonRef = useCannon({ mass: 0 }, body => {
        body.addShape(new CANNON.Sphere(0.1));
        body.collisionFilterGroup = 0;
        body.collisionFilterMask = 0;
    });
    const meshRef = useUpdate(geometry => {

    }, [position], cannonRef);
      
    return <mesh ref={meshRef} />;
}