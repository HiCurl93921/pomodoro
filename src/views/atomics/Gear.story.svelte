<script lang="ts">
	import Gear from './Gear.svelte'
	export let Hst

	let outer: number = 200
	let innerRate: number = 20

	let teethNumber: number = 12
	let teethWidth: number = 30
	let teethDepth: number = 20
</script>

<Hst.Story>
	<div
		class="box"
		style="width: {outer}px; height: {outer}px;"
	>
		<Gear
			outerDiameter={outer}
			innerRate={innerRate / 100}
			{teethNumber}
			{teethWidth}
			{teethDepth}
			color="#101010"
		/>
	</div>
	<svelte:fragment slot="controls">
		<label for="root-diameter">Root Diameter: </label>
		<input
			type="number"
			name="root-diameter"
			bind:value={outer}
			min="0"
		/>
		<label for="inner-rate">Inner Rate: </label>
		<input
			type="range"
			name="inner-rate"
			bind:value={innerRate}
			min="0"
			max="90"
		/>
		<label for="teeth-number">Teeth Number: </label>
		<input
			type="number"
			name="teeth-number"
			bind:value={teethNumber}
			min="0"
		/>
		<label for="teeth-width">Teeth Width: </label>
		<input
			type="number"
			name="teeth-width"
			bind:value={teethWidth}
			min="0"
		/>
		<label for="teeth-depth">Teeth Depth: </label>
		<input
			type="number"
			name="teeth-depth"
			bind:value={teethDepth}
			min="0"
		/>
	</svelte:fragment>
</Hst.Story>

<style lang="scss">
	.box {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #101010;
	}
</style>
