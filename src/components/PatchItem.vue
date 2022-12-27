<template>
  <div>
    <div class="img-row" :style="{justifyContent:data.shipImage?'center':'space-between'}">
      <div class="img-row" style="flex-direction: column">
        <img class="header-img" :src="tranSrc(data.aimage)">
        <span>{{data.aname}}</span>
      </div>
      <div class="img-row" style="flex-direction: column">
        <img class="header-img" :src="tranSrc(data.bimage)">
        <span>{{data.bname}}</span>
      </div>
    </div>
    <template v-if="data.partnership">
      <div class="text">鉴定结果</div>
      <div class="text">{{ text || data.partnership }}</div>
    </template>
    <div v-if="data.recommendedWeddingDate" style="margin:10px 0px;">原地结婚日：{{data.recommendedWeddingDate}}</div>
    <template v-if="data.shipImage">
      <div class="text" style="margin-top: 40px;">关系写照</div>
      <img class="shop-img" :src="tranSrc(data.shipImage)">
    </template>
    <div class="mci-area" v-if="data.mci">
      <div style="margin-bottom: 5px">{{data.mci.name }} {{data.mci.type }}签</div>
      <img :src="data.mci.image">
      <div v-for="(item,index) in data.mci.desc.split('\n')" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatchItem',
  props: {
    data: Object,
    text: String
  },
  methods: {
    tranSrc (path) {
      return '/hk/' + path
    }
  }
}
</script>

<style scoped>
</style>
