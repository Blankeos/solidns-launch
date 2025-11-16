import { CoreTypes } from "@nativescript/core"
import { createSignal, For } from "solid-js"
import { useRouter } from "@/router"
import { TouchAnimations } from "~/lib/touch-animations"

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
    image:
      "https://images.unsplash.com/photo-1658837345115-e22db41aafff?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Get Started",
    description: "You are all set! Let's begin your journey.",
    emoji: "🚀",
  },
]

export default function OnboardingPage() {
  const [currentPage, setCurrentPage] = createSignal(0)
  const router = useRouter()

  const animationRefs: HTMLLabelElement[] = []

  function animateRefs(index: number) {
    animationRefs.forEach((ref, i) => {
      if (ref) {
        ref.animate({
          width: i === index ? 12 : 8,
          duration: 2000,
          curve: CoreTypes.AnimationCurve.spring,
        })
      }
    })
  }

  const nextPage = () => {
    if (currentPage() < onboardingPages.length - 1) {
      setCurrentPage(currentPage() + 1)
      animateRefs(currentPage())
      return
    }

    router.navigate("Home", { clearHistory: true })
  }

  const prevPage = () => {
    if (currentPage() > 0) {
      setCurrentPage(currentPage() - 1)
      animateRefs(currentPage())
    }
  }

  return (
    <>
      {/*<scrollview orientation="verticla" scrollEnabled={false}>*/}
      <flexboxlayout class="h-full max-w-screen" flexDirection="column">
        <stacklayout class="flex-1 items-center justify-center p-8">
          {currentPage() === 1 ? (
            <image
              src={onboardingPages[1].image}
              class="mb-6 h-56 w-full rounded-lg"
              stretch="aspectFill"
            />
          ) : (
            <stacklayout
              class={`mb-6 h-56 rounded-lg ${
                currentPage() === 2 ? "bg-green-400" : "bg-purple-500"
              }`}
            >
              <stacklayout class="h-full" horizontalAlignment="center" verticalAlignment="center">
                <label class="text-6xl">{onboardingPages[currentPage()].emoji}</label>
              </stacklayout>
            </stacklayout>
          )}
          <label class="mb-4 font-bold text-3xl text-gray-800" horizontalAlignment="center">
            {onboardingPages[currentPage()].title}
          </label>
          <label class="max-w-full text-center text-gray-600 text-lg leading-relaxed" textWrap>
            {onboardingPages[currentPage()].description}
          </label>
        </stacklayout>

        <stacklayout class="flex-1" alignSelf="stretch" />

        <stacklayout class="mb-4" orientation="horizontal" horizontalAlignment="center">
          <For each={onboardingPages}>
            {(_, index) => (
              <label
                ref={(el) => {
                  animationRefs[index()] = el
                }}
                class="mx-1 h-2 w-2 rounded-full"
                style={{
                  backgroundColor: index() === currentPage() ? "#3b82f6" : "#d1d5db",
                }}
              />
            )}
          </For>
        </stacklayout>

        <stacklayout class="flex-row items-center justify-between px-8 pb-8">
          <button
            text="Previous"
            on:tap={prevPage}
            touchAnimation={TouchAnimations.touchScale}
            class={`rounded-lg px-6 py-3 font-medium transition-opacity ${
              currentPage() === 0 ? "opacity-0" : "bg-gray-200 text-gray-700 opacity-100"
            }`}
          />
          <button
            text={currentPage() === onboardingPages.length - 1 ? "Get Started" : "Next"}
            on:tap={nextPage}
            touchAnimation={TouchAnimations.touchScale}
            class="mt-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white"
          />
        </stacklayout>
      </flexboxlayout>
      {/*</scrollview>*/}
    </>
  )
}
