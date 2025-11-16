import { useRouter } from "@/router"
import { CoreTypes } from "@nativescript/core"
import { createSignal, For, Show } from "solid-js"
import { handleTouchScaleAnimation } from "~/lib/touch-animations"

type TabType = "home" | "discover" | "profile" | "more"

type BottomNavigationProps = {}

export function BottomNavigation(props: BottomNavigationProps) {
  const [previousIndex, setPreviousIndex] = createSignal(0)

  const tabs = [
    {
      id: "home" as TabType,
      label: "Home",
      icon: "🏠",
      route: "Home",
    },
    {
      id: "discover" as TabType,
      label: "Discover",
      icon: "🔍",
      route: "Discover",
    },
    {
      id: "profile" as TabType,
      label: "Profile",
      icon: "👤",
      route: "Profile",
    },
    {
      id: "more" as TabType,
      label: "More",
      icon: "⚙️",
      route: "More",
    },
  ]

  const router = useRouter()

  const getActiveTab = () => {
    const tab = tabs.find((t) => t.route === router?.current()?.name)
    return tab ? tab.id : "home"
  }

  const handleTabPress = (tab: TabType, _route: string, index: number) => {
    setPreviousIndex(tabs.findIndex((t) => t.id === getActiveTab()))

    const transitionName = index > previousIndex() ? "slideLeft" : "slideRight"

    router?.navigate(_route as any, {
      noHeader: true,
      clearHistory: true,
      transition: {
        name: transitionName,
        curve: CoreTypes.AnimationCurve.easeInOut,
        duration: 100,
      },
    })
  }

  return (
    <gridlayout
      row="1"
      rows="auto"
      columns="*, *, *, *"
      class="border-gray-200 border-t bg-white px-4 pt-3 pb-6"
    >
      <label>route: {router.current()?.name}</label>
      <For each={tabs}>
        {(tab, index) => (
          <flexboxlayout
            col={index()}
            class="items-center"
            flexDirection="column"
            alignItems="center"
            on:tap={() => handleTabPress(tab.id, tab.route, index())}
            on:touch={handleTouchScaleAnimation}
          >
            <label
              class={`text-2xl ${getActiveTab() === tab.id ? "text-indigo-600" : "text-gray-400"}`}
              alignSelf="center"
            >
              {tab.icon}
            </label>
            <label
              class={`mt-1 text-xs ${
                getActiveTab() === tab.id ? "font-medium text-indigo-600" : "text-gray-500"
              }`}
            >
              {tab.label}
            </label>
            <Show when={getActiveTab() === tab.id}>
              <label class="mt-1 h-1 w-1 rounded-full bg-indigo-600" />
            </Show>
          </flexboxlayout>
        )}
      </For>
    </gridlayout>
  )
}
