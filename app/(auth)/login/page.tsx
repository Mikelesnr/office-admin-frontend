"use client";

import { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => login(email, password);

  return (
    <div>
      <TextInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button fullWidth mt="md" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}
