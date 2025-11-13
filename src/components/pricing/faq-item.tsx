import { CoreTypes } from "@nativescript/core";
import { createSignal, Show } from "solid-js";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem(props: FAQItemProps) {
  const [isExpanded, setIsExpanded] = createSignal(false);
  let contentRef!: HTMLLabelElement;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded());

    if (contentRef) {
      if (isExpanded()) {
        // Collapse
        contentRef.animate({
          opacity: 0,
          height: 0,
          duration: 300,
          curve: CoreTypes.AnimationCurve.easeInOut,
        });
      } else {
        // Expand
        contentRef.animate({
          opacity: 1,
          height: "auto",
          duration: 300,
          curve: CoreTypes.AnimationCurve.easeInOut,
        });
      }
    }
  };

  return (
    <stacklayout class="border-b border-gray-200 pb-4 mb-4">
      <button
        on:tap={toggleExpanded}
        class="flex-row items-center justify-between w-full py-3"
        horizontalAlignment="stretch"
      >
        <label class="text-lg font-semibold text-gray-900 flex-1 text-left mr-4">
          {props.question}
        </label>
        <label
          class={`text-2xl transition-transform ${
            isExpanded() ? "rotate-180" : "rotate-0"
          }`}
        >
          {isExpanded() ? "−" : "+"}
        </label>
      </button>

      <Show when={isExpanded()}>
        <label
          ref={contentRef}
          class="text-gray-600 text-sm leading-relaxed mt-2 opacity-0"
          textWrap
          height={0}
        >
          {props.answer}
        </label>
      </Show>
    </stacklayout>
  );
}
