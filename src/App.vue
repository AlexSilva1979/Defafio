<template>
   <div id="apps" >
      <HeaderComponent title="Projeto - Desafio Sesab"/>
      <ContentComponent/>
      <FooterComponent/>
  </div>
</template>

<script>
import {userKey } from '@/global'
import HeaderComponent from "@/components/template/HeaderComponent.vue"
import ContentComponent from "@/components/template/ContentComponent.vue"
import FooterComponent from "@/components/template/FooterComponent.vue"
import { mapState } from 'vuex';
export default {
  name: 'App',
  computed: mapState(['user']),
  components: {
    HeaderComponent,
    ContentComponent,
    FooterComponent
  },
  methods: {
        startApp() {
			this.$store.commit('setUser', null)
            localStorage.setItem(userKey, null)
            
            }
    },
	mounted(){
		this.startApp()
	}
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
	}

	#apps {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
	
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"content content"
			"menu footer";
	}

	/* #app.hide-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	} */
</style>
