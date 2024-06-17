<template>
  <auto-complete
    :value="value"
    option-label-prop="name"
    @search="onSearch"
    @select="onSelect"
    @change="onChange"
  >
    <template slot="dataSource">
      <a-select-opt-group>
        <a-select-option
          v-for="address in addresses"
          :key="address.name + address.description"
          :value="address"
        >
          <a-row>
            <a-col :span="1">
              <a-icon :style="`font-size: 22px; color: #1990FF; margin-right: 25px`" type="environment" />
            </a-col>
            <a-col :span="19" :offset="1">
              <p style="font-size: 14px; margin: 0"> {{ address.name || '' }}</p>
            </a-col>
          </a-row>
        </a-select-option>
      </a-select-opt-group>
    </template>
  </auto-complete>
</template>

<script>
import { AutoComplete } from 'ant-design-vue'
import { mapActions, mapMutations } from 'vuex'
import debounce from 'lodash.debounce'

export default {
  props: ['value'],
  components: { AutoComplete },
  data: () => ({
    text: ''
  }),
  computed: {
    addresses () {
      return this.$store.getters.getFoundedAddresses
    },
    addressString () {
      return this.$store.getters.getAddressString
    }
  },
  methods: {
    ...mapActions(['searchAddressByName']),
    ...mapMutations(['setAddressCoordinates']),
    onSearch (val) {
      this.$emit('input', val)
      this.searchAddressInMap(val)
    },
    onSelect (val) {
      this.$emit('input', val.description + ' ' + val.name)
      this.setAddressCoordinates([val.latlong.lat, val.latlong.lon])
    },
    searchAddressInMap: debounce(function (val) {
      this.searchAddressByName(val)
    }, 1000)
  },
  watch: {
    addressString (val) {
      this.$emit('input', val)
    }
  }
}
</script>
