import React, { useState } from 'react';
import {useThree} from 'react-three-fiber';
import ClickMarker from './ClickMarker';
import Gplane from './Gplane';
import * as THREE from 'three';

export default function DragControls(props) {
    const ref = useCannon({ mass: 0 }, body => {
        body.addShape(new CANNON.Sphere(0.1));
        jointBody.collisionFilterGroup = 0;
        jointBody.collisionFilterMask = 0;
    
    });
      
    return (
        <mesh ref={ref} castShadow receiveShadow>
            <boxGeometry attach="geometry" args={[2, 2, 2]} />
            <meshNormalMaterial attach="material" />
        </mesh>
    )
}