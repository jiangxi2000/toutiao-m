<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录 / 注册"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <!-- 使用van-form 包裹van-field -->
    <van-form
      ref="login-form"
      :show-error="false"
      :show-error-message="false"
      validate-first
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-cell-group>
        <van-field
          name="mobile"
          v-model="user.mobile"
          center
          icon-prefix="toutiao"
          left-icon="shouji"
          right-icon="warning-o"
          placeholder="请输入手机号"
          :rules="formRules.mobile"
        />
        <van-field
          name="code"
          v-model="user.code"
          clearable
          center
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          :rules="formRules.code"
        >
        <template #button>
          <van-count-down
          :time="60 * 1000"
          format="ss s"
          @finish="isCountDownShow = false"
          v-if="isCountDownShow"
          />
          <van-button
            v-else
            class="send-btn"
            size="mini"
            round
            :loading="isSendLoading"
            @click.prevent="onSendSms"
            >
            获取验证码
          </van-button>
        </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
          <van-button class="login-btn" type="info"  block>登录</van-button>
      </div>
  </van-form>

  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写用户手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /\d{6}/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendLoading: false
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        position: 'top',
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        this.$toast.success({
          message: data.message,
          position: 'top'
        })
        this.$store.commit('setUser', data.data)
        this.$router.back()
      } catch (err) {
        this.$toast.fail('登录失败')
        console.log(err)
        console.log('登录失败')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms () {
      this.$toast.loading()
      try {
        await this.$refs['login-form'].validate('mobile') // 校验手机号是否填写正确
        this.isSendLoading = true // 改名验证码加载按钮状态
        await sendSms(this.user.mobile) // 调用接口发送验证码
        this.isCountDownShow = true // 改变倒计时显示状态
        this.$toast('短信验证码发送成功')
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁，请稍后再试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败,请稍后重试'
        }
        this.$toast({
          message: message,
          position: 'top'
        })
      }
      this.isSendLoading = false
    }
  }
}
</script>

<style scoped lang="less">
  .login-container{
    /deep/ .van-field__left-icon i{vertical-align: middle;font-size: 20px;}
    .send-btn{
      width: 76px;
      height: 23px;
      background-color: #ededed;
      .van-button__content{
        font-size: 11px;
        color: #666666;
      }
    }
    .login-btn-wrap{
      padding: 26px 16px;
      .login-btn{
        background-color: #6db4fb;
        border: none;
        .van-button__text{
          font-size: 15px;
        }
      }
    }
  }
</style>
