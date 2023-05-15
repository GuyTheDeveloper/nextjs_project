"use client";

type Props = {
  children: React.ReactNode;
  session?: any;
};

import { SessionProvider } from "next-auth/react";

const Provider: React.FC<Props> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
