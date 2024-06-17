<template>
  <a-tag class="mx-1" color="geekblue" @click="$emit('click')" style="cursor: pointer; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center">
    <a-icon v-if="type === 'up'" type="caret-up" />
    <a-icon v-else type="caret-down" />
  </a-tag>
</template>

<script>
    export default {
        model: {
            prop: 'value',
            event: 'click'
        },
        props: {
          click: {
            type: Function,
            required: false,
            default: () => {}
          },
          type: {
            type: String,
            default: 'up'
          }
        }
    }
</script>

<style lang="less" scoped>

</style>
