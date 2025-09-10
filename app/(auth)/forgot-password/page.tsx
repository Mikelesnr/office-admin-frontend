"use client";

import { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import api from "@/lib/api";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/forgot-password", { email });
      toast.success("Password reset link sent");
    } catch {
      toast.error("Failed to send reset link");
    }
  };

  return (
    <div>
      <TextInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button fullWidth mt="md" onClick={handleSubmit}>
        Send Reset Link
      </Button>
    </div>
  );
}
