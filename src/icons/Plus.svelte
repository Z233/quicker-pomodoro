<script lang="ts">
  let className: string | undefined = undefined

  export { className as class }
</script>

<svg
  class={className || ''}
  stroke-width="1.5"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M6 12h6m6 0h-6m0 0V6m0 6v6"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
