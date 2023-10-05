<script lang="ts">
  import { afterUpdate, createEventDispatcher } from "svelte";
  export let inputType: string;
  export let value: Number;
  const dispatch = createEventDispatcher();

  const recalculate = () => {
    dispatch("recalculate", {
      inputType,
      value,
    });
  };
</script>

<input type="number" bind:value on:input={(e) => recalculate()} max="5" />
