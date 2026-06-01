import { SignUp } from "@clerk/nextjs";
import { authFormAppearance } from "@/lib/clerkAppearance";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <SignUp appearance={authFormAppearance} />
    </main>
  );
}
