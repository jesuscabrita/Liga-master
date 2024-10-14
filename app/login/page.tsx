"use client";
import { FormLogin } from "@/components/Login/FormLogin";
import { SecurityLogin } from "@/components/Security/SecurityLogin";

const ProtectedLogin = SecurityLogin(FormLogin);

export default function Login() {   
    return <ProtectedLogin/>;
}
