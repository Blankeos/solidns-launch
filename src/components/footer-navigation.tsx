import { useRouter } from "@/router"

export function FooterNavigation() {
  const router = useRouter()

  return (
    <flexboxlayout class="border-gray-200 border-t bg-gray-50 px-6 py-8" flexDirection="column">
      <flexboxlayout class="w-full" flexDirection="column" alignItems="center">
        {/* App Info */}
        <flexboxlayout class="gap-6">
          <label class="text-gray-500 text-xs">SolidApp v1.0</label>
          <label class="text-gray-500 text-xs">© 2024</label>
        </flexboxlayout>

        {/* Social Links */}
        <flexboxlayout class="gap-6">
          <label
            class="h-6 w-6 text-center text-lg opacity-60"
            on:tap={() => {
              // Open GitHub link
              console.log("GitHub tapped")
            }}
            on:touch={(e) => {
              e.object.animate({
                opacity: 0.8,
                duration: 100,
              })
              setTimeout(() => {
                e.object.animate({
                  opacity: 0.6,
                  duration: 150,
                })
              }, 100)
            }}
          >
            🐱
          </label>
          <label
            class="h-6 w-6 text-center text-lg opacity-60"
            on:tap={() => {
              // Open Twitter link
              console.log("Twitter tapped")
            }}
            on:touch={(e) => {
              e.object.animate({
                opacity: 0.8,
                duration: 100,
              })
              setTimeout(() => {
                e.object.animate({
                  opacity: 0.6,
                  duration: 150,
                })
              }, 100)
            }}
          >
            🐦
          </label>
          <label
            class="h-6 w-6 text-center text-lg opacity-60"
            on:tap={() => {
              // Navigate to support
              router.navigate("Profile")
            }}
            on:touch={(e) => {
              e.object.animate({
                opacity: 0.8,
                duration: 100,
              })
              setTimeout(() => {
                e.object.animate({
                  opacity: 0.6,
                  duration: 150,
                })
              }, 100)
            }}
          >
            ❓
          </label>
        </flexboxlayout>

        <stacklayout class="h-5" />

        {/* Legal Links */}
        <flexboxlayout class="gap-4">
          <label class="text-gray-500 text-xs underline" on:tap={() => console.log("Terms tapped")}>
            Terms
          </label>
          <label
            class="text-gray-500 text-xs underline"
            on:tap={() => console.log("Privacy tapped")}
          >
            Privacy
          </label>
        </flexboxlayout>
      </flexboxlayout>
    </flexboxlayout>
  )
}
