<template>
  <div style="width: 500px; margin-top: 50px">
    <img style="width: 100%" src="./assets/poster.png" />
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
      "
    >
      <el-select v-model="name1" placeholder="Select One">
        <el-option
          v-for="item in nameOptions"
          :key="item"
          :label="item"
          :value="item"
          :disabled="item === name2"
        />
      </el-select>
      <div @click="start" style="margin: 0 20px; cursor: pointer">
        <img
          :class="animateClass"
          style="width: 100%"
          src="./assets/qian.png"
        />
      </div>
      <el-select v-model="name2" placeholder="Select Two">
        <el-option
          v-for="item in nameOptions"
          :key="item"
          :label="item"
          :value="item"
          :disabled="item === name1"
        />
      </el-select>
    </div>
    <div class="img-row">
      <el-button
        type="warning"
        plain
        :disabled="!this.name1 || !this.name2"
        @click="start"
        >开始测算</el-button
      >
      <el-button type="danger" plain @click="radom">随机测算</el-button>
    </div>
    <el-dialog
      v-model="dialogVisible"
      top="0px"
      width="800px"
      :before-close="handleClose"
    >
      <div style="margin-bottom: 30px" class="cl-card">
        <div
          class="text cl-result"
          :class="getPartnerShipClass(resultData.partnership)"
        >
          {{ resultData.partnership }}
          <img
            v-if="resultData.partnership === '机缘不足'"
            class="cl-tears"
            src="@/assets/grin-squint-tears.png"
          />
        </div>
        <div
          class="img-row"
          style="display: flex"
          :style="{
            justifyContent: resultData.shipImage ? 'center' : 'space-between',
          }"
        >
          <img class="header-img cl-avator" :src="tranSrc(resultData.aimage)" />
          <img class="header-img cl-avator" :src="tranSrc(resultData.bimage)" />
        </div>
        <!-- <div class="text">关系写照</div> -->
        <img
          class="shop-img cl-mt10"
          v-if="resultData.shipImage"
          :src="tranSrc(resultData.shipImage)"
          alt=""
        />
      </div>

      <div class="row" v-if="resultData.paAdditionalShip">
        <div class="text">
          <div>
            {{ resultData.paAdditionalShip.aname }} &&
            {{ resultData.paAdditionalShip.bname }}
          </div>
          <span class="cl-red cl-subtitle">{{
            resultData.paAdditionalShip.partnership
          }}</span>
        </div>
        <div class="img-row">
          <img
            class="header-img cl-avator"
            :src="tranSrc(resultData.paAdditionalShip.aimage)"
          />
          <i class="cl-love" />
          <img
            class="header-img"
            :src="tranSrc(resultData.paAdditionalShip.bimage)"
          />
        </div>
        <!-- <div class="text">关系写照</div> -->
        <img
          class="shop-img cl-mt10"
          v-if="resultData.paAdditionalShip.shipImage"
          :src="tranSrc(resultData.paAdditionalShip.shipImage)"
          alt=""
        />
      </div>

      <div class="row" v-if="resultData.pbAdditionalShip">
        <div class="text">
          <div>
            {{ resultData.pbAdditionalShip.aname }} &&
            {{ resultData.pbAdditionalShip.bname }}
          </div>
          <span class="cl-red cl-subtitle">{{
            resultData.pbAdditionalShip.partnership
          }}</span>
        </div>

        <div class="img-row">
          <img
            class="header-img cl-avator"
            :src="tranSrc(resultData.pbAdditionalShip.aimage)"
          />
          <i class="cl-love" />
          <img
            class="header-img"
            :src="tranSrc(resultData.pbAdditionalShip.bimage)"
          />
        </div>
        <!-- <div class="text">关系写照</div> -->
        <img
          class="shop-img"
          v-if="resultData.pbAdditionalShip.shipImage"
          :src="tranSrc(resultData.pbAdditionalShip.shipImage)"
          alt=""
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "App",
  components: {},
  data() {
    return {
      dialogVisible: false,
      name1: "",
      name2: "",
      animateClass: "",
      nameOptions: [
        "艾广华",
        "程兵",
        "陈国希",
        "陈琳",
        "陈倩倩",
        "番自蓉",
        "金鹏辉",
        "康政阳",
        "匡攀",
        "李娟",
        "林庆",
        "刘暻蓓",
        "刘颖",
        "鲁玉兰",
        "吕莉苹",
        "全小珍",
        "任金波",
        "山坤",
        "王平",
        "王邵辉",
        "王树浩",
        "王汶玉",
        "王雪晴",
        "魏怡",
        "吴隆月",
        "谢伟",
        "薛浩",
        "徐蕾",
        "徐乐曼",
        "徐权",
        "杨东升",
        "杨强",
        "严丽",
        "廉基润",
        "易伟",
        "曾琴",
        "曾涛",
        "张德文",
        "张涛",
        "张栩嘉",
        "张柱超",
        "钟灵",
        "朱艺丹",
        "邹超",
      ],
      resultData: {},
    };
  },
  methods: {
    start() {
      if (this.name1 && this.name2) {
        this.animateClass = "ani-start";
        setTimeout(() => {
          fetch(`/hk/ships/ce?pa=${this.name1}&pb=${this.name2}`).then((e) => {
            e.json().then((re) => {
              this.animateClass = "ani-scale";
              this.resultData = re.data;
              setTimeout(() => {
                this.dialogVisible = true;
              }, 1000);
            });
          });
        }, 3000);
      }
    },
    radom() {
      let len = this.nameOptions.length;
      this.name1 = this.nameOptions[Math.floor(Math.random() * len + 1)];
      this.name2 = this.nameOptions[Math.floor(Math.random() * len + 1)];
      if (this.name1 === this.name2) {
        return this.radom();
      }
      this.start();
    },
    handleClose() {
      this.animateClass = "";
      this.dialogVisible = false;
    },
    tranSrc(path) {
      return "/hk/" + path;
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
};
/* eslint-disable */
</script>

<style>
body {
  background: url("~@/assets/bg.png");
  background-size: cover;
}
#app,
body,
html {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}

.el-input {
  height: 30px;
}

.ani-start {
  animation: AniStart 0.6s linear both infinite;
}

.ani-scale {
  animation: AniScale 0.6s linear both;
}
.img-row {
  display: flex;
  align-items: center;
  justify-content: center;
}
@keyframes AniStart {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(30deg);
  }
  50% {
    transform: rotate(0);
  }
  75% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(0);
  }
}

@keyframes AniScale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.5);
  }
}

.header-img {
  width: 100px;
  margin: 6px;
}

.row {
  margin-top: 40px;
}

.text {
  font-size: 20px;
  margin-bottom: 4px;
}

.shop-img {
  width: 300px;
}
.el-dialog {
  background: #e5cda5;
  padding: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.cl-result {
  font-family: LUO;
  font-size: 32px;
  letter-spacing: 4px;
  color: #522ec1;
  /* background: url('~@/assets/ribbon.webp') no-repeat center/cover; */
}

.cl-avator {
  border-radius: 50%;
  border: 1px solid #9d8282;
}

.cl-card {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgb(182, 137, 137);
}

.cl-love {
  width: 40px;
  height: 40px;
  margin: 0 20px;
  background: url("~@/assets/love.png") no-repeat center/cover;
}

.cl-gray {
  color: #584e4e;
}

.cl-red {
  color: #e14065;
}

.cl-subtitle {
  font-size: 16px;
  font-weight: bold;
  margin-top: 6px;
}

.cl-tears {
  width: 28px;
  height: 28px;
}

.cl-mt10 {
  margin-top: 10px;
}
</style>
