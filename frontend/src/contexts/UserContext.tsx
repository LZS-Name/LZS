import React from "react";

interface AppContextInterface {
  userIsAdmin: boolean;
  setUserIsAdminFn: (value: boolean) => void;
}

const UserContext = React.createContext<AppContextInterface>(
  {} as AppContextInterface
);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [userIsAdmin, setUserIsAdmin] = React.useState(false);

  const setUserIsAdminFn = (value: boolean) => {
    setUserIsAdmin(value);
  };

  return (
    <UserContext.Provider value={{ userIsAdmin, setUserIsAdminFn }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return React.useContext(UserContext);
};

export { UserProvider, useUserContext, UserContext };
