<template>
    <div class="user-admin">

        <b-form >
            <input id="address-id" type="hidden" v-model="addre.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Logradouro:" label-for="address-street" class="has-validation">
                        <b-form-input id="address-street" type="text"
                            v-model="addre.street" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Logradouro..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="CEP:" label-for="adress-zip">
                        <b-form-input id="adress-zip" type="number"
                            v-model="addre.zipCode" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o CEP..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <!-- <Addresslist/> -->
        <hr>
        <b-table hover striped :items="address" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadAddre(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadAddre(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>

// import Addresslist from '@/components/AddressList'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'AddressAdmin',
    // components:{Addresslist},
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
