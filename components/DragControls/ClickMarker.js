import React from 'react';

export default function ClickMarker({ visible, position }) {
    return (
        <mesh visible={visible} position={position}>
            <sphereGeometry attach="geometry" args={[0.2, 8, 8]} />
            <meshLambertMaterial attach="material" color={0xff0000} />
        </mesh>
    );
}
