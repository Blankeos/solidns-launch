import { For, Show } from "solid-js"
import { TouchAnimations } from "~/lib/touch-animations"

export interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  isPopular?: boolean
  highlightColor?: string
  ctaText: string
}

interface PricingCardProps {
  tier: PricingTier
  onSelect?: () => void
}

export function PricingCard(props: PricingCardProps) {
  const highlightColor = props.tier.highlightColor || "#3b82f6"

  return (
    <stacklayout
      class={`rounded-2xl border p-6 ${
        props.tier.isPopular ? "border-blue-300" : "border-gray-200"
      } bg-white`}
      style={{
        transform: props.tier.isPopular ? "scale(1.02)" : "scale(1)",
        borderColor: props.tier.isPopular ? highlightColor : undefined,
      }}
    >
      {/* Popular badge */}
      <Show when={props.tier.isPopular}>
        <label
          class="absolute top-0 right-0 rounded-tr-lg rounded-bl-lg bg-blue-500 px-3 py-1 font-semibold text-white text-xs"
          style={{ backgroundColor: highlightColor }}
        >
          Most Popular
        </label>
      </Show>

      {/* Tier name */}
      <label class="mb-2 font-bold text-2xl text-gray-900">{props.tier.name}</label>

      {/* Price */}
      <stacklayout class="mb-3 flex-row items-baseline">
        <label class="font-extrabold text-4xl text-gray-900">{props.tier.price}</label>
        <label class="ml-1 text-gray-500 text-lg">/{props.tier.period}</label>
      </stacklayout>

      {/* Description */}
      <label class="mb-4 text-gray-600 text-sm">{props.tier.description}</label>

      {/* Features list */}
      <stacklayout class="mb-6">
        <For each={props.tier.features}>
          {(feature) => (
            <stacklayout class="mb-2 flex-row items-center">
              <image
                src="~/assets/icons/check-circle.svg"
                class="mr-3 h-5 w-5"
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
        class={`rounded-lg px-6 py-3 text-center font-semibold text-white ${
          props.tier.isPopular ? "" : ""
        }`}
        style={{ backgroundColor: highlightColor }}
        touchAnimation={TouchAnimations.touchScale}
      >
        {props.tier.ctaText}
      </button>
    </stacklayout>
  )
}
