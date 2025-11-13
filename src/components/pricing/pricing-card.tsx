import { For, Show } from "solid-js";
import { TouchAnimations } from "~/lib/touch-animations";

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  highlightColor?: string;
  ctaText: string;
}

interface PricingCardProps {
  tier: PricingTier;
  onSelect?: () => void;
}

export function PricingCard(props: PricingCardProps) {
  const highlightColor = props.tier.highlightColor || "#3b82f6";

  return (
    <stacklayout
      class={`rounded-2xl p-6 border ${
        props.tier.isPopular ? "border-blue-300 " : "border-gray-200 "
      } bg-white`}
      style={{
        transform: props.tier.isPopular ? "scale(1.02)" : "scale(1)",
        borderColor: props.tier.isPopular ? highlightColor : undefined,
      }}
    >
      {/* Popular badge */}
      <Show when={props.tier.isPopular}>
        <label
          class="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg"
          style={{ backgroundColor: highlightColor }}
        >
          Most Popular
        </label>
      </Show>

      {/* Tier name */}
      <label class="text-2xl font-bold text-gray-900 mb-2">
        {props.tier.name}
      </label>

      {/* Price */}
      <stacklayout class="flex-row items-baseline mb-3">
        <label class="text-4xl font-extrabold text-gray-900">
          {props.tier.price}
        </label>
        <label class="text-lg text-gray-500 ml-1">/{props.tier.period}</label>
      </stacklayout>

      {/* Description */}
      <label class="text-gray-600 text-sm mb-4">{props.tier.description}</label>

      {/* Features list */}
      <stacklayout class="mb-6">
        <For each={props.tier.features}>
          {(feature) => (
            <stacklayout class="flex-row items-center mb-2">
              <image
                src="~/assets/icons/check-circle.svg"
                class="w-5 h-5 mr-3"
                tintColor={highlightColor}
              />
              <label class="text-gray-700 text-sm">{feature}</label>
            </stacklayout>
          )}
        </For>
      </stacklayout>

      {/* CTA Button */}
      <button
        on:tap={props.onSelect}
        class={`py-3 px-6 rounded-lg font-semibold text-white text-center ${
          props.tier.isPopular ? "" : ""
        }`}
        style={{ backgroundColor: highlightColor }}
        touchAnimation={TouchAnimations.touchScale}
      >
        {props.tier.ctaText}
      </button>
    </stacklayout>
  );
}
