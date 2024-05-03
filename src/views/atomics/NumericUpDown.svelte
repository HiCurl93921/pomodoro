<script lang="ts">
	export let value: number
	export let paddingDigits: number = 2
	export let max: number = 100
	export let min: number = 0
	export let width: string
	export let height: string
	export let heightRatio: number[] = [1, 2, 1]
	export let fontSize: string
	export let disabled: boolean = false

	const zeroPadding = (
		target: number | undefined,
		digits: number,
	) => {
		return (target ?? 0).toString().padStart(digits, '0')
	}

	let displayValue = zeroPadding(value, paddingDigits)

	const up = () => {
		if (value < max) {
			value++
			displayValue = zeroPadding(value, paddingDigits)
		}
	}

	const down = () => {
		if (value > min) {
			value--
			displayValue = zeroPadding(value, paddingDigits)
		}
	}

	const inputChanged = (e: {
		currentTarget: HTMLInputElement
	}) => {
		const newValue = parseInt(
			e.currentTarget.value === ''
				? '0'
				: e.currentTarget.value,
		)
		if (newValue > max) {
			value = max
		} else if (newValue < min) {
			value = min
		} else {
			value = newValue
		}
		displayValue = zeroPadding(value, paddingDigits)
	}
</script>

<div
	class="numeric-up-down"
	style="width: {width}; height: {height};"
>
	<button
		class="button"
		on:click={up}
		{disabled}
		style:flex-grow={heightRatio[2]}
	>
		{#if !disabled}
			<div class="triangle up" />
		{/if}
	</button>
	<input
		type="number"
		class="input"
		style="font-size: {fontSize}"
		bind:value={displayValue}
		on:input={inputChanged}
		{disabled}
		style:flex-grow={heightRatio[1]}
	/>
	<button
		class="button"
		on:click={down}
		{disabled}
		style:flex-grow={heightRatio[2]}
	>
		{#if !disabled}
			<div class="triangle down" />
		{/if}
	</button>
</div>

<style lang="scss">
	.numeric-up-down {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 5px;
	}

	.input {
		width: 100%;
		text-align: center;
		font-weight: bold;
		color: white;
		border: none;
		background-color: transparent;

		// デフォルトの矢印を消す
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}

		&::-webkit-outer-spin-button {
			-webkit-appearance: none;
		}
	}

	.button {
		appearance: none;
		color: white;
		background-color: transparent;
		border: none;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			cursor: pointer;
		}

		&:active {
			transform: scale(0.9);
		}
	}

	.triangle {
		background: #ffffff;
		height: 90%;
		width: 80%;
	}

	.up {
		clip-path: polygon(50% 0, 100% 100%, 0 100%);
	}

	.down {
		clip-path: polygon(0 0, 100% 0, 50% 100%);
	}
</style>
