import { useRoute, useRouter } from "@/router";
import { FeatureCard } from "~/components/feature-card";
import { QuickAction } from "~/components/quick-action";

export default function Discover() {
  const route = useRoute();
  const router = useRouter();

  const featuredItems = [
    {
      icon: "🌟",
      title: "Featured",
      description: "Check out our top features",
      onTap: () => console.log("Featured tapped"),
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Track your app usage and insights",
      onTap: () => console.log("Analytics tapped"),
    },
    {
      icon: "🎯",
      title: "Goals",
      description: "Set and track your goals",
      onTap: () => console.log("Goals tapped"),
    },
    {
      icon: "📱",
      title: "Apps",
      description: "Manage connected applications",
      onTap: () => console.log("Apps tapped"),
    },
  ];

  return (
    <stacklayout class="bg-gray-50 min-h-full">
      {/* Header */}
      <stacklayout class="px-6 py-6 bg-white border-b border-gray-200">
        <label class="text-2xl font-bold text-gray-900 font-inst">
          Discover
        </label>
        <label class="text-gray-600 mt-1">Explore features and content</label>
      </stacklayout>

      {/* Content */}
      <scrollview>
        <stacklayout class="px-6 py-6">
          {/* Featured Section */}
          <label class="text-xl font-semibold text-gray-900 mb-4">
            Featured
          </label>
          <gridlayout rows="auto, auto" columns="*, *" class="gap-4 mb-8">
            {featuredItems.slice(0, 4).map((item, index) => (
              <FeatureCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                onTap={item.onTap}
                class={`col-${index % 2} row-${Math.floor(index / 2)}`}
              />
            ))}
          </gridlayout>

          {/* Quick Actions */}
          <label class="text-xl font-semibold text-gray-900 mb-4">
            Quick Access
          </label>
          <stacklayout class="gap-3">
            <QuickAction
              icon="📚"
              title="Documentation"
              subtitle="Learn how to use the app"
              onTap={() => console.log("Documentation tapped")}
              class="mb-2"
            />
            <QuickAction
              icon="👥"
              title="Community"
              subtitle="Connect with other users"
              onTap={() => console.log("Community tapped")}
              class="mb-2"
            />
            <QuickAction
              icon="💡"
              title="Tips & Tricks"
              subtitle="Get the most out of the app"
              onTap={() => console.log("Tips tapped")}
              class="mb-2"
            />
          </stacklayout>
        </stacklayout>
      </scrollview>
    </stacklayout>
  );
}
