<script lang="ts">
  let className: string | undefined

  export { className as class }
</script>

<span
  class={`text-sm inline-block px-3 py-1.5 rounded-full bg-white mr-2 mb-2 relative ${
    className || ''
  }`}
>
  <slot />
</span>
