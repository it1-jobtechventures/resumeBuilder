import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = "https://resumebuilder-backend-utic.onrender.com";
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Initialize state from localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

      // Temporary User ID (24-character)
  const [temporaryUserId, setTemporaryUserId] = useState(null);

    // ✅ Add this line for resumeId
    const [activeResumeId, setActiveResumeId] = useState(localStorage.getItem("activeResumeId") || null);

      // Save to localStorage when resumeId changes
  useEffect(() => {
    if (activeResumeId) {
      localStorage.setItem("activeResumeId", activeResumeId);
    }
  }, [activeResumeId]);

  console.log("appcontect" ,activeResumeId)

   // Generate Random 24-character ID
    const generateTempId = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 24; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    // Set or Get Temporary User ID
    useEffect(() => {
        const existingTempId = localStorage.getItem("temporaryUserId");
        if (existingTempId) {
            setTemporaryUserId(existingTempId);
        } else {
            const newTempId = generateTempId();
            localStorage.setItem("temporaryUserId", newTempId);
            setTemporaryUserId(newTempId);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    const value = {
        backendUrl,
        isLoggedIn, 
        setIsLoggedIn,
        temporaryUserId,
        activeResumeId,
        setActiveResumeId,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}