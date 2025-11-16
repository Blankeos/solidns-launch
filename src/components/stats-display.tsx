import { createMemo } from "solid-js";

interface StatsDisplayProps {
  row?: string;
  column?: string;
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
      row={props.row}
      column={props.column}
      class={`bg-white rounded-xl p-4 border border-gray-100 ${
        props.class || ""
      }`}
    >
      <label class="text-2xl font-bold mb-1">{props.value ?? 0}</label>
      <label>
        {props.value ?? 0}
        {props.trend && (
          <label class={`text-sm ml-1 ${trendColor()}`}>{trendIcon()}</label>
        )}
      </label>
      <label class="text-sm text-gray-600">{props.label}</label>
    </stacklayout>
  );
}
