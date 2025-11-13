import { createMemo } from "solid-js";
import { handleTouchScaleAnimation } from "~/lib/touch-animations";

interface QuickActionProps {
  icon: string;
  title: string;
  subtitle?: string;
  onTap?: () => void;
  class?: string;
}

export function QuickAction(props: QuickActionProps) {
  const isEmoji = createMemo(() => {
    // Simple check if the icon is an emoji or text symbol
    return props.icon.length <= 3 && !props.icon.includes("/");
  });

  return (
    <flexboxlayout
      class={`rounded-xl p-4 border border-gray-200 hover:bg-gray-50 transition-all ${
        props.class || ""
      }`}
      on:tap={props.onTap}
      on:touch={handleTouchScaleAnimation}
    >
      {isEmoji() ? (
        <label class="w-6 h-6 mr-3 text-center text-lg">{props.icon}</label>
      ) : (
        <image src={props.icon} class="w-6 h-6 mr-3" tintColor="#3A53FF" />
      )}
      <stacklayout class="flex-1">
        <label class="text-sm font-medium text-gray-900">{props.title}</label>
        {props.subtitle && (
          <label class="text-xs text-gray-500 mt-1">{props.subtitle}</label>
        )}
      </stacklayout>

      <stacklayout class="flex-1" alignSelf="stretch" />

      <label class="w-4 h-4 text-gray-400">›</label>
    </flexboxlayout>
  );
}
