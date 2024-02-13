import type { Writable } from "svelte/store"
import { createContext } from "./utils/context"

export interface ContextValue {
  tokenClientStore: Writable<google.accounts.oauth2.TokenClient>
  requestAuth: (
    callback?: google.accounts.oauth2.TokenClientConfig["callback"]
  ) => void
}

export const gapiContext = createContext<ContextValue>()
