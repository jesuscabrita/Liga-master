"use client";
import { PanelPartidos } from "@/components/PanelPartidos/PanelPartidos";
import { SecurityAuth } from "@/components/Security/SecurityAuth";

const ProtectedPanel = SecurityAuth(PanelPartidos);

export default function Panel() {
    return <ProtectedPanel />
}