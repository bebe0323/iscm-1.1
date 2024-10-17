"use client";

import { LogOut } from "lucide-react";
import { signout } from "../actions/auth";

export default function SignoutButton() {
  return (
    <button onClick={() => signout} className="navbar-element w-full">
      <LogOut className="navbar-icon" />
      <p>Sign out</p>
    </button>
  )
}