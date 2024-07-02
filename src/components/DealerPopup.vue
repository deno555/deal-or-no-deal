<template>
	<div v-if="dealerCalling" class="dealerPopup">
		<div class="dealerPopup__main">
			<h1 class="center" v-if="!end">{{ title }}</h1>
			<h1 v-else>Si si istý?</h1>
			<div style="display: flex;">
				<h1 class="center" style="width: 50%; border-right: 1px solid black" @click="confirmation">ano</h1>
				<h1 class="center" style="width: 50%;" @click="$emit('decline')">nie</h1>
			</div>
			<h1 v-if="average" class="center">{{ average + '€' }}</h1>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			dealerCalling: {
				type: Boolean,
				required: true
			},

			average: {
				type: String,
				required: false
			},

			title: {
				type: String,
				required: true
			}
		},
		data(){
			return{
				end: false,
				// confirm: false
			}
		},

		methods: {
			confirmation(){
				if(!this.end) return this.end = true
				else this.$emit('koniec')
			}
		}
	}
</script>

<style lang="sass">
	.center
		display: flex 
		justify-content: center

	.dealerPopup
		background-color: black 
		background-color: rgb(0,0,0, 0.5) 
		width: 100% 
		height: 100% 
		position: fixed 
		z-index: 2 
		top: 0

		&__main
			background-color: red 
			z-index: 2 
			position: fixed 
			left: 50% 
			transform: translate(-50%, 0) 
			top: 50% 
			padding: 20px
</style>