"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  if (!session.data?.user) {
    return <div>user is not sign in </div>;
  }
  return <div>user is sign in {JSON.stringify(session.data.user)}</div>;
}
