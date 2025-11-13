import { useRoute, useRouter } from "@/router";
import { createMemo } from "solid-js";
import { FeatureCard } from "~/components/feature-card";
import { StatsDisplay } from "~/components/stats-display";
import { useAuthContext } from "~/features/auth/auth.context";

export default function Home() {
  const route = useRoute();
  const router = useRouter();
  const { user, loading, counter } = useAuthContext;

  const userName = createMemo(() => {
    const currentUser = user();
    return currentUser?.email?.split("@")[0] || "User";
  });

  const userStats = createMemo(() => {
    return {
      projects: 3,
      storage: "2.5GB",
      tasks: 1250,
    };
  });

  return (
    <stacklayout class="bg-gray-50 min-h-full">
      {/* Header */}
      <stacklayout class="px-6 py-6 bg-white border-b border-gray-200">
        <label class="text-3xl text-gray-900 font-inst">Home</label>
        <label class="text-gray-600 mt-1">
          Welcome{user() ? `, ${userName()}` : ""} 👋
        </label>
      </stacklayout>

      {/* Content */}
      <scrollview>
        <stacklayout class="px-6 py-6">
          {/* Quick Stats */}
          <gridlayout
            columns="*, *, *"
            orientation="horizontal"
            class="gap-4 mb-8"
          >
            <StatsDisplay
              value={userStats().projects}
              label="Projects"
              trend="up"
              class="flex-1 mr-1"
            />
            <StatsDisplay
              column="1"
              value={userStats().storage}
              label="Storage"
              trend="neutral"
              class="flex-1 mr-1"
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
          <label class="text-xl font-semibold text-gray-900 mb-4">
            Quick Access
          </label>
          <gridlayout rows="auto, auto" columns="*, *" class="gap-4 mb-8">
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
          <label class="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </label>
          <stacklayout class="bg-white rounded-lg p-4">
            <label class="text-gray-600 text-center">
              No recent activity yet
            </label>
            <label class="text-sm text-gray-400 text-center mt-2">
              Start using the app to see your activity here
            </label>
          </stacklayout>
        </stacklayout>
      </scrollview>
    </stacklayout>
  );
}
