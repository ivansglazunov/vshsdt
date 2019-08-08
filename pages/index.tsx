import { Canvas } from 'react-three-fiber';
import Sandbox from '../components/Sandbox';

export const Index = () => {
  return (
    <Canvas camera={{ position: [0, 0, 15] }} >
      <Sandbox />
    </Canvas>
  );
};

export default Index;
