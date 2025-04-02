import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CookieConsent = ({ onAccept }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        const consent = localStorage.getItem("token");
        if (!consent) {
            setShowPopup(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("token", "true");
        setShowPopup(false);
        onAccept();
    };

  return (
    showPopup && (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-4 rounded-lg shadow-lg w-11/12 sm:w-96 flex items-center justify-between">
            <p className="text-sm">This site uses cookies to improve user experience.</p>
            <button onClick={handleAccept} className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Accept
            </button>
        </motion.div>
    )
  )
}

export default CookieConsent