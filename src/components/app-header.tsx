import { useRouter } from "solid-navigation";
import { useAuthContext } from "~/features/auth/auth.context";

interface AppHeaderProps {
  title?: string;
}

export function AppHeader(props: AppHeaderProps) {
  const { user } = useAuthContext;

  const router = useRouter();
  return (
    <flexboxlayout class="px-6 py-4 border-b border-gray-200">
      <flexboxlayout class="w-full">
        {/* Logo/App Name */}
        <flexboxlayout alignItems="center">
          <label class="w-8 h-8 mr-2 bg-blue-500 rounded-md flex items-center justify-center">
            <label class="text-white font-bold text-sm">S</label>
          </label>
          <label class="text-xl font-bold text-blue-500">SolidNS</label>
        </flexboxlayout>

        <stacklayout class="flex-1" alignSelf="stretch" />

        {/* User Profile */}
        <flexboxlayout alignItems="center">
          {user() ? (
            <label class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <label class="text-gray-600 text-sm">👤</label>
            </label>
          ) : (
            <button
              class="text-sm text-gray-500"
              on:tap={() => {
                router.navigate("SignIn", { noHeader: true });
              }}
            >
              Sign In
            </button>
          )}
        </flexboxlayout>
      </flexboxlayout>
    </flexboxlayout>
  );
}
