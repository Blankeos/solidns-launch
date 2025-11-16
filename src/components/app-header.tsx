import { useRouter } from "@/router"
import { useAuthContext } from "~/features/auth/auth.context"

interface AppHeaderProps {
  title?: string
}

export function AppHeader(props: AppHeaderProps) {
  const { user } = useAuthContext

  const router = useRouter()
  return (
    <flexboxlayout class="border-gray-200 border-b px-6 py-4">
      <flexboxlayout class="w-full">
        {/* Logo/App Name */}
        <flexboxlayout alignItems="center">
          <label class="mr-2 flex h-8 w-8 items-center justify-center rounded-md bg-blue-500">
            <label class="font-bold text-sm text-white">S</label>
          </label>
          <label class="font-bold text-indigo-800 text-xl">SolidApp</label>
        </flexboxlayout>

        <stacklayout class="flex-1" alignSelf="stretch" />

        {/* User Profile */}
        <flexboxlayout alignItems="center">
          {user() ? (
            <label class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
              <label class="text-gray-600 text-sm">👤</label>
            </label>
          ) : (
            <button
              class="text-gray-500 text-sm"
              on:tap={() => {
                router.navigate("SignIn", { noHeader: true })
              }}
            >
              Sign In
            </button>
          )}
        </flexboxlayout>
      </flexboxlayout>
    </flexboxlayout>
  )
}
