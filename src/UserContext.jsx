import React, {createContext, useState, useContext} from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [aura, setAura] = useState(0);

    return(
        <UserContext.Provider value={{aura, setAura}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);