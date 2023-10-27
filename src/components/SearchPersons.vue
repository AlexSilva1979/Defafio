<template>
    <div class="user-admin">

        <b-form >
            <b-row>
                <b-col md="8" sm="12">
                    <b-form-group label="Nome:" label-for="person-name" >
                        <b-form-input id="person-name" type="text"
                            v-model="person.name"/>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="CPF:" label-for="person-document" >
                        <b-form-input id="person-document" type="number"
                            v-model="person.document"/>
                    </b-form-group>
                </b-col>
            </b-row>
            
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Data Início:" label-for="person-dateStart" >
                        <b-form-input id="person-dateStart" type="date"
                            v-model="person.dateStart"/>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Data Final:" label-for="person-dateEnd" >
                        <b-form-input id="person-dateEnd" type="date"
                            v-model="person.dateEnd"/>
                    </b-form-group>
                </b-col>
            </b-row>
            
            <b-row>
                <b-col xs="6">
                    <b-form-group>
                        <b-button  @click="filterPersons">Filtrar</b-button>
                        <b-button class="ml-2" @click="reset()">Cancelar</b-button>
                        <router-link to="/personAdmin" >
                            <b-button variant="primary" class="ml-2" >Novo</b-button>
                        </router-link>
                        
                    </b-form-group>
                </b-col>
                
            </b-row>
        </b-form>
        <hr>
       
        <b-table hover striped :items="persons" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link to="/personAdmin">
                    <b-button variant="info" @click="loadPersons(data.item)" class="mr-2">
                    <i class="fa fa-bars"></i>
                </b-button>

                </router-link>
                
                
                <b-button variant="warning" @click="loadPersons(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="remove(data.item.id, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>

                
                    
                
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'SearchPersons',
    data: function() {
        return {
            person: {},
            search: {},
            OSearch: {},
            persons: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'document', label: 'CPF', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'admin', label: 'Administrador', sortable: true,
                    formatter: value => value ===1 ? 'Admin' : 'Usuário' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        // cad()
        //     {
        //         this.$router.push({ path: '/personAdmin' })
        //     },
        loadPersons() {
            const url = `${baseApiUrl}/person`
            console.log(url)
            axios.get(url).then(res => {
                this.persons = res.data
            })
        },
        filterPersons() {
            this.search= {
                "name": this.person.name,
                "document": this.person.document,
                "dateStart": this.person.dateStart,
                "dateEnd": this.person.dateEnd
            }
            console.log(this.search)
            axios.post(`${baseApiUrl}/search`, this.search).then(res => {
                this.persons = res.data
            })
        },
        reset() {
            this.person.name = '',
            this.person.document = '',
            this.person.dateStart = null,
            this.person.dateEnd = null
        },
        remove(id) {
            console.log(id)
            console.log(`${baseApiUrl}/person/${id}`)

            axios.delete(`${baseApiUrl}/person/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.loadPersons()
                    
                })
                .catch(showError,
                
                )
                console.log(this.user)
        }
        
        
    },
    mounted() {
        this.loadPersons()
        
     }
}



</script>

<style scoped>



</style>
