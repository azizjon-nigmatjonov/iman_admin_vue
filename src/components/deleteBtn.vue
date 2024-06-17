<template>
  <a-popconfirm
    placement="topRight"
    slot="extra"
    :title="$t('deleteMsg')"
    @confirm="$emit('confirm', arguments[0])"
    :okText="$t('yes')"
    :cancelText="$t('no')"
  >
    <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
      <a-tag color="red" style="cursor: pointer; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center">
        <a-icon type="delete" theme="filled" />
      </a-tag>
    </a-tooltip>
  </a-popconfirm>
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
            event: 'confirm'
        },
        props: {
            confirm: {
                type: Function
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
