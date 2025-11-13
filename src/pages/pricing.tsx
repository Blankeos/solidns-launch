import { For, createSignal } from "solid-js";
import { useRouter } from "solid-navigation";
import { FAQItem } from "~/components/pricing/faq-item";
import {
  FeatureComparison,
  type Feature,
} from "~/components/pricing/feature-comparison";
import {
  PricingCard,
  type PricingTier,
} from "~/components/pricing/pricing-card";
import { useAuthContext } from "~/features/auth/auth.context";
import { TouchAnimations } from "~/lib/touch-animations";

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "month",
    description: "Perfect for getting started",
    features: [
      "1 GB Storage",
      "Up to 5 users",
      "Basic support",
      "Core features",
      "Mobile access",
    ],
    ctaText: "Get Started",
  },
  {
    name: "Pro",
    price: "$15",
    period: "month",
    description: "For growing teams and businesses",
    features: [
      "10 GB Storage",
      "Up to 25 users",
      "Priority support",
      "All Pro features",
      "Advanced analytics",
      "Custom branding",
      "API access",
    ],
    isPopular: true,
    highlightColor: "#3b82f6",
    ctaText: "Start Free Trial",
  },
  {
    name: "Business",
    price: "$45",
    period: "month",
    description: "For established organizations",
    features: [
      "100 GB Storage",
      "Unlimited users",
      "24/7 support",
      "All Business features",
      "Advanced security",
      "Custom domains",
      "Team management",
      "SSO integration",
    ],
    highlightColor: "#8b5cf6",
    ctaText: "Contact Sales",
  },
];

const features: Feature[] = [
  {
    name: "Storage",
    description: "Total storage space available",
    availableIn: ["Free", "Pro", "Business"],
  },
  {
    name: "User seats",
    description: "Maximum number of users",
    availableIn: ["Free", "Pro", "Business"],
  },
  {
    name: "Priority support",
    description: "Faster response times",
    availableIn: ["Pro", "Business"],
  },
  {
    name: "Custom branding",
    description: "White-label experience",
    availableIn: ["Pro", "Business"],
  },
  {
    name: "API access",
    description: "Programmatic access to platform",
    availableIn: ["Pro", "Business"],
  },
  {
    name: "Advanced security",
    description: "Enhanced security features",
    availableIn: ["Business"],
  },
  {
    name: "Custom domains",
    description: "Use your own domain name",
    availableIn: ["Business"],
  },
  {
    name: "SSO integration",
    description: "Single sign-on support",
    availableIn: ["Business"],
  },
];

const faqItems = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any differences in billing.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "We offer a 30-day money-back guarantee on all annual plans. Monthly plans can be canceled at any time without further charges.",
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer:
      "Yes, we offer special pricing for non-profit organizations and educational institutions. Contact our sales team for more information.",
  },
];

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuthContext;
  const [selectedTier, setSelectedTier] = createSignal<string | null>(null);

  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTier(tier.name);
    console.log("Selected tier:", tier.name);

    // For demo purposes, just show a message
    if (tier.name === "Free") {
      router.navigate("Home");
    } else if (tier.name === "Pro") {
      // In a real app, this would open purchase flow
      console.log("Starting Pro trial...");
    } else {
      console.log("Contacting sales for Business plan...");
    }
  };

  return (
    <scrollview class="bg-gray-50">
      <stacklayout class="p-6 max-w-md mx-auto">
        {/* Header */}
        <stacklayout class="mb-8 text-center">
          <label class="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Plan
          </label>
          <label class="text-gray-600 text-lg">
            Simple, transparent pricing for teams of all sizes
          </label>
        </stacklayout>

        {/* Pricing Tiers */}
        <stacklayout class="gap-6 mb-8">
          <For each={pricingTiers}>
            {(tier) => (
              <PricingCard
                tier={tier}
                onSelect={() => handleSelectTier(tier)}
              />
            )}
          </For>
        </stacklayout>

        {/* Feature Comparison */}
        <FeatureComparison
          features={features}
          tiers={pricingTiers.map((t) => t.name)}
        />

        {/* FAQ Section */}
        <stacklayout class="bg-white rounded-2xl p-6 shadow-md mt-8">
          <label class="text-xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </label>
          <For each={faqItems}>
            {(item) => (
              <FAQItem question={item.question} answer={item.answer} />
            )}
          </For>
        </stacklayout>

        {/* Footer CTA */}
        <stacklayout class="text-center mt-8 mb-12">
          <label class="text-gray-600 text-sm mb-4">
            Need help choosing a plan?
          </label>
          <button
            class="bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold"
            touchAnimation={TouchAnimations.touchScale}
            on:tap={() => console.log("Contact support")}
          >
            Contact Support
          </button>
        </stacklayout>
      </stacklayout>
    </scrollview>
  );
}
