"use client";

import React from "react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      redirect("/login");
    }
  }, [session, status]);

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      Start prompting.
    </div>
  );
}
