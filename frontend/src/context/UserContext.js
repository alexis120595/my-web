// Archivo para crear el contexto del usuario y proveerlo a la aplicación
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto del usuario
export const UserContext = createContext();

// Proveedor del contexto del usuario
export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);
// función para guardar el email del usuario en el local storage del navegador

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    } else {
      localStorage.removeItem('userEmail');
    }
  }, [userEmail]);
{}
  return (
    
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};