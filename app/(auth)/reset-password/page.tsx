"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TextInput, Button } from "@mantine/core";
import api from "@/lib/api";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation: confirm,
      });
      toast.success("Password reset successful");
    } catch {
      toast.error("Reset failed");
    }
  };

  return (
    <div>
      <TextInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        label="Confirm Password"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <Button fullWidth mt="md" onClick={handleSubmit}>
        Reset Password
      </Button>
    </div>
  );
}
