<script lang="ts">
	import Gear from './Gear.svelte'
	export let Hst

	let outerDiameter: number = 200
	let innerRate: number = 20
	let teethNumber: number = 12
	let teethWidth: number = 30
	let teethDepth: number = 20
	let rotate: number = 0
	let color: string = '#ffffff'

	$: if (rotate >= 360) {
		rotate = 0
	} else if (rotate < 0) {
		rotate = 360
	}

	const onwheel = (e: CustomEvent<WheelEvent>) => {
		if (e.detail.deltaY > 0) {
			rotate += 10
		} else {
			rotate -= 10
		}
	}

	const onMove = (e: CustomEvent<TouchEvent>) => {
		console.log(e)
	}
</script>

<Hst.Story>
	<Gear
		{outerDiameter}
		innerRate={innerRate / 100}
		{teethNumber}
		{teethWidth}
		{teethDepth}
		{rotate}
		{color}
		on:wheel={onwheel}
		on:touchmove={onMove}
	/>
	<svelte:fragment slot="controls">
		<Hst.Number
			bind:value={outerDiameter}
			title="Outer Diameter"
		/>
		<Hst.Slider
			bind:value={innerRate}
			min="0"
			max="90"
			title="Inner Rate"
		/>
		<Hst.Number
			bind:value={teethNumber}
			title="Teeth Number"
		/>
		<Hst.Number
			bind:value={teethWidth}
			title="Teeth Width"
		/>
		<Hst.Number
			bind:value={teethDepth}
			title="Teeth Depth"
		/>
		<Hst.Slider
			bind:value={rotate}
			min="0"
			max="360"
			title="Rotate"
		/>
		<Hst.ColorSelect bind:value={color} title="Color" />
	</svelte:fragment>
</Hst.Story>
