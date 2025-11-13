import { honoClient } from "@/lib/hono-client";
import { Utils } from "@nativescript/core";
import { InAppBrowser } from "nativescript-inappbrowser";
import {
  createMemo,
  createRoot,
  createSignal,
  onMount,
  type Accessor,
} from "solid-js";
// import  from "nativescript-toasts";
// import { useData } from "vike-solid/useData";

// import type { UserResponseDTO } from "@/server/modules/auth/auth.dto";
import { Routers } from "solid-navigation/dist/src/types";
import { UserResponseDTO } from "~/lib/api";
import { getDeepLink } from "~/utils/get-deep-link";
import { generateCodeChallenge, generateCodeVerifier } from "./auth.utils";
// import { usePostLoginRedirectUrl } from "./use-post-login-redirect-url";

// ===========================================================================
// Mini-TanStack-like mutation helper - so auth.context.tsx is dependencyless
// ===========================================================================
export type MutationState<
  TArgs = unknown,
  TData = unknown,
  TError = unknown
> = {
  loading: Accessor<boolean>;
  error: Accessor<TError | null>;
  run: TArgs extends undefined
    ? () => Promise<TData | null>
    : (options: TArgs) => Promise<TData | null>;
};

export function createMutation<
  TArgs = unknown,
  TData = unknown,
  TError = unknown
>(
  mutationFn: (options: TArgs) => Promise<TData>
): MutationState<TArgs, TData, TError> {
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<TError | null>(null);

  const run = (async (options?: TArgs): Promise<TData> => {
    setLoading(true);
    setError(null);
    try {
      const data = await mutationFn(options as TArgs);
      return data;
    } catch (err) {
      setError(() => err as TError);
      throw err;
    } finally {
      setLoading(false);
    }
  }) as any;

  return { loading, error, run };
}

// ===========================================================================
// Context & Hook
// ===========================================================================
export type AuthContextValue = {
  user: Accessor<UserResponseDTO | null>;
  loading: Accessor<boolean>;
  counter: Accessor<number>;
  setCounter: (newNumber: number) => void;

  // Auth functions
  logout: MutationState<undefined, { success: boolean }>;
  emailLogin: MutationState<
    { email: string; password: string },
    UserResponseDTO | null
  >;
  emailRegister: MutationState<
    { email: string; password: string },
    UserResponseDTO | null
  >;
  forgotPasswordSend: MutationState<{ email: string }, { success: boolean }>;
  forgotPasswordVerify: MutationState<
    { token: string; newPassword: string },
    { success: boolean }
  >;
  refresh: MutationState<undefined, UserResponseDTO | null>;

  magicLinkSend: MutationState<{ email: string }, { success: boolean }>;
  otpSend: MutationState<
    { email: string },
    { success: boolean; userId?: string }
  >;
  otpVerify: MutationState<
    { userId: string; code: string },
    UserResponseDTO | null
  >;

  googleLogin: MutationState<{ newWindow?: boolean }, { success: boolean }>;
  githubLogin: MutationState<{ newWindow?: boolean }, { success: boolean }>;
  revokeSession: MutationState<{ revokeId: string }, { success: boolean }>;
};

