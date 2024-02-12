<script lang="ts">
  const CLIENT_ID =
    "458149956486-1b55smqeg55lodc1jkbgsof7ouu37chv.apps.googleusercontent.com"

  const CALENDAR_DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"

  const PEOPLE_DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/people/v1/rest"

  const SCOPES = "https://www.googleapis.com/auth/calendar profile"

  let tokenClient: google.accounts.oauth2.TokenClient
  let gapiInited = false
  let gisInited = false

  let avatarUrl = ""

  async function fetchProfile() {
    const profile = await gapi.client.people.people.get({
      resourceName: "people/me",
      key: "",
      personFields: "names,photos",
    })

    avatarUrl = profile.result.photos[0].url
  }

  $: {
    let accessToken: string | undefined
    if (
      gapiInited &&
      gisInited &&
      (accessToken = localStorage.getItem("access_token"))
    ) {
      gapi.client.setToken({
        access_token: accessToken,
      })
      fetchProfile()
    }
  }

  /**
   * Callback after api.js is loaded.
   */
  function gapiLoaded() {
    gapi.load("client", initializeGapiClient)
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async function initializeGapiClient() {
    await gapi.client.init({
      // apiKey: API_KEY,
      discoveryDocs: [CALENDAR_DISCOVERY_DOC, PEOPLE_DISCOVERY_DOC],
    })
    gapiInited = true
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: handleAuthDone,
    })

    gisInited = true
  }

  async function handleAuthDone(
    response: google.accounts.oauth2.TokenResponse,
  ) {
    if (response.error !== undefined) {
      throw response
    }

    localStorage.setItem("access_token", response.access_token)
    
    fetchProfile()
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthRequest() {
    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: "consent" })
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: "" })
    }
  }
</script>

<div class="{$$restProps.class} flex justify-center">
  <button
    on:click={handleAuthRequest}
    class="w-8 h-8 bg-white rounded-full hover:bg-opacity-80 drop-shadow-sm"
  >
    {#if avatarUrl}
      <img src={avatarUrl} alt="Google Profile" />
    {:else}
      <div class="grid place-content-center">
        <div class="w-4 h-4">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            style="display: block;"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            ></path>
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            ></path>
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            ></path>
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            ></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </div>
        <span style="display: none;">Sign in with Google</span>
      </div>
    {/if}
  </button>
</div>

<svelte:head>
  <script
    async
    defer
    src="https://apis.google.com/js/api.js"
    on:load={gapiLoaded}
  ></script>
  <script
    async
    defer
    src="https://accounts.google.com/gsi/client"
    on:load={gisLoaded}
  ></script>
</svelte:head>
