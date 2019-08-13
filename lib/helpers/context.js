import React, { useState, useRef } from 'react';

export const context = React.createContext();

export default function Provider({ children }) {
  const orbitControlRef = useRef();
  const [state, setState] = useState();
  
  return <context.Provider value={{ state, setState, orbitControlRef }} children={children} />
}
