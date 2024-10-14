import { ButtonNavbarProps } from "@/interfaces";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export const ButtonNavbar: React.FC<ButtonNavbarProps> = ({ title, href, handleOpenRuta, mobile, light }) => {
    const asPath = usePathname()
    const isActive = asPath === href;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={href}>
            <button
                onClick={mobile ? handleOpenRuta : undefined}
                aria-current={isActive ? "page" : undefined}
                title={`Enlace a ${href}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                rel="noopener noreferrer"
                style={{
                    display: "flex",
                    padding: "8px 12px 8px 12px",
                    fontSize: mobile ? "12px" : '14px',
                    background: isHovered ? (light ? "rgb(43, 52, 67)" : "#aab4be") : "transparent",
                    color: isActive ? "var(--marcaRed)" : isHovered ? (light ? "#aab4be" : "rgb(43, 52, 67)") : light ? "var(--dark2)" : "#aab4be",
                    textDecoration: "none",
                    cursor: "pointer",
                    letterSpacing: '2px',
                    fontWeight: light ? '900' : '400',
                    height: !mobile ? '64px' : '',
                    width: !mobile ? '110px' : '100%',
                    transition: "background 0.3s ease",
                    alignItems: 'center',
                    justifyContent: mobile ? 'start' : 'center'
                }}
            >
                {title}
            </button>
        </Link>
    );
};