import React, {createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PATH from './PATH';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [aura, setAura] = useState(0);
    
    const { isAuthenticated, user } = useAuth0();

    useEffect(
        () => {
            const fetchAura = async () => {
                if(!isAuthenticated){
                    setAura(0);
                }

                try{
                    const response = await fetch(`${PATH}/aura`, {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            username: user.email
                        })
                    })

                    let data = await response.json;
                    setAura(data.aura)
                }catch(err){
                    console.error("Error fetching aura");
                    setAura(0);
                }
            }
            fetchAura();
        }, [isAuthenticated, user.email]
    )

    return(
        <UserContext.Provider value={{aura, setAura}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);