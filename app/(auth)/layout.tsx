import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Pages",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ maxWidth: 480, margin: "auto", padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Authentication</h2>
      <div>{children}</div>
    </div>
  );
}
