import { createSignal, Show } from "solid-js"
import { useRouter } from "@/router"
import { useAuthContext } from "./auth.context"

export function OTPForm() {
  const { otpVerify, otpSend } = useAuthContext

  const [code, setCode] = createSignal("")
  const [hasSent, setHasSent] = createSignal(false)
  const [userId, setUserId] = createSignal("")
  const [email, setEmail] = createSignal("")

  const router = useRouter()

  const handleOTPSend = async () => {
    const result = await otpSend.run({ email: email() })
    if (result?.userId) {
      setUserId(result.userId!)
      setHasSent(true)
    }
  }

  const handleOTPVerify = async () => {
    const result = await otpVerify.run({ userId: userId(), code: code() })
    if (result) {
      router.navigate("Home", { clearHistory: true, animated: false })
    }
  }

  return (
    <stacklayout class="w-full max-w-xs flex-col gap-y-3">
      <textfield
        hint="Email"
        text={email()}
        keyboardType="email"
        on:textChange={(args) => {
          setEmail(args.value)
          // console.log("carll", args.value);
          // setEmail((args.value as string).toLowerCase());
        }}
        class="mb-3 rounded border border-gray-300 p-4"
        autocapitalizationtype="none"
      />
      <Show
        when={hasSent()}
        fallback={
          <button
            text="Send OTP"
            on:tap={handleOTPSend}
            class="rounded bg-blue-500 p-4 text-white"
          />
        }
      >
        <textfield
          hint="OTP Code"
          text={code()}
          keyboardType="integer"
          on:textChange={(args) => setCode(args.value)}
          class="mb-3 rounded border border-gray-300 p-4"
        />
        <button
          text="Verify OTP"
          on:tap={handleOTPVerify}
          class="rounded bg-blue-500 p-4 text-white"
        />
      </Show>
    </stacklayout>
  )
}
