<template>
    <div id="mainlogo">
        <div id="headlogo">
            <span>
                <img :src="headLogo">
            </span>
            <button @click="showSelect"/>
        </div>
        <ul v-show="showList">
            <li v-for='item in searchlist' :key="item.id" @click="select(item.logo, item.src)">
                <img :src="item.logo" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchlist: [
        {
          id: 0,
          engine: "baidu",
          logo: require("../assets/baidu_logo.png"),
          src:
            "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd="
        },
        {
          id: 1,
          engine: "bing",
          logo: require("../assets/bing_logo.png"),
          src: "https://cn.bing.com/search?q="
        },
        {
          id: 2,
          engine: "sougou",
          logo: require("../assets/sougou_logo.png"),
          src: "https://www.sogou.com/web?query="
        },
        {
          id: 3,
          engine: "360",
          logo: require("../assets/360_logo.png"),
          src: "https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q="
        }
      ],
      headLogo: "",
      showList: false
    };
  },
  methods: {
    showSelect() {
      this.showList = !this.showList;
    },
    select(logo, src) {
      this.headLogo = logo;
      this.showList = false;
      //告诉父组件选中了哪个，已启动相应搜索链接
      this.$emit("whichEngine", src);
    }
  }
};
</script>

<style scoped>
#mainlogo {
  width: 100%;
}
#headlog {
  height: 2px;
  display: flex;
  justify-content: center;
}
span {
  display: inline-block;
  width: 480px;
}
button {
  display: inline-block;
  width: 30px;
  height: 20px;
  background: url("../assets/down.png") no-repeat center;
  background-color: rgba(200, 200, 200, 0.5);
  position: absolute;
}

ul {
  list-style: none;
  position: absolute;
  margin-top: -250px;
  margin-left: 80px;
}
li {
  display: flex;
  width: calc(480px * 0.7);
  justify-content: center;
  background-color: rgb(233, 209, 105);
}

li:hover{
  background: darkcyan;
}
@media screen and (max-width: 768px) {
  #mainlogo{
    width: 80%;
  }
  span{
    width: 90%;
  }
  #headlogo img,
  li img{
    width: 100%;
  }
  ul,
  li{
    width: 80%;
  }
  ul{
    margin: -50% 0 50px 0;

  }
}
</style>