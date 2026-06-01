import { SignIn } from "@clerk/nextjs";
import { authFormAppearance } from "@/lib/clerkAppearance";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <SignIn appearance={authFormAppearance} />
    </main>
  );
}
