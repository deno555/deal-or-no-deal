<template>
	<div class="boxes">
		<div v-for="box in allItems" :key="box.id">
			<h1 class="box" v-if="boxAvailable(box.id)" @click="pick(box.id)">{{ box.id }}</h1>
		</div>
	</div>

	<div class="mainInfo" :class="{'centering': start}">
		<h1 v-if="start">Vyber si box</h1>
		<h1 v-else class="mainInfo__gameInfo">{{ 'Vyberi do zavolania: ' + callCount }}</h1>
		<h1 v-if="myBox" class="mainInfo__gameInfo">{{ 'Tvoje cislo: ' + myBox.id }}</h1>
	</div>

	<div @click="showTable = !showTable" class="tablePopup">
		<h1 v-if="!showTable">\/ Zobraz tabuľku \/</h1>
		<h1 v-else>/\ Zobraz tabuľku /\</h1>
	</div>

	<div class="centering">
		<div v-if="showTable" class="priceTable">
			<div v-for="price in prices" :key="price" class="priceTable__cell">
				<p @click="priceAvailable(price)" v-if="priceAvailable(price)" style="color: white">{{ formatNumber(price) }}</p>
			</div>
		</div>
	</div>

	<DealerPopup :dealerCalling="dealerCalling && !showPrice" @decline="declineOffer" :average="formatNumber(offer)" title="Dealer volá, chces zobrat ponuku?" @koniec="koniec = true, dealerCalling = false"/>

	<FinalOffer :lastDecision="final" @finalPrice="decision"/>

	<router-link :to="{name: 'NewGame'}">
		<div v-if="koniec" class="winScreen">
			<div class="winScreen__main">
				<h1 class="centering">Vyhral si</h1>
				<h1 class="centering">{{ formatNumber(vyhra ? vyhra : offer) + ' €' }}</h1>
				<h1 class="centering">Klikni kdekoľvek pre novú hru</h1>
			</div>
		</div>
	</router-link>

	<div v-if="showPrice" class="pickScreen" @click="showPrice = false">
		<div class="pickScreen__main">
			<h1 class="centering">Zahodil si</h1>
			<h1 class="centering">{{ formatNumber(picked) + ' €' }}</h1>
			<h1 class="centering">Klikni kdekoľvek</h1>
		</div>
	</div>
</template>

<script>
import DealerPopup from '../components/DealerPopup.vue'
import FinalOffer from '../components/FinalOffer.vue'

	export default {
		components: {
			DealerPopup,
			FinalOffer
		},

		data(){
			return{
				items: [],
				prices: [ 0.01, 1 , 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000 , 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000],
				callCount: 6,
				stage: 1,
				dealerCalling: false,
				start: true,
				myBox: '',
				final: false,
				vyhra: 0,
				koniec: false,
				showPrice: false,
				picked: 0,
				showTable: false,
				allItems: []
			}
		},

		computed: {
			offer() {
				let available = this.myBox.price;
				let cycles = 1
				for (let i=0; i < this.items.length; i++){
					available += this.items[i].price
					cycles++
				}
				return Math.round(available / cycles)
			},
		},

		methods: {
			newGame(){
				this.items = []
				this.allItems = []
				let randomPrices = this.prices.slice()

				for (let i = randomPrices.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i+1));
					[randomPrices[i], randomPrices[j]] = [randomPrices[j], randomPrices[i]];
				}

				for(let i = 0; i < 26; i++) {
					this.items.push({id: i+1, price: randomPrices[i]})
					this.allItems.push({id: i+1, price: randomPrices[i]})
				}
			},

			pick(id){
				const index = this.items.findIndex(item => item.id === id)

				this.picked = this.items[index].price

				if(!this.start) {
					this.showPrice = true
					this.callCount--
				}

				if(this.myBox == 0){
					this.myBox = this.items[index]
					this.start = false
				}

				if(index !== -1){
					this.items.splice(index, 1)
				}
			},

			declineOffer(){
				this.dealerCalling = false
				if(this.stage == 10) this.final = true
			},

			priceAvailable(price){
				let available = []
				available.push(this.myBox?.price)
				
				for(let i = 0; i < this.items.length; i++) {
					available.push(this.items[i].price)
				}

				if(available.includes(price)) {
					return true
				}
				else {
					return false
				}
			},

			boxAvailable(id){
				let available = []

				for(let i = 0; i < this.items.length; i++) {
					available.push(this.items[i].id)
				}

				if(available.includes(id)) {
					return true
				}
				else {
					return false
				}
			},

			decision(answer){
				if(answer) {
					this.vyhra = this.items[0].price
					this.final = false
					this.koniec = true
				}
				else {
					this.vyhra = this.myBox.price
					this.final = false
					this.koniec = true
				}
			},

			formatNumber(num) {
				if (typeof num !== 'number') {
					num = parseFloat(num);
				}
				return num.toLocaleString('en').replace(/,/g, ' ');
			}
		},

		mounted(){
			this.newGame()
		},

		watch: {
			callCount(){
				if(this.callCount == 0) {
					this.stage++

					switch(this.stage) {
						case 1: this.callCount = 6; break;
						case 2: this.callCount = 5; break;
						case 3: this.callCount = 4; break;
						case 4: this.callCount = 3; break;
						case 5: this.callCount = 2; break;
						default: this.callCount = 1; break;
					}
				}
			},

			stage(){
				this.dealerCalling = true
			}
		}
	}

</script>

<style lang="sass">
	a
		text-decoration: none
		color: black

	.centering
		display: flex 
		justify-content: center

	.boxes
		@media only screen and (max-width: 1030px) 
			grid-template-columns: repeat(5, 1fr)

		@media only screen and (max-width: 880px) 
			grid-template-columns: repeat(4, 1fr)

		@media only screen and (max-width: 700px) 
			grid-template-columns: repeat(3, 1fr)
		
		display: grid 
		grid-template-columns: repeat(6, 1fr)
		position: absolute
		width: 100%
		height: 83%
		
		.box
			background-color: #C0C0C0 
			height: 70% 
			width: 80% 
			margin: 10px auto
			border-radius: 20px
			font-size: 40px
			display: flex
			justify-content: center
			align-items: center
			border: 1px solid black
			background-image: url('../assets/metalCase.png')

	
	.boxes > div:nth-child(25)
		@media only screen and (min-width: 1030px) 
			grid-column: 3

		@media only screen and (max-width: 880px) 
			grid-column: 2
		
		@media only screen and (max-width: 700px) 
			grid-column: 1

	.boxes > div:nth-child(26)
		@media only screen and (max-width: 1030px) 
			grid-column: 3

	.mainInfo
		background-color: #B1CFFC
		display: flex
		position: absolute
		bottom: 30px
		width: 100%
		height: 12%

		h1
			padding: 10px

		&__gameInfo
			width: 50%
			display: flex
			justify-content: center
	
	.tablePopup
		background-color: yellow 
		display: flex 
		justify-content: center 
		position: absolute 
		bottom: 0 
		width: 100% 
		height: 5%

		h1
			margin: 0

	.priceTable
		@media only screen and (max-height: 810px) 
			grid-template-columns: repeat(13, 1fr)
			grid-auto-flow: row
			grid-template-rows: none

		grid-template-rows: repeat(13, 1fr)
		grid-auto-flow: column
		background-color: black 
		display: grid
		z-index: 1 
		border: 7px solid yellow 
		z-index: 3 
		position: absolute
		top: 0 
		width: 99% 
		height: 83.5%

		&__cell
			border: 1px solid yellow
			display: flex
			justify-content: center
			font-weight: 800
	
	.winScreen
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
	
	.pickScreen
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