import { Show } from "solid-js"
import { useRoute } from "@/router"
import { QuickAction } from "~/components/quick-action"
import { useAuthContext } from "~/features/auth/auth.context"

export default function More() {
  const route = useRoute()
  const { user } = useAuthContext

  const moreOptions = [
    {
      icon: "⚙️",
      title: "Settings",
      subtitle: "App configuration and preferences",
      onTap: () => console.log("Settings tapped"),
    },
    {
      icon: "📋",
      title: "Terms of Service",
      subtitle: "Read our terms and conditions",
      onTap: () => console.log("Terms tapped"),
    },
    {
      icon: "🔒",
      title: "Privacy Policy",
      subtitle: "View our privacy practices",
      onTap: () => console.log("Privacy tapped"),
    },
    {
      icon: "📧",
      title: "Contact Support",
      subtitle: "Get help from our support team",
      onTap: () => console.log("Support tapped"),
    },
    {
      icon: "⭐",
      title: "Rate App",
      subtitle: "Share your feedback with us",
      onTap: () => console.log("Rate tapped"),
    },
    {
      icon: "📱",
      title: "About",
      subtitle: "Learn more about this application",
      onTap: () => console.log("About tapped"),
    },
  ]

  return (
    <stacklayout class="min-h-full bg-gray-50">
      {/* Header */}
      <stacklayout class="border-gray-200 border-b bg-white px-6 py-6">
        <label class="font-bold font-inst text-2xl text-gray-900">More</label>
        <label class="mt-1 text-gray-600">Additional options and settings</label>
      </stacklayout>

      {/* Content */}
      <scrollview>
        <stacklayout class="px-6 py-6">
          {/* App Info */}
          <stacklayout class="mb-8 items-center">
            <label class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl">
              📱
            </label>
            <label class="font-semibold text-gray-900 text-xl">Solid App</label>
            <label>Nice</label>
            <label class="mt-1 text-gray-600">Version 1.0.0</label>
            <Show when={user()}>
              <label class="mt-2 rounded-full bg-indigo-50 px-3 py-1 text-indigo-600 text-sm">
                {user()?.email}
              </label>
            </Show>
          </stacklayout>

          {/* Options List */}
          <stacklayout class="gap-2">
            {moreOptions.map((option) => (
              <QuickAction
                icon={option.icon}
                title={option.title}
                subtitle={option.subtitle}
                onTap={option.onTap}
              />
            ))}
          </stacklayout>

          {/* Legal Footer */}
          <stacklayout class="mt-8 items-center border-gray-200 border-t pt-6">
            <label class="text-gray-500 text-sm">© 2024 SolidApp. All rights reserved.</label>
          </stacklayout>
        </stacklayout>
      </scrollview>
    </stacklayout>
  )
}
