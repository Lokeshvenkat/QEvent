"use client"; 

import { createContext, useState } from "react";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, setState] = useState("some value");

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}
