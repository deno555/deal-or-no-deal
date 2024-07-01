<template>
	<div v-if="lastDecision" style="background-color: black; background-color: rgb(0,0,0, 0.5); width: 100%; height: 100%; position: fixed; z-index: 2; top: 0">
		<div style="background-color: red; z-index: 2; position: fixed; left: 50%; transform: translate(-50%, 0); top: 50%">
			<h1>Chces vymenit s poslednym boxom?</h1>
			<div style="display: flex;">
				<h1 style="width: 50%; justify-content: center; display: flex; border-right: 1px solid black" @click="finalPrice(true)">ano</h1>
				<h1 style="width: 50%; justify-content: center; display: flex" @click="finalPrice(false)">nie</h1>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			lastDecision: {
				type: Boolean,
				required: true
			}
		},

		methods: {
			finalPrice(decision){
				this.$emit('finalPrice', decision)
			}
		}
	}
</script>