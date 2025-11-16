import { useAuthContext } from "~/features/auth/auth.context"
import { OTPForm } from "~/features/auth/otp-form"
import { handleTouchScaleAnimation } from "~/lib/touch-animations"

export function SignInPage() {
  const { counter, googleLogin, githubLogin } = useAuthContext

  return (
    <stacklayout class="h-full bg-linear-to-b from-indigo-50 to-white px-6 py-10">
      <stacklayout class="mx-auto w-full max-w-md items-center gap-y-10">
        <label class="mb-8 text-center font-bold font-inst text-4xl">Welcome Back!</label>

        <stacklayout class="w-full rounded-2xl border border-gray-100 bg-white p-8">
          <label class="mb-1 text-center font-medium text-xl">Sign In</label>
          <label class="mb-8 text-center text-gray-500 text-sm">Access your account securely</label>

          <OTPForm />

          <stacklayout class="my-6 flex-row items-center">
            {/*<stacklayout class="flex-1 h-px bg-gray-200"></stacklayout>*/}
            <label class="px-4 py-4 text-gray-400 text-sm" horizontalAlignment="center">
              or continue with
            </label>
            {/*<stacklayout class="flex-1 h-px bg-gray-200"></stacklayout>*/}
          </stacklayout>

          <stacklayout
            class="w-full flex-row items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-4 transition-all hover:bg-gray-50"
            on:tap={async () => googleLogin.run({})}
            orientation="horizontal"
            horizontalAlignment="center"
            on:touch={handleTouchScaleAnimation}
          >
            <image src="~/assets/icons/google.png" class="mr-3 h-6 w-6" height={20} />
            <label>Google</label>
          </stacklayout>

          <stacklayout class="mb-4" />

          <stacklayout
            class="w-full flex-row items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-4 transition-all hover:bg-gray-50"
            on:tap={async () => githubLogin.run({})}
            orientation="horizontal"
            horizontalAlignment="center"
            on:touch={handleTouchScaleAnimation}
          >
            <image src="~/assets/icons/github.png" class="mr-3 h-6 w-6" height={20} />
            <label>GitHub</label>
          </stacklayout>
        </stacklayout>
      </stacklayout>
    </stacklayout>
  )
}
