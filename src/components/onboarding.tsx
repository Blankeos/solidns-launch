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

  const nextPage = () => {
    if (currentPage() < onboardingPages.length - 1) {
      setCurrentPage(currentPage() + 1);
      return;
    }

    router.navigate("Home", { clearHistory: true });
  };

  const prevPage = () => {
    if (currentPage() > 0) {
      setCurrentPage(currentPage() - 1);
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
          <label class="text-lg text-gray-600 text-center leading-relaxed max-w-full break-words">
            {onboardingPages[currentPage()].description}
          </label>
        </stacklayout>

        <stacklayout class="flex-1" />

        <stacklayout class="flex-row justify-center items-center mb-4">
          <For each={onboardingPages}>
            {(_, index) => (
              <stacklayout
                class={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                  index() === currentPage() ? "bg-blue-500 w-8" : "bg-gray-300"
                }`}
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
            class="px-6 py-3 rounded-lg font-medium bg-blue-500 text-white"
          />
        </stacklayout>
      </stacklayout>
      {/*</scrollview>*/}
    </>
  );
}
