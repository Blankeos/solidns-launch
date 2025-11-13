import { For } from "solid-js";

export interface Feature {
  name: string;
  description: string;
  availableIn: string[];
}

interface FeatureComparisonProps {
  features: Feature[];
  tiers: string[];
}

export function FeatureComparison(props: FeatureComparisonProps) {
  const isFeatureAvailable = (feature: Feature, tier: string) => {
    return feature.availableIn.includes(tier);
  };

  return (
    <stacklayout class="bg-white rounded-2xl p-6 shadow-md">
      <label class="text-xl font-bold text-gray-900 mb-6 text-center">
        Feature Comparison
      </label>

      <gridlayout
        rows="auto, *"
        columns={`auto, ${props.tiers.map(() => "auto").join(", ")}`}
        class="gap-4"
      >
        {/* Header row */}
        <label
          row="0"
          col="0"
          class="text-sm font-semibold text-gray-700 opacity-0"
        >
          Feature
        </label>
        <For each={props.tiers}>
          {(tier, index) => (
            <label
              row="0"
              col={index() + 1}
              class="text-sm font-semibold text-gray-700 text-center"
            >
              {tier}
            </label>
          )}
        </For>

        {/* Feature rows */}
        <For each={props.features}>
          {(feature, rowIndex) => (
            <>
              <label
                row={rowIndex() + 1}
                col="0"
                class="text-sm text-gray-700 pr-4"
                textWrap
              >
                {feature.name}
              </label>
              <For each={props.tiers}>
                {(tier, colIndex) => (
                  <stacklayout
                    row={rowIndex() + 1}
                    col={colIndex() + 1}
                    horizontalAlignment="center"
                    verticalAlignment="center"
                  >
                    {isFeatureAvailable(feature, tier) ? (
                      <image
                        src="~/assets/icons/check-circle.svg"
                        class="w-6 h-6"
                        tintColor="#10b981"
                      />
                    ) : (
                      <image
                        src="~/assets/icons/x-circle.svg"
                        class="w-6 h-6"
                        tintColor="#ef4444"
                      />
                    )}
                  </stacklayout>
                )}
              </For>
            </>
          )}
        </For>
      </gridlayout>
    </stacklayout>
  );
}
