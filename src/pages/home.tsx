import { createMemo } from "solid-js"
import { useRoute, useRouter } from "@/router"
import { FeatureCard } from "~/components/feature-card"
import { StatsDisplay } from "~/components/stats-display"
import { useAuthContext } from "~/features/auth/auth.context"

export default function Home() {
  const route = useRoute()
  const router = useRouter()
  const { user, loading, counter } = useAuthContext

  const userName = createMemo(() => {
    const currentUser = user()
    return currentUser?.email?.split("@")[0] || "User"
  })

  const userStats = createMemo(() => {
    return {
      projects: 3,
      storage: "2.5GB",
      tasks: 1250,
    }
  })

  return (
    <stacklayout class="min-h-full bg-gray-50">
      {/* Header */}
      <stacklayout class="border-gray-200 border-b bg-white px-6 py-6">
        <label class="font-inst text-3xl text-gray-900">Home</label>
        <label class="mt-1 text-gray-600">Welcome{user() ? `, ${userName()}` : ""} 👋</label>
      </stacklayout>

      {/* Content */}
      <scrollview>
        <stacklayout class="px-6 py-6">
          {/* Quick Stats */}
          <gridlayout columns="*, *, *" orientation="horizontal" class="mb-8 gap-4">
            <StatsDisplay
              value={userStats().projects}
              label="Projects"
              trend="up"
              class="mr-1 flex-1"
            />
            <StatsDisplay
              column="1"
              value={userStats().storage}
              label="Storage"
              trend="neutral"
              class="mr-1 flex-1"
            />
            <StatsDisplay
              column="2"
              value={userStats().tasks}
              label="Tasks"
              trend="up"
              class="flex-1"
            />
          </gridlayout>

          {/* Quick Actions */}
          <label class="mb-4 font-semibold text-gray-900 text-xl">Quick Access</label>

          {/* Counter Demo */}
          <gridlayout rows="auto, auto" columns="*, *" class="mb-8 gap-4">
            <FeatureCard
              icon="💰"
              title="Pricing"
              description="View subscription options"
              onTap={() => router.navigate("Pricing")}
              class="col-0 row-0"
            />
            <FeatureCard
              icon="🚀"
              title="Get Started"
              description="Begin using the app"
              onTap={() => router.navigate("Onboarding")}
              class="col-1 row-0"
            />
            <FeatureCard
              icon="📊"
              title="Analytics"
              description="Track your progress"
              onTap={() => console.log("Analytics tapped")}
              class="col-0 row-1"
            />
            <FeatureCard
              icon="🎯"
              title="Goals"
              description="Set and achieve targets"
              onTap={() => console.log("Goals tapped")}
              class="col-1 row-1"
            />
          </gridlayout>

          {/* Recent Activity */}
          <label class="mb-4 font-semibold text-gray-900 text-xl">Recent Activity</label>
          <stacklayout class="rounded-lg bg-white p-4">
            <label class="text-center text-gray-600">No recent activity yet</label>
            <label class="mt-2 text-center text-gray-400 text-sm">
              Start using the app to see your activity here
            </label>
            <label>{route.name}</label>
          </stacklayout>
        </stacklayout>
      </scrollview>
    </stacklayout>
  )
}
