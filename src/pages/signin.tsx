import { useAuthContext } from "~/features/auth/auth.context";
import { OTPForm } from "~/features/auth/otp-form";

export function SignInPage() {
  const { counter, setCounter } = useAuthContext;

  return (
    <stacklayout class="h-full">
      <stacklayout class="mx-auto w-full max-w-xl items-center gap-y-5">
        <label class="text-3xl font-medium">Sign In {counter()}</label>

        <OTPForm />
      </stacklayout>
    </stacklayout>
  );
}
