import { useRoute } from "@/router";
import { Show } from "solid-js";
import { QuickAction } from "~/components/quick-action";
import { useAuthContext } from "~/features/auth/auth.context";

export default function More() {
  const route = useRoute();
  const { user } = useAuthContext;

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
  ];

  return (
    <stacklayout class="bg-gray-50 min-h-full">
      {/* Header */}
      <stacklayout class="px-6 py-6 bg-white border-b border-gray-200">
        <label class="text-2xl font-bold text-gray-900 font-inst">More</label>
        <label class="text-gray-600 mt-1">
          Additional options and settings
        </label>
      </stacklayout>

      {/* Content */}
      <scrollview>
        <stacklayout class="px-6 py-6">
          {/* App Info */}
          <stacklayout class="items-center mb-8">
            <label class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl mb-4">
              📱
            </label>
            <label class="text-xl font-semibold text-gray-900">SolidApp</label>
            <label class="text-gray-600 mt-1">Version 1.0.0</label>
            <Show when={user()}>
              <label class="text-sm text-indigo-600 mt-2 bg-indigo-50 px-3 py-1 rounded-full">
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
          <stacklayout class="mt-8 pt-6 border-t border-gray-200 items-center">
            <label class="text-sm text-gray-500">
              © 2024 SolidApp. All rights reserved.
            </label>
          </stacklayout>
        </stacklayout>
      </scrollview>
    </stacklayout>
  );
}
