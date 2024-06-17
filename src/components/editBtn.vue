<template>
  <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
    <a-tag class="mx-1" color="cyan" @click="$emit('click')" style="cursor: pointer; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center">
      <a-icon type="edit" theme="filled"/>
    </a-tag>
  </a-tooltip>
</template>

<script>
    import myIcons from '@/core/icons'
    export default {
        data () {
            return {
                myIcons
            }
        },
        model: {
            prop: 'value',
            event: 'click'
        },
        props: {
            click: {
                type: Function
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
