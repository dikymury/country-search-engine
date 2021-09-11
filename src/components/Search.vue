<template>
    <div class="con-search">
        <div class="box-search">
            <input type="text" placeholder="Type any country name" v-model="search" @keyup="changeSearch" class="input-search">
            <i class="feather icon-search"></i>
        </div>
        <ul class="suggestions" v-if="search.length">
            <li v-for="(x,i) in results" :key="i" @click="$router.push({name:'Detail', params:{id: x.name}})">
                {{x.name}}
            </li>
            <li class="not-found" v-if="!results.length">
                Not Found
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'Search',
    data() {
        return {
            search:'',
        }
    },
    computed: {
        results(){
            return this.$store.state.results
        }
    },
    methods: {
        changeSearch(){
            if(this.search.length){
                this.$store.commit("SET_RESULTS", this.search)
            }
        },
        getCountry(){
             this.$store.dispatch("getSuggestions")
        }
    },
    created() {
         this.getCountry();
    },
}
</script>