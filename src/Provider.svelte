<script lang="ts">
  import { get, writable } from "svelte/store"
  import { gapiContext, type ContextValue } from "./Provider"

  let tokenClientStore = writable<google.accounts.oauth2.TokenClient>()

  const contextValue: ContextValue = {
    tokenClientStore: tokenClientStore,
    requestAuth(callback) {
      const tokenClient = get(
        tokenClientStore,
      ) as google.accounts.oauth2.TokenClient & {
        callback?: google.accounts.oauth2.TokenClientConfig["callback"]
      }

      if (callback) {
        const oldCallback = tokenClient.callback
        tokenClient.callback = (res) => {
          oldCallback(res)
          callback(res)
          tokenClient.callback = oldCallback
        }
      }

      if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: "consent" })
      } else {
        tokenClient.requestAccessToken({ prompt: "" })
      }
    },
  }

  gapiContext.set(contextValue)
</script>

<slot />
