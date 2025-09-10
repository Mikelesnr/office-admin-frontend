import { Suspense } from "react";
import VerifiedPage from "@/components/auth/VerifiedPage";

export default function VerifiedRoutePage() {
  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading verification...</p>}
    >
      <VerifiedPage />
    </Suspense>
  );
}
