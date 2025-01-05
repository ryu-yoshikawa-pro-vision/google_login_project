"use client";

import React from "react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/");
    }
  }, [session, status]);

  const handleLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    const result = await signIn(provider);

    if (result) {
      redirect("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form className="w-full max-w-xs space-y-6 rounded bg-white p-8 shadow-md">
        <button
          onClick={handleLogin("google")}
          type="button"
          className="w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Googleでログイン
        </button>
      </form>
    </div>
  );
};

export default LoginPage;