// ===========================================================================
// Context Provider
// ===========================================================================
export const createAuthContext = () => {
  const [user, setUser] =
    createSignal<ReturnType<AuthContextValue["user"]>>(null);
  const [loading, setLoading] = createSignal<boolean>(true);

  const [counter, setCounter] = createSignal(0);

  const postLoginRedirectUrl = createMemo(
    () => "Home" as keyof Routers["Default"]
  );

  const logout = createMutation<undefined, { success: boolean }>(async () => {
    const response = await honoClient.auth.logout.$get();
    const result = await response.json();

    if (result.success) {
      setUser(null);
      return { success: true };
    }

    return { success: false };
  });

  const revokeSession = createMutation<
    { revokeId: string },
    { success: boolean }
  >(async ({ revokeId }) => {
    const resp = await honoClient.auth.revoke.$post({
      json: { revokeId },
    });
    const _result = await resp.json();
    _fetchCurrentUser();
    return { success: true };
  });

  const emailRegister = createMutation<
    { email: string; password: string },
    UserResponseDTO | null
  >(async ({ email, password }) => {
    const response = await honoClient.auth.register.$post({
      json: {
        email,
        password,
      },
    });
    const result = await response.json();

    if (result.user) {
      setUser(result.user);
      return result.user;
    }

    return null;
  });

  const emailLogin = createMutation<
    { email: string; password: string },
    UserResponseDTO | null
  >(async ({ email, password }) => {
    const response = await honoClient.auth.login.$post({
      json: {
        email: email,
        password: password,
      },
    });
    const result = await response.json();

    if (result.user) {
      setUser(result.user);
      return result.user;
    }

    return null;
  });

  const forgotPasswordSend = createMutation<
    { email: string },
    { success: boolean }
  >(async ({ email }) => {
    const response = await honoClient.auth["forgot-password"].$post({
      json: { email },
    });
    const result = await response.json();
    return { success: result.success };
  });

  const forgotPasswordVerify = createMutation<
    { token: string; newPassword: string },
    { success: boolean }
  >(async ({ token, newPassword }) => {
    const response = await honoClient.auth["forgot-password"].verify.$post({
      json: { token, newPassword },
    });
    const result = await response.json();
    return { success: result.success };
  });

  // OAuth utility function
  async function _openOAuthUrl(
    url: string,
    deepLink: string,
    options?: {
      /** Passing this will enable PKCE mode. Meaning you separately call `/token` to get the actual session. */
      codeVerifier?: string;
      newWindow?: boolean;
      width?: number;
      height?: number;
      timeout?: number;
    }
  ): Promise<{ success: boolean }> {
    const {
      newWindow = false,
      width = 600,
      height = 700,
      timeout = 30_000,
    } = options || {};

    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.openAuth(url, deepLink, {
        // iOS Properties
        ephemeralWebSession: false,
        // Android Properties
        showTitle: false,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
      })
        .then(async (response) => {
          if (response.type === "success" && response.url) {
            const parsedUrl = new URL(response.url);
            const authCode = parsedUrl.searchParams.get("auth_code");

            const _response = await honoClient.auth.login.token.$post({
              json: {
                auth_code: authCode!,
                code_verifier: options?.codeVerifier!,
              },
            });

            const data = await _response.json();
            if (data.user) {
              setUser(data.user);
            } else {
            }

            Utils.openUrl(deepLink);
          }
        })
        .catch((error) => {
          console.log("InAppBrowser error:", error);
        });
    } else Utils.openUrl(url);

    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => resolve({ success: true }), timeout);
    });
  }

  const googleLogin = createMutation<
    { newWindow?: boolean },
    { success: boolean }
  >(async (options) => {
    const deepLink = getDeepLink("Home");
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const url = honoClient.auth.login.google
      .$url({
        query: { redirect_url: deepLink, clientCodeChallenge: codeChallenge },
      })
      .toString();

    return _openOAuthUrl(url, deepLink, {
      codeVerifier: codeVerifier,
      newWindow: options?.newWindow,
    });
  });

  const githubLogin = createMutation<
    { newWindow?: boolean },
    { success: boolean }
  >(async (options?: { newWindow?: boolean }) => {
    const deepLink = getDeepLink("Home");
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const url = honoClient.auth.login.github
      .$url({
        query: { redirect_url: deepLink, clientCodeChallenge: codeChallenge },
      })
      .toString();

    return _openOAuthUrl(url, deepLink, {
      codeVerifier: codeVerifier,
      newWindow: options?.newWindow,
    });
  });

  const magicLinkSend = createMutation<{ email: string }, { success: boolean }>(
    async ({ email }) => {
      const response = await honoClient.auth.login["magic-link"].$post({
        json: { email: email },
      });
      const result = await response.json();
      if (result.success) return { success: true };

      return { success: false };
    }
  );

  const otpSend = createMutation<
    { email: string },
    { success: boolean; userId?: string }
  >(async ({ email }) => {
    const response = await honoClient.auth.login.otp.$post({
      json: { email },
    });
    const result = await response.json();
    if (result.success) return { success: true, userId: result.userId };
    return { success: false };
  });

  const otpVerify = createMutation<
    { userId: string; code: string },
    UserResponseDTO | null
  >(async ({ userId, code }) => {
    const response = await honoClient.auth.login.otp.verify.$post({
      json: { userId, code },
    });
    const result = await response.json();
    if (result.user) {
      setUser(result.user);
      return result.user;
    }
    return null;
  });

  async function _fetchCurrentUser() {
    setLoading(true);
    console.log("[AUTHCONTEXT] _fetchCurrentUser - start");
    try {
      const response = await honoClient.auth.$get();
      const result = await response.json();

      if (result.user) {
        setUser(result.user);
        setLoading(false);
      } else {
        setUser(null);
      }

      console.log("[AUTHCONTEXT] _fetchCurrentUser - end", result);
    } catch (error) {
      if (error instanceof Error) {
        console.log("[AUTHCONTEXT] _fetchCurrentUser - error", error);
        // toast.error(`Could not fetch the user: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  const refresh = createMutation<undefined, UserResponseDTO | null>(
    async () => {
      try {
        const response = await honoClient.auth.$get();
        const result = await response.json();

        if (result.user) {
          setUser(result.user);
          return result.user;
        } else {
          setUser(null);
          return null;
        }
      } catch (error) {
        if (error instanceof Error) {
          // toast.error(`Could not refresh the user: ${error.message}`);
        }
        throw error;
      }
    }
  );

  // Gets the current user at the start of the app.
  onMount(async () => {
    // Hydrated
    if (user()) {
      setLoading(false);
      return;
    }

    // Clientside Fetch
    _fetchCurrentUser();
  });

  return {
    user,
    loading,
    counter,
    setCounter,

    logout,
    emailRegister,
    emailLogin,
    forgotPasswordSend,
    forgotPasswordVerify,
    refresh,

    magicLinkSend,
    otpSend,
    otpVerify,

    googleLogin,
    githubLogin,
    revokeSession,
  };
};

export const useAuthContext = createRoot(createAuthContext);
