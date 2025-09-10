"use client";

import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      {user ? (
        <h1>Welcome, {user.name}! 🎉 You are logged in.</h1>
      ) : (
        <h1>Welcome to the app. Please log in or sign up.</h1>
      )}
    </main>
  );
}
