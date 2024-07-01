<template>
	<div class="boxes">
		<div v-for="box in items" :key="box.id" class="box" @click="pick(box.id)">
			<h1 class="box__number">{{ box.id }}</h1>
		</div>
	</div>

	<div class="mainInfo" :class="{'start': start}">
		<h1 v-if="start">Vyber si box</h1>
		<h1 v-else class="mainInfo__gameInfo">{{ 'Vyberi do zavolania: ' + callCount }}</h1>
		<h1 v-if="myBox" class="mainInfo__gameInfo">{{ 'Tvoje cislo: ' + myBox.id }}</h1>
	</div>

	<DealerPopup :dealerCalling="dealerCalling && !showPrice" @decline="declineOffer" :average="offer" title="Dealer volá, chces zobrat ponuku?" @koniec="koniec = true, dealerCalling = false"/>

	<!-- <div v-if="final" style="background-color: black; background-color: rgb(0,0,0, 0.5); width: 100%; height: 100%; position: fixed; z-index: 2; top: 0">
		<div style="background-color: red; z-index: 2; position: fixed; left: 50%; transform: translate(-50%, 0); top: 50%">
			<h1>Chces vymenit s poslednym boxom?</h1>
			<div style="display: flex;">
				<h1 style="width: 50%; justify-content: center; display: flex; border-right: 1px solid black" @click="vyhra = myBox.price, final = false, koniec = true">ano</h1>
				<h1 style="width: 50%; justify-content: center; display: flex" @click="vyhra = items[0].price, final = false, koniec = true">nie</h1>
			</div>
		</div>
	</div> -->

	<FinalOffer :lastDecision="final" @finalPrice="decision"/>

	<div v-if="koniec" style="background-color: black; background-color: rgb(0,0,0, 0.5); width: 100%; height: 100%; position: fixed; z-index: 2; top: 0">
		<div style="background-color: red; z-index: 2; position: fixed; left: 50%; transform: translate(-50%, 0); top: 50%">
			<h1>Vyhral si</h1>
			<h1 style="display: flex; justify-content: center;">{{ vyhra + ' €' }}</h1>
		</div>
	</div>

	<div v-if="showPrice" style="background-color: black; background-color: rgb(0,0,0, 0.5); width: 100%; height: 100%; position: fixed; z-index: 2; top: 0" @click="showPrice = false">
		<div style="background-color: red; z-index: 2; position: fixed; left: 50%; transform: translate(-50%, 0); top: 50%">
			<h1>Zahodil si</h1>
			<h1 style="display: flex; justify-content: center;">{{ picked + ' €' }}</h1>
			<h1 style="display: flex; justify-content: center;">Klikni kdekoľvek</h1>
		</div>
	</div>

	<div @click="showTable = !showTable" style="background-color: yellow; display: flex; justify-content: center; position: absolute; bottom: 0; width: 100%;">
		<h1 v-if="!showTable" style="margin: 0">\/ Zobraz tabuľku \/</h1>
		<h1 v-else style="margin: 0">/\ Zobraz tabuľku /\</h1>
	</div>

	<div v-if="showTable" style="background-color: black; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); z-index: 1; border: 5px solid yellow; z-index: 3; position: absolute; top: 0; width: 99.27%; height: 85%">
		<div v-for="price in prices" :key="price" style="border: 1px solid yellow;">
			<p @click="priceAvailable(price)" :class="{'available': priceAvailable(price)}" style="color: white;">{{ price }}</p>
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
				showTable: false
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
				let randomPrices = this.prices.slice()

				for (let i = randomPrices.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i+1));
					[randomPrices[i], randomPrices[j]] = [randomPrices[j], randomPrices[i]];
				}

				for(let i = 0; i < 26; i++) {
					this.items.push({id: i+1, price: randomPrices[i]})
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

				if(!available.includes(price)) {
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
	body
		background-color: #031D44

	.boxes
		display: grid 
		grid-template-columns: repeat(6, minmax(0, 1fr))
		
		.box
			background-color: #efefed 
			height: 100px 
			width: 150px 
			margin: 10px auto
			border-radius: 20px

			&__number
				display: flex 
				justify-content: center 
				font-size: 40px
	.mainInfo
		background-color: #B1CFFC
		display: flex
		position: absolute
		bottom: 30px
		width: 100%

		h1
			padding: 10px

		&__gameInfo
			width: 50%
			display: flex
			justify-content: center

	.start
		display: flex
		justify-content: center

	.available
		visibility: hidden
</style>