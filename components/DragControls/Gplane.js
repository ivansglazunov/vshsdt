import React from 'react';

export default function Gplane({ position }) {
    return (
        <mesh visible={false} position={position}>
            <planeGeometry attach="geometry" args={[100, 100]} />
            <meshLambertMaterial attach="material" color={0x777777} />
        </mesh>
    );
}
