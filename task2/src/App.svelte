<script lang="ts">
  import Input from "./lib/Input.svelte";
  import Selector from "./lib/Selector.svelte";
  import { currencies } from "./lib/supportedCurrencies";
  let selectedCurrencies = {
    FROM: "USD",
    TO: "RUB",
    RATE: 0,
  };
  let amountFrom: Number;
  let amountTo: Number;

  const fetchExchangeRate = async () => {
    const result = await fetch(
      `https://v6.exchangerate-api.com/v6/6b553f8d4b57b44196a0e210/pair/${selectedCurrencies.FROM}/${selectedCurrencies.TO}`
    );
    let resposne;
    if (result.status === 200) {
      resposne = await result.json();
    } else {
      throw new Error("CANT CONVERT");
    }
    selectedCurrencies.RATE = resposne.conversion_rate;
    amountTo = Number(amountFrom) * selectedCurrencies.RATE;
  };

  const changeCurrency = async (event: CustomEvent) => {
    const {
      currencyType,
      selectedCurrency,
    }: { currencyType: string; selectedCurrency: string } = event.detail;
    selectedCurrencies[currencyType as keyof typeof selectedCurrencies] =
      selectedCurrency;
    await fetchExchangeRate();
  };

  const recalculate = (event: CustomEvent) => {
    const { inputType, value }: { inputType: string; value: string } =
      event.detail;
    if (inputType == "FROM") {
      amountFrom = Number(value);
      amountTo = Number(value) * selectedCurrencies.RATE;
    } else {
      amountTo = Number(value);
      amountFrom = Number(value) / selectedCurrencies.RATE;
    }
  };
</script>

<main>
  <h1>Convert Currencies</h1>
  {#await fetchExchangeRate()}
    <h2>Fetching current exchange rates....</h2>
  {:then}
    <div class="inputs-box">
      <div class="card">
        <Selector
          selected="USD"
          options={currencies}
          on:changeCurrency={changeCurrency}
          currencyType="FROM"
        />
        <p>
          <Input
            value={amountFrom}
            inputType="FROM"
            on:recalculate={recalculate}
          />
        </p>
      </div>
      <div class="card">
        <Selector
          selected="RUB"
          options={currencies}
          on:changeCurrency={changeCurrency}
          currencyType="TO"
        />
        <p>
          <Input value={amountTo} inputType="TO" on:recalculate={recalculate} />
        </p>
      </div>
    </div>
  {:catch error}
    <h2>Could not fetch exchange rates</h2>
    <p>{error}</p>
  {/await}
</main>

<style>
  .inputs-box {
    display: flex;
    flex-direction: row;
  }
</style>
