import { HACK_getRouter } from "@/router";
import { CoreTypes } from "@nativescript/core";
import { For, Show, createSignal } from "solid-js";
import { handleTouchScaleAnimation } from "~/lib/touch-animations";

type TabType = "home" | "discover" | "profile" | "more";

interface BottomNavigationProps {}

export function BottomNavigation(props: BottomNavigationProps) {
  const [activeTab, setActiveTab] = createSignal<TabType>("home");
  const [previousIndex, setPreviousIndex] = createSignal(0);

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
  ];

  const handleTabPress = (tab: TabType, route: string, index: number) => {
    const router = HACK_getRouter();

    if (activeTab() !== tab) {
      setPreviousIndex(tabs.findIndex((t) => t.id === activeTab()));
      setActiveTab(tab);

      const transitionName =
        index > previousIndex() ? "slideLeft" : "slideRight";

      console.log(
        "[previousIndex]",
        previousIndex(),
        "[clicked index]",
        index,
        "[transition]",
        transitionName
      );

      router.navigate(route, {
        noHeader: true,
        clearHistory: true,
        transition: {
          name: transitionName,
          curve: CoreTypes.AnimationCurve.easeInOut,
          duration: 100,
        },
      });
    }
  };

  return (
    <gridlayout
      row="1"
      rows="auto"
      columns="*, *, *, *"
      class="bg-white border-t border-gray-200 pt-3 pb-6 px-4"
    >
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
              class={`text-2xl ${
                activeTab() === tab.id ? "text-indigo-600" : "text-gray-400"
              }`}
              alignSelf="center"
            >
              {tab.icon}
            </label>
            <label
              class={`text-xs mt-1 ${
                activeTab() === tab.id
                  ? "text-indigo-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </label>
            <Show when={activeTab() === tab.id}>
              <label class="w-1 h-1 bg-indigo-600 rounded-full mt-1" />
            </Show>
          </flexboxlayout>
        )}
      </For>
    </gridlayout>
  );
}
