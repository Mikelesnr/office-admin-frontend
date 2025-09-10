"use client";

import { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { useAuth } from "@/context/AuthContext";
import { RegisterPayload } from "@/types";

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState<RegisterPayload>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleRegister = () => register(form);

  return (
    <div>
      <TextInput
        label="Name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
      />
      <TextInput
        label="Email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <TextInput
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
      />
      <TextInput
        label="Confirm Password"
        type="password"
        value={form.password_confirmation}
        onChange={(e) =>
          setForm((f) => ({ ...f, password_confirmation: e.target.value }))
        }
      />
      <Button fullWidth mt="md" onClick={handleRegister}>
        Register
      </Button>
    </div>
  );
}
