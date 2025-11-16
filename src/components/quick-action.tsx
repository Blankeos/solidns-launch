import { createMemo } from "solid-js"
import { handleTouchScaleAnimation } from "~/lib/touch-animations"

interface QuickActionProps {
  icon: string
  title: string
  subtitle?: string
  onTap?: () => void
  class?: string
}

export function QuickAction(props: QuickActionProps) {
  const isEmoji = createMemo(() => {
    // Simple check if the icon is an emoji or text symbol
    return props.icon.length <= 3 && !props.icon.includes("/")
  })

  return (
    <flexboxlayout
      class={`rounded-xl border border-gray-200 p-4 transition-all hover:bg-gray-50 ${
        props.class || ""
      }`}
      on:tap={props.onTap}
      on:touch={handleTouchScaleAnimation}
    >
      {isEmoji() ? (
        <label class="mr-3 h-6 w-6 text-center text-lg">{props.icon}</label>
      ) : (
        <image src={props.icon} class="mr-3 h-6 w-6" tintColor="#3A53FF" />
      )}
      <stacklayout class="flex-1">
        <label class="font-medium text-gray-900 text-sm">{props.title}</label>
        {props.subtitle && <label class="mt-1 text-gray-500 text-xs">{props.subtitle}</label>}
      </stacklayout>

      <stacklayout class="flex-1" alignSelf="stretch" />

      <label class="h-4 w-4 text-gray-400">›</label>
    </flexboxlayout>
  )
}
