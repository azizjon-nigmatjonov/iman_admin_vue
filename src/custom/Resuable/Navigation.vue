<template>
  <a-card :class="{ 'no-border': noBorder }">
    <a-row type="flex" align="middle">
      <a-button
        v-if="isBack.flag"
        span="auto"
        @click="onBack"
        style="padding: 0 25px 0 0; border: none"
        icon="arrow-left"
      />
      <a-col :md="8" :xs="24">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="(item, items) in list" :key="items">
            <a v-if="item.link" @click="$router.push(item.link)">{{ item.name }}</a>
            <span v-else>{{ item.name }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
      <a-col flex="auto" style="flex: 1 1 auto">
        <slot />
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    isBack: {
      type: Object,
      required: true
    },
    noBorder: {
      type: Boolean
    }
  },
  data () {
    return {
      dataList: {
        isBack: false,
        listing: [
          {
            name: 'Tutzor',
            link: ''
          }
        ]
      }
    }
  },
  methods: {
    onBack () {
      if (this.isBack.return) {
        this.$router.go(-1)
      } else {
        this.$router.push(this.isBack.link)
      }
    }
  }
}
</script>

<style lang="less">
.no-border.ant-card {
  border-bottom: none;
}
</style>
