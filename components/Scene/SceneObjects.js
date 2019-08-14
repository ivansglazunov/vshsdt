import React from 'react';
import Box from '../geometry/Box';
import Plane from '../geometry/Plane';
import Draggable from '../geometry/Draggable';

export default function SceneObjects() {

    return (
        <>
            <Plane position={[0, 0, 0]} />
            <Draggable>
                <Box position={[1, 0, 1]} />
            </Draggable>
            <Box position={[1, 0, 1]} />
            {/*
            <Box position={[2, 1, 5]} />
            <Box position={[0, 0, 6]} />
            <Box position={[-1, 1, 8]} />
            <Box position={[-2, 2, 13]} />
            <Box position={[2, -1, 13]} />
            */}
        </>
    );
}