<template>
  <a-tooltip placement="bottomLeft" :title="$t(tooltip)">
    <a-tag class="mx-1" :color="color" @click="$emit('click')" style="cursor: pointer; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center">
      <a-icon :type="icon" />
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
            },
            icon: {
                type: String,
                default: 'eye'
            },
            color: {
                type: String,
                default: 'blue'
            },
            tooltip: {
                type: String,
                default: 'button.edit'
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
