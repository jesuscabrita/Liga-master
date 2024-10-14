import { ReactNode, useEffect, useState } from "react";

const ClientOnly = ({ children }: { children: ReactNode; }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return <>{children}</>;
};

export default ClientOnly;