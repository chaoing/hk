<template>
  <div style="width:500px;margin-top: 50px;">
    <img style="width: 100%" src="./assets/poster.png">
    <div style="display: flex;align-items:center;justify-content: space-between;margin-top: 20px;">
      <el-input v-model="name1" placeholder="Input One"></el-input>
      <div @click="start" style="margin:0 20px;cursor: pointer;">
        <img :class="animateClass" style="width: 100%" src="./assets/qian.png">
      </div>
      <el-input v-model="name2" placeholder="Input Two"></el-input>
    </div>
    <div class="img-row">
      <el-button type="warning" plain :disabled="!this.name1||!this.name2" @click="start">开始测算</el-button>
      <el-button type="danger" plain @click="radom">随机测算</el-button>
    </div>
    <el-dialog
        v-model="dialogVisible"
        top="10px"
        width="800px"
        :before-close="handleClose">
      <PatchItem v-if="!showName1Add&&!showName2Add" style="margin-bottom: 30px;" :data="resultData"></PatchItem>
      <PatchItem v-if="resultData.paAdditionalShip&&showName1Add" :data="resultData.paAdditionalShip"/>
      <PatchItem v-if="resultData.pbAdditionalShip&&showName2Add" :data="resultData.pbAdditionalShip"/>
      <div class="add-box">
        <div v-if="resultData.paAdditionalShip" @click="showName1Add=true;showName2Add=false" class="add-item">{{ name1 }}的最佳</div>
        <div v-if="resultData.pbAdditionalShip" @click="showName2Add=true;showName1Add=false" class="add-item">{{ name2 }}的最佳</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import PatchItem from '@/components/PatchItem'

export default {
  name: 'App',
  components: {PatchItem},
  data () {
    return {
      dialogVisible: false,
      name1: '',
      name2: '',
      showName1Add: false,
      showName2Add: false,
      animateClass: '',
      nameOptions: [
        '艾广华',
        '程兵',
        '陈国希',
        '陈琳',
        '陈倩倩',
        '番自蓉',
        '金鹏辉',
        '康政阳',
        '匡攀',
        '李娟',
        '林庆',
        '刘暻蓓',
        '刘颖',
        '鲁玉兰',
        '吕莉苹',
        '全小珍',
        '任金波',
        '山坤',
        '王平',
        '王邵辉',
        '王树浩',
        '王汶玉',
        '王雪晴',
        '魏怡',
        '吴隆月',
        '谢伟',
        '薛浩',
        '徐蕾',
        '徐乐曼',
        '徐权',
        '杨东升',
        '杨强',
        '严丽',
        '廉基润',
        '易伟',
        '曾琴',
        '曾涛',
        '张德文',
        '张涛',
        '张栩嘉',
        '张柱超',
        '钟灵',
        '朱艺丹',
        '邹超'
      ],
      resultData: {}
    }
  },
  methods: {
    start () {
      if (this.name1 && this.name2) {
        this.animateClass = 'ani-start'
        setTimeout(() => {
          fetch(`/hk/ships/ce?pa=${this.name1}&pb=${this.name2}`).then(e => {
            e.json().then(re => {
              if(!re.data){
                this.animateClass = ''
                return alert(re.message)
              }
              this.animateClass = 'ani-scale'
              this.resultData = re.data || {}
              setTimeout(() => {
                this.dialogVisible = true
              }, 1000)
            })
          })
        }, 3000)
      }
    },
    radom () {
      let len = this.nameOptions.length
      this.name1 = this.nameOptions[Math.floor(Math.random() * len + 1)]
      this.name2 = this.nameOptions[Math.floor(Math.random() * len + 1)]
      if (this.name1 === this.name2) {
        return this.radom()
      }
      this.start()
    },
    handleClose () {
      this.animateClass = ''
      this.dialogVisible = false
      this.showName1Add = this.showName2Add = false
    },
    tranSrc (path) {
      return '/hk/' + path
    }
  },
  mounted() {
    this.dialogVisible = true
    this.resultData = {
  "aname": "钟灵",
  "aimage": "image/persons/colleague/zhongling.png",
  "bname": "杨东升",
  "bimage": "image/persons/colleague/yangdongsheng.png",
  "partnership": "机缘不足",
  "shipImage": "",
  "mci": {
    "name": "月老灵签姻缘签第二十二签",
    "type": "中",
    "desc": "缘份指数：79\n幸福指数：49\n暧昧指数：59\n缠绵指数：99\n约会成功指数：39\n告白成功指数：59\n复合成功指数：59",
    "image": "https://img.51chouqian.com/image/yuelaoyinyuanqian/22.jpg"
  },
  "recommendedWeddingDate": null,
  "paAdditionalShip": {
    "aname": "钟灵",
    "aimage": "image/persons/colleague/zhongling.png",
    "bname": "胡军",
    "bimage": "image/stars/male/hujun.png",
    "partnership": "缘分满满",
    "shipImage": "",
    "mci": {
      "name": "月老灵签姻缘签第十二签",
      "type": "上吉",
      "desc": "缘份指数：99\n幸福指数：99\n暧昧指数：99\n缠绵指数：99\n约会成功指数：79\n告白成功指数：89\n复合成功指数：99",
      "image": "https://img.51chouqian.com/image/yuelaoyinyuanqian/12.jpg"
    },
    "recommendedWeddingDate": "2023年1月21日",
    "paAdditionalShip": null,
    "pbAdditionalShip": null
  },
  "pbAdditionalShip": {
    "aname": "杨东升",
    "aimage": "image/persons/colleague/yangdongsheng.png",
    "bname": "迪丽热巴",
    "bimage": "image/stars/female/dilireba.png",
    "partnership": "缘分满满",
    "shipImage": "",
    "mci": {
      "name": "月老灵签姻缘签第三十六签",
      "type": "上上",
      "desc": "缘份指数：99\n幸福指数：99\n暧昧指数：99\n缠绵指数：99\n约会成功指数：99\n告白成功指数：99\n复合成功指数：99",
      "image": "https://img.51chouqian.com/image/yuelaoyinyuanqian/36.jpg"
    },
    "recommendedWeddingDate": "2023年2月18日",
    "paAdditionalShip": null,
    "pbAdditionalShip": null
  }
}
  }
}
/* eslint-disable */
</script>

<style>
.add-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-item {
  width: 180px;
  height: 48px;
  line-height: 48px;
  font-size: 24px;
  color: #cf4141;
  border: 2px dashed #cf4141;
  cursor: pointer;
  border-radius: 8px;
  transition: all .4s;
}

.add-item:hover {
  background: #cf4141;
  color: white;
}

body {
  background: url("~@/assets/bg.png");
  background-size: cover;
}

#app, body, html {
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
  animation: AniStart .6s linear both infinite;
}

.ani-scale {
  animation: AniScale .6s linear both;
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
  margin: 0 20px;
  /* background: url('~@/assets/ribbon.webp') no-repeat center/cover; */
}

.cl-avator {
  border-radius: 50%;
  border: 1px solid #9d8282;
}

.cl-card {
  margin: 20px 0;
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

.cl-title {
  color: #222;
}

.cl-mt10 {
  margin-top: 10px;
}

.cl-mci-type {
  font-weight: bold;
  margin-left: 10px;
  font-size: 16px;
}

.cl-flex {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
}

.cl-mci-content {
  text-align: left;
  line-height: 3;
}
</style>
