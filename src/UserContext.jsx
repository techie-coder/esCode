import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [aura, setAura] = useState(0);
    const [currentTab, setCurrentTab] = useState("");

    return(
        <UserContext.Provider value={{aura, setAura, currentTab, setCurrentTab}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);