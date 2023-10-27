<template>
    <div class="user-admin">

        <b-form >
            <input id="address-id" type="hidden" v-model="addre.id" />
            <input id="person-id" type="hidden"  />
            
        </b-form>
        <hr>
        <b-table hover striped :items="address" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadAddre(data.item)" class="mr-2">
                    <i class="fa fa-circle"></i>
                    Associar
                </b-button>
                <b-button variant="danger" @click="loadAddre(data.item, 'remove')">
                    <i class="fa fa-circle-o"></i>
                    Desassociar
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>

import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'AddressAdmin',
    data: function() {
        return {
            mode: 'save',
            addre: {},
            address: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'street', label: 'Logradouro', sortable: true },
                { key: 'zipCode', label: 'CEP', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadAddress() {
            const url = `${baseApiUrl}/address`
            axios.get(url).then(res => {
                this.address = res.data
            })
      
        },
        reset() {
            this.mode = 'save'
            this.addre = {}
            this.loadAddress()
        },
        save() {
            const method = this.addre.id ? 'put' : 'post'
            const id = this.addre.id ? `/${this.addre.id}` : ''
            
            
            axios[method](`${baseApiUrl}/address${id}`, this.addre)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
             
        },
        remove() {
            const id = this.addre.id
            axios.delete(`${baseApiUrl}/address/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                    
                })
                .catch(showError,
                
                )
                console.log(this.user)
        },
        loadAddre(addre, mode = 'save') {
            this.mode = mode
            this.addre = { ...addre }
            
        }
    },
    mounted() {
        this.loadAddress()
     }
}
</script>

<style>

</style>
