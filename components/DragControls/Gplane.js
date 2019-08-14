import React, { useRef, useEffect } from 'react';
import { useThree } from 'react-three-fiber';

export default function Gplane({ point }) {
    const { meshRef: { current: gplane } = {}} = useRef() || {};
    const { camera } = useThree();

    useEffect(() => {
        // Center at mouse position
        gplane.position.copy(point);

        // Make it face toward the camera
        gplane.quaternion.copy(camera.quaternion);
    }, [point]);

    return (
        <mesh ref={meshRef} visible={false}>
            <planeGeometry attach="geometry" args={[100, 100]} />
            <meshLambertMaterial attach="material" color={0x777777} />
        </mesh>
    );
}
