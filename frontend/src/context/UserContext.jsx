import { createContext, useState, useContext } from "react";

// 1. Create Context
const UserContext = createContext();

// 2. Create Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  // user will contain { id, name, email, role, token }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom Hook (clean usage)
export const useUser = () => {
  return useContext(UserContext);
};