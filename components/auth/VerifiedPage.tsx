"use client";

import { useSearchParams } from "next/navigation";
import { Container, Paper, Text } from "@mantine/core";

export default function VerifiedPage() {
  const params = useSearchParams();
  const verified = params.get("verified");
  const name = params.get("name");

  const isVerified = verified === "1";

  return (
    <Container size="sm" mt="xl">
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Text ta="center" size="xl" fw={700} mb="md">
          Email Verification
        </Text>

        {isVerified ? (
          <Text ta="center" size="md" c="green">
            ✅{" "}
            {name
              ? `Thanks, ${name}! Your email has been verified successfully.`
              : "Your email has been verified successfully."}
          </Text>
        ) : (
          <Text ta="center" size="md" c="red">
            ❌ Verification failed or link is invalid.
          </Text>
        )}
      </Paper>
    </Container>
  );
}
