<template>
  <div class="detail">
    <div class="nav-top"> 
      <Btn @click.native="$router.push({name:'Home'})"><i class="feather icon-arrow-left"></i> Back to Homepage</Btn>
    </div>
    <div class="country">
      <div class="country-content">
        <h1>
          {{detail.name}}
        </h1>
        <img :src="detail.flag" :alt="detail.name">
      </div>
      <div class="country-alias">
        <div class="ca-name" v-for="(x,i) in detail.altSpellings" :key="i">
          {{x}}
        </div>
      </div>
    </div>
    <div class="address"> 
      <div class="card card-2 card-bg-ll">
        <div class="card-label">
          LatLong
        </div>
        <div class="card-ll" v-if="detail.latlng">
          <span>
            {{ detail.latlng[0].toFixed(1) }}
          </span>,
          <span>
            {{ detail.latlng[1].toFixed(1) }}
          </span>
        </div>
      </div>
      <div class="card card-2">
        <div class="card-line-label">
          <span>Capital :</span>
          <span>{{detail.capital}}</span>
        </div>
        <div class="card-line-label">
          <span>Region :</span>
          <span>{{detail.region}}</span>
        </div>
        <div class="card-line-label">
          <span>Subregion :</span>
          <span>{{detail.subregion}}</span>
        </div>
      </div>
    </div>
    <div class="country-id">
      <div class="card-id card-2">
        <div class="ci-label">
          Calling Code
        </div>
        <div class="ci-content" v-if="detail.callingCodes">
          {{detail.callingCodes.toString()}}
        </div>
        <div class="ci-desc">
          <div class="tooltip" @mouseenter="showCode = true" @mouseleave="showCode = false">
            {{ callingcode.length }} countries&nbsp;
            <div class="show-tooltip" v-show="showCode">
              <div class="st-content" v-for="x in callingcode" :key="x.name">  
                {{x.name}}
              </div>
            </div>
          </div> with this calling code
        </div>
      </div>
      <div class="card-id card-2">
        <div class="ci-label">
          Currency
        </div>
        <div class="ci-content" v-if="detail.currencies">
          <span v-for="x in detail.currencies" :key="x.code">
            {{x.code}}
          </span>
        </div>
        <div class="ci-desc">
          <div class="tooltip" @mouseenter="showCurrency = true" @mouseleave="showCurrency = false">
            {{ currency.length }} countries&nbsp;
            <div class="show-tooltip" v-show="showCurrency">
              <div class="st-content" v-for="x in currency" :key="x.name">  
                {{x.name}}
              </div>
            </div>
          </div> with this calling code
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Btn from '@/components/Btn.vue';
export default {
  components:{
    Btn
  },
  data() {
    return {
      showCode:false,
      showCurrency:false
    }
  },
  computed:{
    detail(){
      return this.$store.state.detail
    },
    callingcode(){
      return this.$store.state.callingcode
    },
    currency(){
      return this.$store.state.currency
    }
  },
  methods:{
    getDetail(){
      let params = this.$route.params.id;
      this.$store.dispatch("getDetail",params)
    },
  },
  created(){
    this.getDetail();
  }
}
</script>
