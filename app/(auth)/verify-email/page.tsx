import { VerifyForm } from "./verify-form"

export const metadata = { title: "Verify Email - Funurex" }

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const params = await searchParams
  return <VerifyForm email={params.email || ""} />
}
