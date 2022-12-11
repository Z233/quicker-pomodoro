<script lang="ts">
  export let checked = false
</script>

<svg
  class="w-full h-full"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {#if checked}
    <circle cx="12" cy="12" r="7" fill="currentColor" />
  {/if}
  <rect
    x="0.75"
    y="0.75"
    width="22.5"
    height="22.5"
    rx="11.25"
    stroke="currentColor"
    stroke-width="1.5"
  />
</svg>
