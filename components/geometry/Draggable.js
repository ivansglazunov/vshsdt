import React, {useState, useContext, useRef} from 'react';
import { useWorld } from '../../lib/helpers/useCannon';
import * as CANNON from 'cannon';
import { useOrbit } from '../OrbitControls';
import { context } from '../../lib/helpers/context';

export default function Draggable({children}, ...props) {
  const orbit = useOrbit();
  const { state, setState } = useContext(context);
  const draggableRef = useRef(null);
  const [captured, setCaptured] = useState(false);
  const world = useWorld();

  function addMouseConstraint(x, y, z, body) {
    // The cannon body constrained by the mouse joint
    constrainedBody = body;
  
    // Vector to the clicked point, relative to the body
    var v1 = new CANNON.Vec3(x,y,z).vsub(constrainedBody.position);
  
    // Apply anti-quaternion to vector to tranform it into the local body coordinate system
    var antiRot = constrainedBody.quaternion.inverse();
    pivot = antiRot.vmult(v1); // pivot is not in local body coordinates
  
    // Move the cannon click marker particle to the click position
    jointBody.position.set(x,y,z);
  
    // Create a new constraint
    // The pivot for the jointBody is zero
    mouseConstraint = new CANNON.PointToPointConstraint(constrainedBody, pivot, jointBody, new CANNON.Vec3(0,0,0));
  
    // Add the constriant to world
    world.addConstraint(mouseConstraint);
  }
  
  return (
    <mesh ref={draggableRef} {...props}
        onClick={(event) => {
          //orbit.enabled = !orbit.value;
          //console.log('onClick', event);
        }}
        onPointerUp={(e) => {
            setCaptured(false);
            console.log('onPointerUp', e)
        }}
        onPointerDown={(e) => {
            console.log('onPointerDown', e)
            setCaptured(true);
        }}
        onWheel={(e) => {
            // console.log('onWheel', e)
        }}
        onPointerOver={(e) => {
            // console.log('onPointerOver', e)
        }}
        onPointerOut={(e) => {
            // console.log('onPointerOut', e)
        }}
        onPointerMove={(e) => {
            if (captured) {
                console.log('onPointerMove', e)
            }
        }}
        onUpdate={(e) => {
            //console.log('onUpdate', e)
        }}
    >
        {children}
    </mesh>
  )
}
