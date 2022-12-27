<template>
  <div>
    <div class="img-row" :style="{justifyContent:data.shipImage?'center':'space-between'}">
      <div class="img-row" style="flex-direction: column">
        <img class="header-img cl-avator" :src="tranSrc(data.aimage)">
        <span>{{data.aname}}</span>
      </div>
      <template v-if="data.partnership">
        <!-- <div class="text" style="margin-top: 10px;">鉴定结果</div> -->
        <div class="text cl-result" :class="getPartnerShipClass(data.partnership)">
          {{ text || data.partnership }}
          <img
            v-if="data.partnership === '机缘不足'"
            class="cl-tears"
            src="@/assets/grin-squint-tears.png"
          />
        </div>
      </template>
      <div class="img-row" style="flex-direction: column">
        <img class="header-img cl-avator" :src="tranSrc(data.bimage)">
        <span>{{data.bname}}</span>
      </div>
    </div>
    
    <template v-if="data.shipImage">
      <!-- <div class="text" style="margin-top: 40px;">关系写照</div> -->
      <img class="shop-img" style="margin-top: 40px;" :src="tranSrc(data.shipImage)">
    </template>
    <div class="mci-area cl-card" v-if="data.mci">
      <div class="cl-title">
        <span>{{data.mci.name }} </span>
        <span class="cl-mci-type">{{data.mci.type }}</span>
      </div>
      <div class="cl-flex cl-mt10">
        <img :src="data.mci.image">
        <div class="cl-mci-content">
          <div v-for="(item,index) in data.mci.desc.split('\n')" :key="index">{{item}}</div>
        </div>
      </div>
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
    },
    getPartnerShipClass(partnership) {
      if (partnership.includes("不足")) {
        return "cl-gray";
      }
      if (partnership.includes("缘分")) {
        return "cl-red";
      }
    },
  }
}
</script>

<style scoped>
</style>
