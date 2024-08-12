<script context="module" lang="ts">
	import { createEventDispatcher } from 'svelte'
</script>

<script lang="ts">
	export let setTime: number
	export let currentTime: number
	export let isStop: boolean
	export let diameter: number = 300

	$: borderThickness = diameter / 30
	$: fontSize = diameter * 0.15
	$: sectorDiameter = diameter * 0.9
	$: rotate = (100 * currentTime) / setTime

	$: radius = diameter / 2

	const toothWidth = 70
	const toothHeight = 40
	const toothNumber = 10
	$: toothAngles = Array.apply(
		null,
		new Array(toothNumber),
	).map(
		(_, i) => i * (360 / toothNumber) + currentTime * 100,
	)

	const dispatch = createEventDispatcher()

	const onClick = () => {
		dispatch('click')
	}
</script>

<div class="clock-face">
	<button
		class="clock"
		on:click={onClick}
		style:width={`${diameter}px`}
		style:height={`${diameter}px`}
		style:border={`${borderThickness}px solid white`}
	>
		{#each toothAngles as angle (angle)}
			{@const theta = Math.PI * (angle / 180)}
			{@const top =
				-(radius + toothHeight / 2 - borderThickness) *
					Math.cos(theta) +
				radius -
				(borderThickness + toothHeight / 2)}
			{@const left =
				-(radius + toothHeight / 2 - borderThickness) *
					Math.sin(theta) +
				radius -
				(borderThickness + toothWidth / 2)}
			<div
				class="tooth"
				style:width={`${toothWidth}px`}
				style:height={`${toothHeight}px`}
				style:top={`${top}px`}
				style:left={`${left}px`}
				style:transform={`rotate(${-angle}deg)`}
			/>
		{/each}
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
		z-index: 2;
	}

	.tooth {
		position: absolute;
		z-index: 1;
		background: white;

		clip-path: polygon(5% 0, 95% 0, 100% 100%, 0 100%);
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
		border-radius: 50%;
	}
</style>
