<template>
  <div class="content" id="mescroll">
      <ul class="entry-list" id="mailContent">
        <li class="item" v-for="(item,i) in articles" :key="i">
              <div class="article">
                <router-link :to="{ name: 'article', params: { id: item.postId }}">
                  <div class="content-box">
                    <div class="info-box">
                        <div class="info-row title-row">
                        <router-link :to="{ name: 'article', params: { id: item.postId }}">{{item.title}}</router-link>
                      </div>
                      <div class="info-row meta-row">
                        <ul class="meta-list">
                          <li class="item">{{item.tags.indexOf(',') ? item.tags.replace(',', ' ') : item.tags}}</li>
                          <li class="item">{{time(item.date)}}·{{item.readNum?item.readNum:'0'}}人阅读</li>
                        </ul>
                      </div>
                          <!-- <div class="post-body" v-html="item.desc"></div> -->
                     </div>
                    </div>
                  </router-link>
                </div>
          </li>
      </ul>
      <div class="loadmore" v-if="!hasMore">没有更多数据了</div>
      <div class="loadmore" v-else>
          <span v-if="isLoadingData">数据加载中...</span>
      </div>
      <!-- <loading :data="articles"></loading> -->
      <to-top></to-top>
  <!-- <canvas id="canvas" width="1011" height="803"></canvas> -->
</div>

</template>

<script>
// import Loading from "./loading/loading";
// import myCanvas from "./canvas/canvas";
import ToTop from "../components/toTop/toTop.vue"
import { getArticleAll } from "../api"
import { formatTime } from "../util/util"
export default {
  data() {
    return {
      dotsNum: 60,
      articles: [],
      page: 0,
      show: false,
      max_page: 0,
      isLoadingData: false,
      hasMore: true,

    };
  },
  components: {
    ToTop
    // Loading,
    // myCanvas
  },
  computed: {
    scrollTop() {
      return this.$store.state.scrollTop;
    }
  },

  methods: {
    //加载更多
    loadMore(opts = {}) {
      this.isLoadingData = true;
      this.page += 1;
      let params = { page: this.page };
      getArticleAll(params)
        .then(res => {
          console.log(res.data.datalist);
          this.isLoadingData = false;
          if (res.data.datalist.length <= 1) {
            this.hasMore = false;
          }
          let arr;
          if (this.page == 1) {
            this.articles = res.data.datalist;
          } else {
            this.articles = this.articles.concat(res.data.datalist);
          }
          // this.$store.commit('getArticle', arr)
        })
        .catch(err => {
          this.isLoadingData = false;
        });
    },
    time(date) {
      return formatTime(date, "yyyy-mm-dd");
    }
  },

  mounted() {
    var that = this;
    this.$nextTick(() => {
      // this.sideHot = document.querySelector('#sideHot')
      this.mailContentDom = document.querySelector("#mailContent");
      this.windowHeight = document.documentElement.clientHeight;
      // this.footer()
      window.addEventListener("scroll", e => {
        const top = $(document).scrollTop();
        const mailContentDomHeight = this.mailContentDom.offsetHeight;
        // this.showFixedTag = top >= this.sideHot.offsetHeight + 80;
        if (
          this.windowHeight + top > mailContentDomHeight - 50 &&
          !this.isLoadingData &&
          this.hasMore
        ) {
          this.loadMore();
        }
      });
    });
    this.loadMore();
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  overflow: auto;
  padding-top: 50px;
}
.entry-list {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background-color: transparent;
}
.content-box {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 1.167rem 1rem;
  /* min-height: 5.75rem; */
}
.content-box,
.info-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.title-row {
  margin: 0 0 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.entry-list > .item:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.15);
}
.info-box {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-width: 0;
}
.meta-row {
  font-size: 1rem;
  color: #8f969c;
}
.meta-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: baseline;
  -ms-flex-align: baseline;
  align-items: baseline;
  white-space: nowrap;
  justify-content: space-between;
}
.meta-list .item:not(:last-child):after {
  content: "\B7";
  margin: 0 0.4em;
  color: #8f969c;
}
.content-box .title-row a {
  position: relative;
  line-height: 1.5;
}
.content-box .title-row a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #000;
  visibility: hidden;
  transition: all 0.2s ease-in-out;
  transform: scaleX(0);
}
.content-box .title-row a:hover:before {
  visibility: visible;
  transform: scaleX(1);
}

.loadmore {
  text-align: center;
  padding: 5px 0 10px 0;
  cursor: pointer;
  color: #ccc;
}

</style>
