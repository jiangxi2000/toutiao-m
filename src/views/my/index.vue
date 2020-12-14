<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell class="base-info" center :border=false >
          <van-image slot="icon" class="avatar" round fit="cover" width="60" height="60" :src=" currentUser.photo " />
          <div slot="title" class="name">{{ currentUser.name }}</div>
          <van-button class="update-btn" size="small" round >编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item  class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="not-login" v-else>
      <div class="not-login-wrap" @click="$router.push('/login')">
      <div class="mobile"><img src="./notlogin.png" /></div>
      <div class="text">登录 / 注册</div></div>
    </div>
    <van-grid class="nav-grid mb-4" column-num="2">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell class="logout-cell" title="退出登录" v-if="user" @click='onLogout' />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      currentUser: {}
    }
  },
  created () {
    if (this.user) {
      this.loadCurrentUser()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    },
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确定要退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style lang='less' scoped>
.my-container{
  .my-info{
    background: url('./banner.png') no-repeat;
    background-size: cover;
    .base-info{
      height: 115px;
      background-color: unset;
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar{
        width: 66px;
        height: 66px;
        border: 1px solid #ffffff;
        box-sizing: border-box;
        margin-right: 11px;
      }
      .name{
        color: #ffffff;
        font-size: 15px;
      }
      .update-btn{
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }
    .data-info{
      .data-info-item{
        height: 65px;
        color: #ffffff;
          .text-wrap{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .count{
              font-size: 18px;
            }
            .text{
              font-size: 11px;
            }
        }
      }
    }
    /deep/.van-grid-item__content{
      background-color: unset;
    }
  }
  .not-login{
    background: url('./banner.png') no-repeat;
    background-size: cover;
    .not-login-wrap{
      display: flex;
      height: 180px;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .mobile img{
        width: 66px;
        height: 66px;
      }
      .text{
        font-size: 14px;
        color: #ffffff;
      }
    }

  }
  /deep/.nav-grid{
    .nav-grid-item{
      height: 70px;
      .toutiao{
        font-size: 22px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      .van-grid-item__text{
        font-size: 14px;
        color: #333;
      }
    }
  }
  .logout-cell{
    text-align: center;
    color: #d86262;
  }
  .mb-4{
    margin-bottom: 4px;
  }

}
</style>
