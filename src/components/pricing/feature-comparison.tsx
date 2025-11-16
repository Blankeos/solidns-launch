import { For } from "solid-js"

export interface Feature {
  name: string
  description: string
  availableIn: string[]
}

interface FeatureComparisonProps {
  features: Feature[]
  tiers: string[]
}

export function FeatureComparison(props: FeatureComparisonProps) {
  const isFeatureAvailable = (feature: Feature, tier: string) => {
    return feature.availableIn.includes(tier)
  }

  return (
    <stacklayout class="rounded-2xl bg-white p-6">
      <label class="mb-6 text-center font-bold text-gray-900 text-xl">Feature Comparison</label>

      <gridlayout
        rows="auto, *"
        columns={`auto, ${props.tiers.map(() => "auto").join(", ")}`}
        class="gap-4"
      >
        {/* Header row */}
        <label row="0" col="0" class="font-semibold text-gray-700 text-sm opacity-0">
          Feature
        </label>
        <For each={props.tiers}>
          {(tier, index) => (
            <label
              row="0"
              col={index() + 1}
              class="text-center font-semibold text-gray-700 text-sm"
            >
              {tier}
            </label>
          )}
        </For>

        {/* Feature rows */}
        <For each={props.features}>
          {(feature, rowIndex) => (
            <>
              <label row={rowIndex() + 1} col="0" class="pr-4 text-gray-700 text-sm" textWrap>
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
                        class="h-6 w-6"
                        tintColor="#10b981"
                      />
                    ) : (
                      <image
                        src="~/assets/icons/x-circle.svg"
                        class="h-6 w-6"
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
  )
}
