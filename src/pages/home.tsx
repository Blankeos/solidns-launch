import { Show, createSignal } from "solid-js";
import { useRoute, useRouter } from "solid-navigation";
import { useAuthContext } from "~/features/auth/auth.context";

export default function Home() {
  const route = useRoute();
  const [inputValue, setInputValue] = createSignal("");

  const router = useRouter();

  const { counter, setCounter } = useAuthContext;

  const { user, loading, logout, googleLogin } = useAuthContext;

  return (
    <>
      <actionbar title={route.name} />
      <stacklayout style={{ padding: 20 }}>
        <label
          height="200"
          style={{
            fontSize: 20,
            horizontalAlignment: "center",
            marginBottom: 20,
          }}
        >
          <formattedstring>
            <span
              className="fas"
              text={String.fromCharCode(0xf135)}
              style={{
                color: "#3A53FF",
              }}
            />
            <span text=" Blank SolidJS App" />
          </formattedstring>
        </label>

        <label horizontalAlignment="center" height="30">
          User: {JSON.stringify(user())}
        </label>

        <label horizontalAlignment="center" height="30">
          {/*Battery: {JSON.stringify(UIDevice.currentDevice.batteryLevel * 100)}*/}
        </label>

        <label height="20" />

        <label horizontalAlignment="center" height="30">
          You have typed: {JSON.stringify(inputValue())}
        </label>

        <label height="20" />

        <textfield
          text={inputValue()}
          on:textChange={(e: any) => {
            setInputValue(e.value);
          }}
          hint="Enter text here"
          style={{
            fontSize: 18,
            marginBottom: 10,
          }}
        />
        <button
          text="Submit"
          class="bg-green-500 rounded-md text-white mb-5 text-lg"
          on:tap={() => console.log("Input value:", inputValue())}
        />
        <button
          class="bg-blue-500 rounded-md text-white mb-2 text-lg"
          on:tap={() => {
            setCounter(() => counter() + 1);
          }}
        >
          Increase {counter()}
        </button>
        <button
          class="text-lg"
          on:tap={() => {
            router.navigate("Onboarding", {
              clearHistory: true,
              noHeader: true,
            });
          }}
        >
          Go to onboarding
        </button>

        <Show when={!loading() && !user()}>
          <button
            class="text-lg active:scale-95 transition"
            on:tap={() => {
              router.navigate("SignIn", { noHeader: true });
            }}
          >
            Go to signin
          </button>
        </Show>

        <Show when={!loading() && user()}>
          <button
            on:tap={() => {
              logout.run();
            }}
            class="bg-red-500 text-white rounded-md text-lg"
          >
            Logout
          </button>
        </Show>
      </stacklayout>
    </>
  );
}
