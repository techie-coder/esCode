import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [aura, setAura] = useState(10);

    return(
        <UserContext.Provider value={{aura, setAura}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);