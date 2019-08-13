import React, { useContext, useState } from 'react';
import {context} from '../../lib/helpers/context';
import {useThree} from 'react-three-fiber';
import ClickMarker from './ClickMarker';
import Gplane from './Gplane';

export default function DragControls(props) {
    const { scene } = useThree();
    const {
        state: {
            gplane = false,
            jointBody,
            constrainedBody,
            mouseConstraint,
        } = {},
    } = useContext(context) || {};
    const [isClickMarkerVisible, setIsClickMarkerVisible] = useState(false);
    const [clickMarkerPos, setClickMarkerPos] = useState([0, 0, 0]);

    window.addEventListener("mousemove", onMouseMove, false );
    window.addEventListener("mousedown", onMouseDown, false );
    window.addEventListener("mouseup", onMouseUp, false );

    function onMouseMove(e){
        // Move and project on the plane
        if (gplane && mouseConstraint) {
            var pos = projectOntoPlane(e.clientX,e.clientY,gplane,camera);
            if(pos){
                setClickMarker(pos.x,pos.y,pos.z,scene);
                moveJointToPoint(pos.x,pos.y,pos.z);
            }
        }
    }
    
    function onMouseDown(e){
        // Find mesh from a ray
        var entity = findNearestIntersectingObject(e.clientX,e.clientY,camera,meshes);
        var pos = entity.point;
        if(pos && entity.object.geometry instanceof THREE.BoxGeometry){
            constraintDown = true;
            // Set marker on contact point
            setClickMarker(pos.x, pos.y, pos.z);
    
            // Set the movement plane
            setScreenPerpCenter(pos,camera);
    
            var idx = meshes.indexOf(entity.object);
            if(idx !== -1){
                addMouseConstraint(pos.x,pos.y,pos.z,bodies[idx]);
            }
        }
    }

    function setClickMarker(x, y, z) {
        setIsClickMarkerVisible(true);
        setClickMarkerPos([x, y, z]);
    }

    function removeClickMarker(){
        setIsClickMarkerVisible(false);
    }

    function setScreenPerpCenter(point, camera) {
        // If it does not exist, create a new one
        if(!gplane) {
          var planeGeo = new THREE.PlaneGeometry(100,100);
          var plane = gplane = new THREE.Mesh(planeGeo,material);
          plane.visible = false; // Hide it..
          scene.add(gplane);
        }
    
        // Center at mouse position
        gplane.position.copy(point);
    
        // Make it face toward the camera
        gplane.quaternion.copy(camera.quaternion);
    }
    
      
    return (
        <>
            <ClickMarker visible={isClickMarkerVisible} position={clickMarkerPos} />
            <Gplane />
        </>
    );
}