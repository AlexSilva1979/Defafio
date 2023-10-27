<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Superando desafios!" />
        <div class="stats">
            <StatComponent title="Persons" :value="stat.persons"
                icon="fa fa-file" color="#3bc480" />
            <StatComponent title="Users" :value="stat.users"
                icon="fa fa-user" color="#3282cd" />
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import StatComponent from './StatComponent'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'HomeComponent',
    components: { PageTitle, StatComponent },
    data: function() {
        console.log('dados do componente');
        return {
            stat: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats()
        }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
