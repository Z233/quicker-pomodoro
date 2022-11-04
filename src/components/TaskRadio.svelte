<script>
  export let task = ''
</script>

<div class="flex items-center space-x-2 py-3">
  <input
    class="scale-110"
    id={task}
    name="task"
    value={task}
    type="radio"
  />
  <label for={task}>
    {task}
  </label>
</div>
