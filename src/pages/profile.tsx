import { useRoute, useRouter } from "@/router";
import { For, Show, createMemo } from "solid-js";
import { QuickAction } from "~/components/quick-action";
import { useAuthContext } from "~/features/auth/auth.context";

export default function Profile() {
  const route = useRoute();
  const router = useRouter();
  const { user, logout } = useAuthContext;

  const userName = createMemo(() => {
    const currentUser = user();
    return (
      currentUser?.metadata?.name ??
      (currentUser?.email?.split("@")[0] || "User")
    );
  });

  const userStats = createMemo(() => {
    return {
      joined: "2024",
      projects: 3,
      tasksCompleted: 1250,
    };
  });

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
    ];
    return actions.filter((action) => !action.hide);
  });

  return (
    <gridlayout class="" rows="auto, *, 90">
      {/* Header */}
      <flexboxlayout
        class="px-6 py-6 bg-white border-b border-gray-200"
        flexDirection="column"
      >
        <label class="text-2xl font-bold text-gray-900 font-inst">
          Profile
        </label>
        <label class="text-gray-600 mt-1">Manage your account settings</label>
      </flexboxlayout>

      <scrollview row="1">
        <stacklayout class="px-6 py-6">
          {/* User Info */}
          <stacklayout class="items-center mb-8">
            <Show
              when={user()}
              fallback={
                <label class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl mb-4"></label>
              }
            >
              <image
                src={user()?.metadata?.avatar_url}
                class="w-20 h-20 rounded-full mb-4 bg-gray-200"
              />
            </Show>
            <label class="text-xl font-semibold text-gray-900">
              {userName()}
            </label>
            <label class="text-gray-600 mt-1">
              {user()?.email || "Not signed in"}
            </label>
          </stacklayout>

          {/* Stats */}
          <gridlayout
            orientation="horizontal"
            class="gap-4 mb-8"
            columns="*, *, *"
          >
            <stacklayout
              column="0"
              class="flex-1 items-center bg-white rounded-lg p-4 text-center"
              horizontalAlignment="center"
            >
              <label class="text-2xl font-bold text-indigo-600">
                {userStats().joined}
              </label>
              <label class="text-sm text-gray-600 mt-1">Joined</label>
            </stacklayout>
            <stacklayout
              column="1"
              class="flex-1 items-center bg-white rounded-lg p-4 text-center"
              horizontalAlignment="center"
            >
              <label class="text-2xl font-bold text-indigo-600">
                {userStats().projects}
              </label>
              <label class="text-sm text-gray-600 mt-1">Projects</label>
            </stacklayout>
            <stacklayout
              column="2"
              class="flex-1 items-center bg-white rounded-lg p-4 text-center"
              horizontalAlignment="center"
            >
              <label class="text-2xl font-bold text-indigo-600">
                {userStats().tasksCompleted}
              </label>
              <label class="text-sm text-gray-600 mt-1">Tasks</label>
            </stacklayout>
          </gridlayout>

          {/* Profile Actions */}
          <label class="text-xl font-semibold text-gray-900 mb-4">
            Account
          </label>
          <stacklayout class="gap-3 mb-8">
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
              class="bg-red-50 text-red-600 font-medium py-4 px-6 rounded-lg border border-red-200"
              on:tap={() => {
                logout.run();
              }}
            >
              Sign Out
            </button>
          </Show>
        </stacklayout>
      </scrollview>

      {/* Content */}
    </gridlayout>
  );
}
