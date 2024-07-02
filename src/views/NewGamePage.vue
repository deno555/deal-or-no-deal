<template>
	<div class="page">
		<h1 class="title">Deal or No Deal</h1>
		
		<router-link :to="{name: 'Game'}">
			<div class="button">
				<h2 class="button__text">Nová hra</h2>
			</div>
		</router-link>
		
		<router-link :to="{name: 'Rules'}">
			<div class="button">
				<h2 class="button__text">Pravidlá</h2>
			</div>
		</router-link>

	</div>
</template>

<script>

</script>

<style lang="sass">
	a	
		text-decoration: none
		color: black

	.page
		display: flex 
		flex-direction: column 
		justify-content: center 
		height: 100vh
	
	.title
		display: flex 
		justify-content: center 
		font-size: 60px 
		color: white
	
	.button
		display: flex
		justify-content: center 
		margin-top: 20px

		&__text
			background-color: grey 
			width: 400px 
			text-align: center 
			font-size: 30px
</style>