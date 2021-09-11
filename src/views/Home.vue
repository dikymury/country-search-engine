<template>
  <div class="con-center">
    <h1>Country</h1>
    <Search/>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue'

export default {
  name: 'Home',
  components: {
    Search
  }
}
</script>
