"use client";

import { useState } from "react";
import { Container, Paper, Text, Button, Center } from "@mantine/core";
import api from "@/lib/api";
import { toast } from "react-toastify";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      await api.post("/email/verification-notification");
      toast.success("Verification email sent");
      setSent(true);
    } catch {
      toast.error("Failed to send verification email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Text ta="center" size="lg" fw={500} mb="sm">
          Resend Verification Email
        </Text>
        <Text ta="center" c="dimmed" mb="lg">
          If you haven’t received the verification email, click below to resend
          it.
        </Text>
        <Center>
          <Button onClick={handleResend} loading={loading} disabled={sent}>
            {sent ? "Email Sent" : "Resend Email"}
          </Button>
        </Center>
        {sent && (
          <Text ta="center" mt="md" c="green">
            Please check your inbox. If it doesn’t arrive soon, try again later.
          </Text>
        )}
      </Paper>
    </Container>
  );
}
