import React from 'react';
import { useThree, Canvas } from 'react-three-fiber'
import Provider from '../../lib/helpers/context';
import { Provider as CannonProvider } from '../../lib/helpers/useCannon';
import { getSceneRootDOMElement } from '../../lib/helpers/common';
import OrbitControls from '../OrbitControls';
////import DragControls from '../DragControls';
import SceneObjects from './SceneObjects';

export default function Scene() {
    const { camera } = useThree();

    return (
        <Provider>
            <ambientLight intensity={0.5} />
            <spotLight
                intensity={1}
                position={[30, 30, 50]}
                angle={0.2}
                penumbra={0.8} 
                castShadow />
            <OrbitControls
                args={[camera, getSceneRootDOMElement()]}
                enableDamping
                dampingFactor={0.5} />
            <CannonProvider>
                {/*<DragControls />*/}
                <SceneObjects />
            </CannonProvider>
        </Provider>
    );
}
