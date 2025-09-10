// app/(auth)/reset-password/page.tsx
import { Suspense } from "react";
import { Container, Paper, Text } from "@mantine/core";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Container size="sm" mt="xl">
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Text ta="center" size="xl" fw={700} mb="md">
          Reset Your Password
        </Text>

        <Suspense fallback={<Text ta="center">Loading form...</Text>}>
          <ResetPasswordForm />
        </Suspense>
      </Paper>
    </Container>
  );
}
