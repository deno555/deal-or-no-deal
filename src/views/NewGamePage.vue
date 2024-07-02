<template>
	<div style="display: flex; flex-direction: column; justify-content: center; height: 100vh;">
		<h1 style="display: flex; justify-content: center; font-size: 60px; color: white">Deal or No Deal</h1>
		
		<router-link :to="{name: 'Game'}">
			<div style="display: flex; justify-content: center; margin-top: 20px;">
				<h2 style="background-color: grey; width: 400px; text-align: center; font-size: 30px;">Nová hra</h2>
			</div>
		</router-link>
		
		<router-link :to="{name: 'Rules'}">
			<div style="display: flex; justify-content: center; margin-top: 20px;">
				<h2 style="background-color: grey; width: 400px; text-align: center; font-size: 30px;">Pravidlá</h2>
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
</style>