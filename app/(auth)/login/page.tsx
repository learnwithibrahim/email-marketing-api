import { LoginForm } from "./login-form";

export const metadata = { title: "Login - MailPilot" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string; reset?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <LoginForm verified={params.verified === "true"} reset={params.reset === "true"} />
    </div>
  );
}