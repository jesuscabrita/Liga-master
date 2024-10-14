"use client";
import { SecurityAdmin } from "@/components/Security/SecurityAdmin";
import { AdminUsuarios } from "@/components/Usuarios/AdminUsuarios";

const ProtectedAdminUsuarios = SecurityAdmin(AdminUsuarios);

export default function Usuarios() {
    return <ProtectedAdminUsuarios />;
}