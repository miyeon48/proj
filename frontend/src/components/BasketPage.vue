<template>
  <div class="movies">
    <h1>장바구니 목록</h1>
    <div v-for="item in items" class="table">
        <div class="table-box">
            <img :src="'../../static/images/'+item.image"> 
            <div class="table-text">
                <strong>{{item.catagory}}</strong>
                <i>{{item.name}}</i><br>
                <i>{{item.price}}원</i>
                <router-link :to="{ name: 'show', params: {id: item.id }}">삭제</router-link>
            </div>
      </div>
    </div>
  </div>
</template>
<style>

#app {
    padding-left:20%;
    padding-right:20%;

}

img{
    width : 200px;
    height: 220px;
}

.table{
    display:inline-block;
    width : 20%;
    margin : 10px;
}

</style>
<script>
export default {
  created () {
    this.$http.get('/api/basket')
    .then((response) => {
      this.items = response.data
    })
  },
  data () {
    return {
      items : []
    }
  }
}
</script>