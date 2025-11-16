import { useRoute, useRouter } from "@/router"
import { FeatureCard } from "~/components/feature-card"
import { QuickAction } from "~/components/quick-action"

export default function Discover() {
  const route = useRoute()

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
  ]
  
  const router = useRouter()

  return (
    <stacklayout class="min-h-full bg-gray-50">
      {/* Header */}
      <stacklayout class="border-gray-200 border-b bg-white px-6 py-6">
        <label class="font-bold font-inst text-2xl text-gray-900">Discover</label>
        <label class="mt-1 text-gray-600">Explore features and content</label>
      </stacklayout>

      {/* Content */}
      <scrollview>
        <stacklayout class="px-6 py-6">
          {/* Featured Section */}
          <label class="mb-4 font-semibold text-gray-900 text-xl">Featured</label>
          <label>{route.name}</label>
          <button on:tap={() => {
            router.navigate("Home", { noHeader: true })
          }}>click mee!</button>
          <gridlayout rows="auto, auto" columns="*, *" class="mb-8 gap-4">
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
          <label class="mb-4 font-semibold text-gray-900 text-xl">Quick Access</label>
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
  )
}
