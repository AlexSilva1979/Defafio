<template>
    
    <header class="header">
        <router-link to="/" >
            <img src="../../assets/LOGO-ESTADO-W.png"> 
        </router-link>
        
       
        <h1 class="title">
           <i class="fa fa-cogs"></i> {{ title }}
        </h1>
        <UserDropdown />  
    </header>

</template>

<script>
import {mapState} from 'vuex'
import UserDropdown from './UserDropdown.vue'

export default {
    name: 'HeaderComponent',
    components: { UserDropdown },
    props:{
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    computed: mapState(['user'])
    
}
</script>


<style >
    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: #FFF;
        text-decoration: none;
    }

    .title a:hover {
        color: #FFF;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
