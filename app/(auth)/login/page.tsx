import { LoginForm } from "./login-form"
import { Mail } from "lucide-react" 

export const metadata = { title: "Login - MailPilot" }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string; reset?: string }>
}) {
  const params = await searchParams

  return (
    <div className=" p-16 w-[600px] border-[1px]">
          <LoginForm verified={params.verified === "true"} reset={params.reset === "true"} />
      
    </div>
  )
}