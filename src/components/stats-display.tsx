import { createMemo } from "solid-js";

interface StatsDisplayProps {
  value: number | string;
  label: string;
  trend?: "up" | "down" | "neutral";
  class?: string;
}

export function StatsDisplay(props: StatsDisplayProps) {
  const trendIcon = createMemo(() => {
    switch (props.trend) {
      case "up":
        return "▲";
      case "down":
        return "▼";
      default:
        return "";
    }
  });

  const trendColor = createMemo(() => {
    switch (props.trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  });

  return (
    <stacklayout
      class={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${
        props.class || ""
      }`}
    >
      <label class="text-2xl font-bold text-indigo-800 mb-1">
        {props.value}
        {props.trend && (
          <span class={`text-sm ml-1 ${trendColor()}`}>
            {trendIcon()}
          </span>
        )}
      </label>
      <label class="text-sm text-gray-600">{props.label}</label>
    </stacklayout>
  );
}
