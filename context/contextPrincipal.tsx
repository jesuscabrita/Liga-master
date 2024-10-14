import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

type ContextType = [boolean, Dispatch<SetStateAction<boolean>>];

const Context = createContext<ContextType>([false, () => { }]);

export const InfoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const verifyLight = typeof window !== "undefined" ? localStorage.getItem("light") : null;
    const [light, setLight] = useState<boolean>(verifyLight === "false" ? false : true);

    useEffect(() => {
        const bodyElement = document.querySelector("body");
        if (bodyElement) {
            if (light) {
                bodyElement.style.setProperty("--bg-color", "var(--light)");
            } else {
                bodyElement.style.setProperty("--bg-color", "var(--dark4)");
            }
        }
    }, [light]);

    return (
        <Context.Provider value={[light, setLight]}>
            {children}
        </Context.Provider>
    );
};

export default Context;