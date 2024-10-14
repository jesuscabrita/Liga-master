"use client";
import { PanelEquiposAdmin } from "@/components/PanelEquipos/PanelEquiposAdmin";
import { SecurityAdmin } from "@/components/Security/SecurityAdmin";

const ProtectedPanelEquiposAdmin = SecurityAdmin(PanelEquiposAdmin);

export default function PanelEquipos() {
    return  <ProtectedPanelEquiposAdmin/>
    
}