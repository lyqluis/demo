<template>
    <div id="search">
        <logo @whichEngine="selectEngine"/>
        <div id="headsearch">
            <input type="text" 
                placeholder="what do you want ?" 
                autofocus='autofocus' 
                v-model="iptVal" 
                @keyup="get"
                @keyup.enter='search'
                @keyup.up.prevent='upordown'
                @keyup.down.prevent='upordown'>
            <span @click="search">搜索</span>
        </div>
        <ul v-if="showMenu">
            <li v-for="(item,index) in menuData"
                :key="item"
                :class="{choose: index === now}"
                @click="selectMenuClick(item)"
                @mouseover="chooseIndex(index)"
            >{{item}}</li>
        </ul>
    </div>
</template>

<script>
import logo from "./logo";
const jsonp = require("jsonp");

export default {
  components: {
    logo
  },
  data() {
    return {
      iptVal: "",
      menuData: [],
      showMenu: false,
      engineSrc: "",
      now: 0
    };
  },
  computed: {
    computedIptVal() {
      return this.iptVal.trim();
    }
  },
  methods: {
    get(e) {
      let thisVue = this;
      //阻止上下选择的时候因为实时改变iptval导致提示框也在变化
      //即当上下键的时候阻止回调
      if (e.keyCode === 38 || e.keyCode === 40) {
        return;
      }
      jsonp(
        "http://suggestion.baidu.com/su?wd=" +
          this.computedIptVal +
          "&cb=window.baidu.sug",
        null,
        // 回调函数
        (window.baidu = {
          sug(json) {
            thisVue.menuData = json.s;
          }
        })
      );
      this.showMenu = true;
    },
    upordown(e) {
      switch (e.keyCode) {
        case 38:
          this.now--;
          this.now = this.now === -1 ? this.menuData.length - 1 : this.now;
          break;
        case 40:
          this.now++;
          this.now = this.now === this.menuData.length ? 0 : this.now;
          break;
      }
      this.iptVal = this.menuData[this.now];
    },
    selectEngine(src) {
      this.engineSrc = src;
    },
    selectMenuClick(item) {
      this.iptVal = item;
      this.search();
    },
    chooseIndex(index) {
      this.now = index;
    },
    search() {
      if (!this.engineSrc) {
        alert("choose a search engine ! ");
        return;
      }
      //window.open(this.engineSrc + this.iptVal);
      window.location.href = this.engineSrc + this.iptVal;
      this.iptVal = "";
      this.showMenu = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
div#search {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
div#headsearch {
  width: 800px;
  height: 3em;
  display: flex;
  justify-content: space-between;
  line-height: 3em;
  margin-top: 20px;
}

input {
  width: 80%;
  line-height: normal;
}

span {
  background: lightblue;
  display: inline-block;
  text-align: center;
  width: 20%;
}
span:hover {
  cursor: pointer;
}
ul {
  list-style: none;
}
li {
  width: 800px;
  background: rgba(255, 255, 255, 0.5);
}
.choose {
  background: rgba(0, 0, 0, 0.5);
  color: aliceblue;
}
@media screen and (max-width: 768px) {
  div#search{
    width: 100%;
  }
  div#headsearch,
  ul{
    width: 80%;
  }
  ul li{
    width: 100%;
  }
}
</style>