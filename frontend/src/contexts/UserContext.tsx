import React, { useEffect } from "react";

interface AppContextInterface {
  userRole: string;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = React.createContext<AppContextInterface>(
  {} as AppContextInterface
);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [userRole, setUserRole] = React.useState("user");

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return React.useContext(UserContext);
};

export { UserProvider, useUserContext, UserContext };
