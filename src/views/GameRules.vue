<template>
		<div class="rules">
			<div>
				<h1 class="rules__title">Pravidlá</h1>
				<p class="rules__point">1. Vyber si box na začiatku</p>
				<p class="rules__point">2. Zahadzuj boxy kym nezavolá dealer</p>
				<p class="rules__point">3. Po poslednom výbere môžes vymeniť box s tým ktorý ti ostal</p>
				<p class="rules__point">4. Snaž sa vyhrať čo najviac</p>
				<router-link :to="{name: 'NewGame'}">
					<p class="rules__point" style="background-color: red">Klikni ma aby si sa vrátil späť</p>
				</router-link>
			</div>
		</div>
</template>

<style lang="sass">
	.rules
		display: flex
		justify-content: center

		&__title
			color: white
			font-size: 50px

		&__point
			color: white
			font-size: 30px
</style>