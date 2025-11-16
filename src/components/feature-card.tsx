import { handleTouchScaleAnimation } from "~/lib/touch-animations"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  onTap?: () => void
  class?: string
}

export function FeatureCard(props: FeatureCardProps) {
  return (
    <stacklayout
      class={`rounded-2xl border border-gray-100 bg-white p-6 ${props.class || ""}`}
      on:tap={props.onTap}
      on:touch={handleTouchScaleAnimation}
    >
      <stacklayout class="mb-4 flex-row items-center">
        <image src={props.icon} class="mr-3 h-8 w-8" tintColor="#3A53FF" />
        <label class="font-semibold text-gray-900 text-lg">{props.title}</label>
      </stacklayout>
      <label class="text-gray-600 text-sm">{props.description}</label>
    </stacklayout>
  )
}
