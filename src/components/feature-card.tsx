import { handleTouchScaleAnimation } from "~/lib/touch-animations";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  onTap?: () => void;
  class?: string;
}

export function FeatureCard(props: FeatureCardProps) {
  return (
    <stacklayout
      class={`bg-white rounded-2xl p-6  border border-gray-100 ${
        props.class || ""
      }`}
      on:tap={props.onTap}
      on:touch={handleTouchScaleAnimation}
    >
      <stacklayout class="flex-row items-center mb-4">
        <image src={props.icon} class="w-8 h-8 mr-3" tintColor="#3A53FF" />
        <label class="text-lg font-semibold text-gray-900">{props.title}</label>
      </stacklayout>
      <label class="text-sm text-gray-600">{props.description}</label>
    </stacklayout>
  );
}
