<script lang="ts">
	export let diameter: {
		root: number
		inner?: number
	}
	export let teeth: {
		num: number
		width: number
		height: number
	}
	export let rotate: number = 0
	export let color: string = 'white'

	$: teethAngles = Array.apply(
		null,
		new Array(teeth.num),
	).map((_, i) => i * (360 / teeth.num) + rotate)

	$: radius = {
		outer: diameter.root / 2,
		inner: diameter.inner ?? 0 / 2,
	}
	$: borderThickness = radius.outer - radius.inner

	$: radiusSquare = radius.outer * radius.outer
	$: baseSquare = (teeth.width / 2) * (teeth.width / 2)

	$: teethRadius =
		Math.sqrt(radiusSquare - baseSquare) +
		teeth.height / 2.2
</script>

<div
	class="gear"
	style:width={`${diameter.root + teeth.height * 2}px`}
	style:height={`${diameter.root + teeth.height * 2}px`}
>
	<div
		class="circle"
		style:width={`${diameter.root}px`}
		style:height={`${diameter.root}px`}
		style:border={`${borderThickness}px solid ${color}`}
		style:padding={`${radius.inner}px`}
	>
		{#each teethAngles as angle (angle)}
			{@const theta = Math.PI * (angle / 180)}
			{@const top =
				-teethRadius * Math.cos(theta) +
				radius.outer -
				(borderThickness + teeth.height / 2)}
			{@const left =
				-teethRadius * Math.sin(theta) +
				radius.outer -
				(borderThickness + teeth.width / 2)}
			<div
				class="tooth"
				style:width={`${teeth.width}px`}
				style:height={`${teeth.height}px`}
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
		justify-content: center;
		align-items: center;
	}
	.circle {
		box-sizing: border-box;
		border-radius: 50%;
		background-color: transparent;
		position: relative;
		z-index: 2;
	}

	.tooth {
		position: absolute;
		z-index: 3;

		clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);
	}
</style>
