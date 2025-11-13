import { createEffect, createMemo } from "solid-js";
import { useRoute, useRouter } from "solid-navigation";
import { AppHeader } from "~/components/app-header";
import { FeatureCard } from "~/components/feature-card";
import { FooterNavigation } from "~/components/footer-navigation";
import { QuickAction } from "~/components/quick-action";
import { StatsDisplay } from "~/components/stats-display";
import { useAuthContext } from "~/features/auth/auth.context";

export default function Home() {
  const route = useRoute();
  const router = useRouter();
  const { user, loading, logout, counter } = useAuthContext;

  const userName = createMemo(() => {
    const currentUser = user();
    return currentUser?.email?.split("@")[0] || "User";
  });

  const userStats = createMemo(() => {
    return {
      domains: 3,
      storage: "2.5GB",
      visits: 1250,
    };
  });

  createEffect(() => {
    console.log("Home page mounted, user:", user());
  });

  return (
    <scrollview>
      <stacklayout class="bg-gray-50 min-h-full">
        {/* App Header */}
        <AppHeader title={route.name} />

        {/* Hero Section */}
        <stacklayout class="px-6 py-8 bg-linear-to-b from-indigo-50 to-white">
          <label class="text-3xl font-bold text-indigo-800 mb-2">
            Welcome{user() ? `, ${userName()}` : ""} 👋
          </label>
          <label class="text-lg text-gray-600 mb-6">
            Manage your domains and web presence with ease
          </label>

          {/* Quick Stats */}
          <stacklayout orientation="horizontal" class="gap-3 mb-8">
            <StatsDisplay
              value={userStats().domains}
              label="Domains"
              trend="up"
              class="flex-1"
            />
            <StatsDisplay
              value={userStats().storage}
              label="Storage"
              trend="neutral"
              class="flex-1"
            />
            <StatsDisplay
              value={userStats().visits}
              label="Visits"
              trend="up"
              class="flex-1"
            />
          </stacklayout>
        </stacklayout>

        {/* Features Grid */}
        <stacklayout class="px-6 py-6">
          <label class="text-xl font-semibold text-gray-900 mb-4">
            Features
          </label>
          <gridlayout rows="auto, auto" columns="*, *" class="gap-4">
            <FeatureCard
              icon="~/assets/icons/check-circle.svg"
              title="Pricing"
              description="Explore our flexible plans and pricing options"
              onTap={() => router.navigate("Pricing")}
              class="col-0 row-0"
            />
            <FeatureCard
              icon="~/assets/icons/check-circle.svg"
              title="Profile"
              description="Manage your account settings and preferences"
              onTap={() => console.log("Profile tapped")}
              class="col-1 row-0"
            />
            <FeatureCard
              icon="~/assets/icons/check-circle.svg"
              title="Settings"
              description="Configure app settings and preferences"
              onTap={() => console.log("Settings tapped")}
              class="col-0 row-1"
            />
            <FeatureCard
              icon="~/assets/icons/check-circle.svg"
              title="Support"
              description="Get help and contact our support team"
              onTap={() => console.log("Support tapped")}
              class="col-1 row-1"
            />
          </gridlayout>
        </stacklayout>

        {/* Quick Actions */}
        <stacklayout class="px-6 py-6 bg-white">
          <label class="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </label>
          <stacklayout class="gap-3">
            <QuickAction
              icon="🚀"
              title="Get Started"
              subtitle="Set up your first domain"
              onTap={() => router.navigate("Onboarding")}
            />
            <label class="h-2"></label>
            <QuickAction
              icon="📚"
              title="Documentation"
              subtitle="Read our comprehensive guides"
              onTap={() => console.log("Documentation tapped")}
            />
            <label class="h-2"></label>
            <QuickAction
              icon="👥"
              title="Community"
              subtitle="Join our user community"
              onTap={() => console.log("Community tapped")}
            />
          </stacklayout>
        </stacklayout>

        {/* Footer Navigation */}
        <FooterNavigation />
      </stacklayout>
    </scrollview>
  );
}
