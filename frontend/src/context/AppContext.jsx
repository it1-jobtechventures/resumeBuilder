import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = "http://localhost:5000";
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Initialize state from localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    const value = {
        backendUrl,
        isLoggedIn, 
        setIsLoggedIn,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}