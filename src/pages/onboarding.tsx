import { CoreTypes } from "@nativescript/core";
import { For, createSignal } from "solid-js";
import { useRouter } from "solid-navigation";

const onboardingPages = [
  {
    title: "Welcome",
    description: "Discover amazing features and get started with our app.",
    emoji: "🎉",
  },
  {
    title: "Explore",
    description: "Navigate through different sections and find what you need.",
    emoji: "🗺️",
  },
  {
    title: "Get Started",
    description: "You are all set! Let's begin your journey.",
    emoji: "🚀",
  },
];

export default function OnboardingPage() {
  const [currentPage, setCurrentPage] = createSignal(0);
  const router = useRouter();

  let animationRefs: HTMLLabelElement[] = [];

  function animateRefs(index: number) {
    animationRefs.forEach((ref, i) => {
      if (ref) {
        ref.animate({
          width: i === index ? 12 : 8,
          duration: 2000,
          curve: CoreTypes.AnimationCurve.spring,
        });
      }
    });
  }

  const nextPage = () => {
    if (currentPage() < onboardingPages.length - 1) {
      setCurrentPage(currentPage() + 1);
      animateRefs(currentPage());
      return;
    }

    router.navigate("Home", { clearHistory: true });
  };

  const prevPage = () => {
    if (currentPage() > 0) {
      setCurrentPage(currentPage() - 1);
      animateRefs(currentPage());
    }
  };

  return (
    <>
      {/*<scrollview orientation="verticla" scrollEnabled={false}>*/}
      <stacklayout class="h-full max-w-screen">
        <stacklayout class="flex-1 items-center justify-center p-8">
          <label class="text-6xl mb-6">
            {onboardingPages[currentPage()].emoji}
          </label>
          <label class="text-3xl font-bold text-gray-800 mb-4">
            {onboardingPages[currentPage()].title}
          </label>
          <label class="text-lg text-gray-600 text-center leading-relaxed max-w-full">
            {onboardingPages[currentPage()].description}
          </label>
        </stacklayout>

        <stacklayout class="flex-1" />

        <stacklayout
          class="mb-4"
          orientation="horizontal"
          horizontalAlignment="center"
        >
          <For each={onboardingPages}>
            {(item, index) => (
              <label
                ref={(el) => {
                  animationRefs[index()] = el;
                  // if (index() === currentPage() && el) {
                  //   el.animate({
                  //     width: 32,
                  //     duration: 300,
                  //     curve: CoreTypes.AnimationCurve.easeInOut,
                  //   });
                  // } else if (el) {
                  //   el.animate({
                  //     width: 8,
                  //     duration: 300,
                  //     curve: CoreTypes.AnimationCurve.easeInOut,
                  //   });
                  // }
                }}
                class="w-2 h-2 rounded-full mx-1"
                style={{
                  backgroundColor:
                    index() === currentPage() ? "#3b82f6" : "#d1d5db",
                }}
              />
            )}
          </For>
        </stacklayout>

        <stacklayout class="flex-row justify-between items-center px-8 pb-8">
          <button
            text="Previous"
            on:tap={prevPage}
            class={`px-6 py-3 rounded-lg font-medium transition-opacity ${
              currentPage() === 0
                ? "opacity-0"
                : "opacity-100 bg-gray-200 text-gray-700"
            }`}
          />
          <button
            text={
              currentPage() === onboardingPages.length - 1
                ? "Get Started"
                : "Next"
            }
            on:tap={nextPage}
            class="px-6 py-3 rounded-lg font-medium bg-blue-500 text-white mt-2"
          />
        </stacklayout>
      </stacklayout>
      {/*</scrollview>*/}
    </>
  );
}
