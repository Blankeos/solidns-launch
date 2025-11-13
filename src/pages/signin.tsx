import { useAuthContext } from "~/features/auth/auth.context";
import { OTPForm } from "~/features/auth/otp-form";
import { handleTouchScaleAnimation } from "~/lib/touch-animations";

export function SignInPage() {
  const { counter, googleLogin, githubLogin } = useAuthContext;

  return (
    <stacklayout class="h-full bg-linear-to-b from-indigo-50 to-white px-6 py-10">
      <stacklayout class="mx-auto w-full max-w-md items-center gap-y-10">
        <label class="text-4xl font-bold text-center mb-8 font-inst">
          Welcome Back!
        </label>

        <stacklayout class="w-full bg-white rounded-2xl  p-8 border border-gray-100">
          <label class="text-xl font-medium text-center mb-1">Sign In</label>
          <label class="text-sm text-gray-500 text-center mb-8">
            Access your account securely
          </label>

          <OTPForm />

          <stacklayout class="flex-row items-center my-6">
            {/*<stacklayout class="flex-1 h-px bg-gray-200"></stacklayout>*/}
            <label
              class="px-4 text-gray-400 text-sm py-4"
              horizontalAlignment="center"
            >
              or continue with
            </label>
            {/*<stacklayout class="flex-1 h-px bg-gray-200"></stacklayout>*/}
          </stacklayout>

          <stacklayout
            class="w-full py-4 px-4 bg-white border border-gray-300 rounded-xl flex-row items-center justify-center gap-3 hover:bg-gray-50 transition-all"
            on:tap={async () => googleLogin.run({})}
            orientation="horizontal"
            horizontalAlignment="center"
            on:touch={handleTouchScaleAnimation}
          >
            <image
              src="~/assets/icons/google.png"
              class="w-6 h-6 mr-3"
              height={20}
            />
            <label>Google</label>
          </stacklayout>

          <stacklayout class="mb-4" />

          <stacklayout
            class="w-full py-4 px-4 bg-white border border-gray-300 rounded-xl flex-row items-center justify-center gap-3 hover:bg-gray-50 transition-all"
            on:tap={async () => githubLogin.run({})}
            orientation="horizontal"
            horizontalAlignment="center"
            on:touch={handleTouchScaleAnimation}
          >
            <image
              src="~/assets/icons/github.png"
              class="w-6 h-6 mr-3"
              height={20}
            />
            <label>GitHub</label>
          </stacklayout>
        </stacklayout>
      </stacklayout>
    </stacklayout>
  );
}
