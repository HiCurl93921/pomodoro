<script context="module" lang="ts">
	import { createEventDispatcher } from 'svelte'
</script>

<script lang="ts">
	export let outerDiameter: number
	export let innerRate: number = 0
	export let teethNumber: number
	export let teethWidth: number
	export let teethDepth: number
	export let rotate: number = 0
	export let color: string = 'white'

	$: teethAngles = Array.apply(
		null,
		new Array(teethNumber),
	).map((_, i) => i * (360 / teethNumber) + rotate)

	$: rootRadius = (outerDiameter - teethDepth * 2) / 2
	$: innerRadius =
		innerRate > 0.9
			? (rootRadius / 2) * 0.9
			: innerRate < 0
				? 0
				: rootRadius * innerRate

	$: borderThickness = rootRadius - innerRadius

	$: radiusSquare = rootRadius * rootRadius
	$: teethBottomSquare = (teethWidth / 2) * (teethWidth / 2)

	$: teethBottomRadius = Math.sqrt(
		radiusSquare - teethBottomSquare,
	)

	$: teethFullDepth =
		teethDepth + (rootRadius - teethBottomRadius)

	$: teethRadius = teethBottomRadius + teethFullDepth / 2.2

	const dispatch = createEventDispatcher()

	const onWheel = (event: WheelEvent) => {
		dispatch('wheel', event)
	}
</script>

<div
	class="gear"
	style:width={`${outerDiameter}px`}
	style:height={`${outerDiameter}px`}
	on:wheel={onWheel}
>
	<div
		class="circle"
		style:width={`${rootRadius}px`}
		style:height={`${rootRadius}px`}
		style:border={`${borderThickness}px solid ${color}`}
		style:padding={`${innerRadius}px`}
	>
		{#each teethAngles as angle (angle)}
			{@const theta = Math.PI * (angle / 180)}
			{@const top =
				-teethRadius * Math.cos(theta) +
				rootRadius -
				(borderThickness + teethFullDepth / 2)}
			{@const left =
				-teethRadius * Math.sin(theta) +
				rootRadius -
				(borderThickness + teethWidth / 2)}
			<div
				class="tooth"
				style:width={`${teethWidth}px`}
				style:height={`${teethFullDepth}px`}
				style:top={`${top}px`}
				style:left={`${left}px`}
				style:transform={`rotate(${-angle}deg)`}
				style:background-color={color}
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	.gear {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.circle {
		box-sizing: border-box;
		border-radius: 50%;
		background-color: transparent;
		position: relative;
		z-index: 1;
	}

	.tooth {
		position: absolute;
		z-index: 2;

		clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);
	}
</style>
