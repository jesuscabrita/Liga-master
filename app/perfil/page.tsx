"use client";
import { PerfilInfo } from "@/components/Perfil/PerfilInfo";
import { SecurityUser } from "@/components/Security/SecurityUser";

const ProtectedUser = SecurityUser(PerfilInfo);

export default function Perfil() {
    return <ProtectedUser/>
}