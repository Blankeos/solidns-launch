import { useRouter } from "solid-navigation";

export function FooterNavigation() {
  const router = useRouter();

  return (
    <flexboxlayout
      class="px-6 py-8 border-t border-gray-200 bg-gray-50"
      flexDirection="column"
    >
      <flexboxlayout class="w-full" flexDirection="column" alignItems="center">
        {/* App Info */}
        <flexboxlayout class="gap-6">
          <label class="text-xs text-gray-500">SolidNS v1.0</label>
          <label class="text-xs text-gray-500">© 2024</label>
        </flexboxlayout>

        {/* Social Links */}
        <flexboxlayout class="gap-6">
          <label
            class="w-6 h-6 opacity-60 text-center text-lg"
            on:tap={() => {
              // Open GitHub link
              console.log("GitHub tapped");
            }}
            on:touch={(e) => {
              e.object.animate({
                opacity: 0.8,
                duration: 100,
              });
              setTimeout(() => {
                e.object.animate({
                  opacity: 0.6,
                  duration: 150,
                });
              }, 100);
            }}
          >
            🐱
          </label>
          <label
            class="w-6 h-6 opacity-60 text-center text-lg"
            on:tap={() => {
              // Open Twitter link
              console.log("Twitter tapped");
            }}
            on:touch={(e) => {
              e.object.animate({
                opacity: 0.8,
                duration: 100,
              });
              setTimeout(() => {
                e.object.animate({
                  opacity: 0.6,
                  duration: 150,
                });
              }, 100);
            }}
          >
            🐦
          </label>
          <label
            class="w-6 h-6 opacity-60 text-center text-lg"
            on:tap={() => {
              // Navigate to support
              router.navigate("Support");
            }}
            on:touch={(e) => {
              e.object.animate({
                opacity: 0.8,
                duration: 100,
              });
              setTimeout(() => {
                e.object.animate({
                  opacity: 0.6,
                  duration: 150,
                });
              }, 100);
            }}
          >
            ❓
          </label>
        </flexboxlayout>

        <stacklayout class="h-5" />

        {/* Legal Links */}
        <flexboxlayout class="gap-4">
          <label
            class="text-xs text-gray-500 underline"
            on:tap={() => router.navigate("Terms")}
          >
            Terms
          </label>
          <label
            class="text-xs text-gray-500 underline"
            on:tap={() => router.navigate("Privacy")}
          >
            Privacy
          </label>
        </flexboxlayout>
      </flexboxlayout>
    </flexboxlayout>
  );
}
