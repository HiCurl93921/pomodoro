<script context="module" lang="ts">
	import { createEventDispatcher } from 'svelte'
</script>

<script lang="ts">
	export let setTime: number
	export let currentTime: number
	export let isStop: boolean
	export let diameter: number = 300

	$: borderThickness = diameter * 0.03
	$: fontSize = diameter * 0.15
	$: sectorDiameter = diameter * 0.9

	const dispatch = createEventDispatcher()

	const onClick = () => {
		dispatch('click')
	}

	$: rotate = (100 * currentTime) / setTime
</script>

<div class="clock-face">
	<button
		class="clock"
		on:click={onClick}
		style:width={`${diameter}px`}
		style:height={`${diameter}px`}
		style:border={`${borderThickness}px solid white`}
	>
		{#if isStop}
			<div class="text" style:font-size={`${fontSize}px`}>
				START
			</div>
		{:else}
			<div
				class="sector"
				style:background={`conic-gradient(
					white 0% ${rotate}%,
					transparent ${rotate}% 100%
				)`}
				style:width={`${sectorDiameter}px`}
				style:height={`${sectorDiameter}px`}
			/>
		{/if}
	</button>
</div>

<style lang="scss">
	.clock {
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		color: white;
		position: relative;
	}

	.text {
		height: 100%;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.sector {
		width: 260px;
		height: 260px;
		border-radius: 50%;
	}
</style>
