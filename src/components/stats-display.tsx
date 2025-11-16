import { createMemo } from "solid-js"

interface StatsDisplayProps {
  row?: string
  column?: string
  value: number | string
  label: string
  trend?: "up" | "down" | "neutral"
  class?: string
}

export function StatsDisplay(props: StatsDisplayProps) {
  const trendIcon = createMemo(() => {
    switch (props.trend) {
      case "up":
        return "▲"
      case "down":
        return "▼"
      default:
        return ""
    }
  })

  const trendColor = createMemo(() => {
    switch (props.trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-500"
    }
  })

  return (
    <stacklayout
      row={props.row}
      column={props.column}
      class={`rounded-xl border border-gray-100 bg-white p-4 ${props.class || ""}`}
    >
      <label class="mb-1 font-bold text-2xl">{props.value ?? 0}</label>
      <label>
        {props.value ?? 0}
        {props.trend && <label class={`ml-1 text-sm ${trendColor()}`}>{trendIcon()}</label>}
      </label>
      <label class="text-gray-600 text-sm">{props.label}</label>
    </stacklayout>
  )
}
