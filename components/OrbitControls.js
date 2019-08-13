import React, { useContext } from 'react';
import { useRender, extend } from 'react-three-fiber';
import { OrbitControls as THREEOrbitControls } from 'three-full';
import { context } from '../lib/helpers/context';

extend({ OrbitControls: THREEOrbitControls });

export function useOrbit() {
    const { orbitControlRef } = useContext(context);
    return orbitControlRef;
}

export default function OrbitControls(props) {
    const { orbitControlRef } = useContext(context);

    useRender(() => orbitControlRef.current.update());

    return <orbitControls ref={orbitControlRef} {...props} />;
}
