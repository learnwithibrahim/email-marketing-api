import { LoginForm } from "./login-form"

export const metadata = { title: "Login - MailPilot" }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string; reset?: string }>
}) {
  const params = await searchParams

  return (
    <LoginForm verified={params.verified === "true"} reset={params.reset === "true"} />
  )
}
