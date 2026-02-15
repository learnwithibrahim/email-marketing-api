import { ResetPasswordForm } from "./reset-form"

export const metadata = { title: "Reset Password - MailPilot" }

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const params = await searchParams
  return <ResetPasswordForm email={params.email || ""} />
}
