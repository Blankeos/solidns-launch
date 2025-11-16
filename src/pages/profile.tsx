import { createMemo, For, Show } from "solid-js"
import { useRoute, useRouter } from "@/router"
import { QuickAction } from "~/components/quick-action"
import { useAuthContext } from "~/features/auth/auth.context"

export default function Profile() {
  const route = useRoute()
  const router = useRouter()
  const { user, logout } = useAuthContext

  const userName = createMemo(() => {
    const currentUser = user()
    return currentUser?.metadata?.name ?? (currentUser?.email?.split("@")[0] || "User")
  })

  const userStats = createMemo(() => {
    return {
      joined: "2024",
      projects: 3,
      tasksCompleted: 1250,
    }
  })

  const profileActions = createMemo(() => {
    const actions = [
      {
        icon: "👤",
        title: "Edit Profile",
        subtitle: "Update your personal information",
        onTap: () => console.log("Edit Profile tapped"),
        hide: !user(),
      },
      {
        icon: "🔒",
        title: "Security",
        subtitle: "Change password and security settings",
        onTap: () => console.log("Security tapped"),
        hide: !user(),
      },
      {
        icon: "🔔",
        title: "Notifications",
        subtitle: "Manage notification preferences",
        onTap: () => console.log("Notifications tapped"),
        hide: !user(),
      },
      {
        icon: "🎨",
        title: "Appearance",
        subtitle: "Customize app theme and layout",
        onTap: () => console.log("Appearance tapped"),
        hide: !user(),
      },
      {
        icon: "🔑",
        title: "Login",
        subtitle: "Sign in to your account",
        onTap: () => router.navigate("SignIn"),
        hide: !!user(),
      },
    ]
    return actions.filter((action) => !action.hide)
  })

  return (
    <gridlayout class="" rows="auto, *, 90">
      {/* Header */}
      <flexboxlayout class="border-gray-200 border-b bg-white px-6 py-6" flexDirection="column">
        <label class="font-bold font-inst text-2xl text-gray-900">Profile</label>
        <label class="mt-1 text-gray-600">Manage your account settings</label>
      </flexboxlayout>

      <scrollview row="1">
        <stacklayout class="px-6 py-6">
          {/* User Info */}
          <stacklayout class="mb-8 items-center">
            <Show
              when={user()}
              fallback={
                <label class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-3xl"></label>
              }
            >
              <image
                src={user()?.metadata?.avatar_url}
                class="mb-4 h-20 w-20 rounded-full bg-gray-200"
              />
            </Show>
            <label class="font-semibold text-gray-900 text-xl">{userName()}</label>
            <label class="mt-1 text-gray-600">{user()?.email || "Not signed in"}</label>
          </stacklayout>

          {/* Stats */}
          <gridlayout orientation="horizontal" class="mb-8 gap-4" columns="*, *, *">
            <stacklayout
              column="0"
              class="flex-1 items-center rounded-lg bg-white p-4 text-center"
              horizontalAlignment="center"
            >
              <label class="font-bold text-2xl text-indigo-600">{userStats().joined}</label>
              <label class="mt-1 text-gray-600 text-sm">Joined</label>
            </stacklayout>
            <stacklayout
              column="1"
              class="flex-1 items-center rounded-lg bg-white p-4 text-center"
              horizontalAlignment="center"
            >
              <label class="font-bold text-2xl text-indigo-600">{userStats().projects}</label>
              <label class="mt-1 text-gray-600 text-sm">Projects</label>
            </stacklayout>
            <stacklayout
              column="2"
              class="flex-1 items-center rounded-lg bg-white p-4 text-center"
              horizontalAlignment="center"
            >
              <label class="font-bold text-2xl text-indigo-600">{userStats().tasksCompleted}</label>
              <label class="mt-1 text-gray-600 text-sm">Tasks</label>
            </stacklayout>
          </gridlayout>

          {/* Profile Actions */}
          <label class="mb-4 font-semibold text-gray-900 text-xl">Account</label>
          <stacklayout class="mb-8 gap-3">
            <For each={profileActions()}>
              {(action) => (
                <QuickAction
                  class="mb-2"
                  icon={action.icon}
                  title={action.title}
                  subtitle={action.subtitle}
                  onTap={action.onTap}
                />
              )}
            </For>
          </stacklayout>

          {/* Sign Out */}
          <Show when={user()}>
            <button
              class="rounded-lg border border-red-200 bg-red-50 px-6 py-4 font-medium text-red-600"
              on:tap={() => {
                logout.run()
              }}
            >
              Sign Out
            </button>
          </Show>
        </stacklayout>
      </scrollview>

      {/* Content */}
    </gridlayout>
  )
}
