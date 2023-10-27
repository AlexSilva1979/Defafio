<template>
    <div class="person-admin">

        <b-form >
            <input id="person-id" type="hidden" v-model="person.id" />
           
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="person-name" class="has-validation">
                        <b-form-input id="person-name" type="text"
                            v-model="person.name" required
                           placeholder="Informe o Nome..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="CPF:" label-for="person-cpf">
                        <b-form-input id="person-cpf" type="number"
                            v-model="person.document" required
                            placeholder="Informe o cpf..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="person-email">
                        <b-form-input id="person-email" type="email"
                            v-model="person.email" required
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Perfil do usuário:">
                        <b-form-select class="form-control" v-model="person.profileId" :readonly="mode === 'remove'">
                            <option v-for="(profile, index) in profiles" :key="index" v-bind:value="profile.id">
                                {{profile.name}}
                            </option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            
           
            
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                    <b-button class="ml-2" @click="voltar">Voltar</b-button>
                </b-col>
            </b-row>

            <Addresslist />
           
            
        </b-form>
       
    </div>
</template>

<script>
import Addresslist from '@/components/AddressList'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex';

export default {
    name: 'PersonAdmin',
    components:{Addresslist},
    computed: mapState(['personKey']),
    data: function() {
        return {
            mode: 'save',
            person: {},
            profiles: []
        }
    },
    methods: {
        voltar()
            {
                this.$router.push({ path: '/search' })
            },
        reset() {
            this.mode = 'save'
            this.person = {}
            this.loadProfiles()
        },
        save() {
            const method = this.person.id ? 'put' : 'post'
            const id = this.person.id ? `/${this.person.id}` : ''
            
            

            axios[method](`${baseApiUrl}/person${id}`, this.person)
                .then(res => {
                    this.personCad = JSON.stringify(res.data)
                })
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    // this.reset()
                    
                })
                .catch(showError)
        },
        loadProfiles() {
            const url = `${baseApiUrl}/profile`
            axios.get(url).then(res => {
                this.profiles = res.data
            })
            
        },
        loadPerson(person, mode = 'save') {
            this.mode = mode
            this.person = { ...person }
            
        }
    },
    mounted() {
       this.loadPerson()
       this.loadProfiles()
     }
}
</script>

<style>

</style>
