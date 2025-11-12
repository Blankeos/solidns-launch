import { createSignal, Show } from "solid-js";
import { useAuthContext } from "./auth.context";

export function OTPForm() {
  const { otpVerify, otpSend } = useAuthContext;

  const [code, setCode] = createSignal("");
  const [hasSent, setHasSent] = createSignal(false);
  const [userId, setUserId] = createSignal("");
  const [email, setEmail] = createSignal("");

  const handleOTPSend = async () => {
    const result = await otpSend.run({ email: email() });
    if (result?.userId) {
      setUserId(result.userId!);
      setHasSent(true);
    }
  };

  const handleOTPVerify = async () => {
    await otpVerify.run({ userId: userId(), code: code() });
  };

  return (
    <stacklayout class="w-full max-w-xs flex-col gap-y-3">
      <textfield
        hint="Email"
        text={email()}
        on:textChange={(args) => {
          setEmail(args.value);
          // console.log("carll", args.value);
          // setEmail((args.value as string).toLowerCase());
        }}
        class="p-4 border border-gray-300 rounded"
        autocapitalizationtype="none"
      />
      <Show
        when={hasSent()}
        fallback={
          <button
            text="Send OTP"
            on:tap={handleOTPSend}
            class="p-4 bg-blue-500 text-white rounded"
          />
        }
      >
        <textfield
          hint="OTP Code"
          text={code()}
          on:textChange={(args) => setCode(args.value)}
          class="p-4 border border-gray-300 rounded"
        />
        <button
          text="Verify OTP"
          on:tap={handleOTPVerify}
          class="p-4 bg-blue-500 text-white rounded"
        />
      </Show>
    </stacklayout>
  );
}
