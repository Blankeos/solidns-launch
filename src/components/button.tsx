import { CoreTypes } from "@nativescript/core"
import { createEffect, createSignal } from "solid-js"

export type ButtonProps = JSX.IntrinsicElements["button"]

export function Button(props: ButtonProps) {
  let ref: HTMLButtonElement

  const [active, setActive] = createSignal(false)

  let playingAnimation: ReturnType<typeof ref.animate>

  createEffect(async () => {
    if (!ref && "animate" in ref) return
    try {
      if (active()) {
        // playingAnimation?.cancel();

        playingAnimation = ref.animate({
          scale: { x: 0.95, y: 0.95 },
          duration: 150,
          curve: CoreTypes.AnimationCurve.easeInOut,
        })
      } else {
        // playingAnimation?.cancel();

        playingAnimation = ref.animate({
          scale: { x: 1, y: 1 },
          duration: 200,
          curve: CoreTypes.AnimationCurve.easeInOut,
        })
      }
    } catch (err) {
      console.log("animations failed", err)
    }
  })

  return (
    <button
      {...props}
      ref={(el) => {
        ref = el
        // props.ref = el;
      }}
      class="bg-green-500"
      on:touch={(e) => {
        if (e.action === "down") {
          setActive(true)
        } else if (e.action === "up") {
          setActive(false)
        }
      }}
    >
      {props.children}
    </button>
  )
}
