import type { NativeScriptConfig } from "@nativescript/core"

export default {
  id: "org.nativescript.solidnslaunch",
  appPath: "src",
  appResourcesPath: "App_Resources",
  android: {
    v8Flags: "--expose_gc",
    markingMode: "none",
  },
  bundler: "vite",
  bundlerConfigPath: "vite.config.ts",
} as NativeScriptConfig
