<script lang="ts">
  export let options: string[];
  export let selected: string;
  export let currencyType: string;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const changeCurrency = () => {
    dispatch("changeCurrency", {
      currencyType,
      selectedCurrency: selected,
    });
  };
</script>

<select bind:value={selected} on:change={changeCurrency}>
  {#each [...options] as currency}
    <option value={currency}>{currency}</option>
  {/each}
</select>
