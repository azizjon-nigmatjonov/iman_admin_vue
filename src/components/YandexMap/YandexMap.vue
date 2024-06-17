<template>
  <div class="map-container">
    <yandex-map
      class="yandex-map"
      :settings="settings"
      :coords="addressCoordinates || [41.309022097090235, 69.24136827883606]"
      :zoom="15"
      ref="myRef"
      searchControlProvider="yandex#map"
    >

      <ymap-marker
        :coords="addressCoordinates || [41.309022097090235, 69.24136827883606]"
        marker-id="123"
        :options="{ draggable: true }"
        @dragend="dragHandler"
      />

    </yandex-map>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import { mapActions } from 'vuex'

export default {
  components: { yandexMap, ymapMarker },
  props: {
    coords: {
      type: Array,
      default: () => {
        return [41.309022097090235, 69.24136827883606]
      }
    }
  },
  data: () => ({
    settings: {
      apiKey: '3139e085-2545-4b92-8675-de14e4912af4'
    }
  }),
  computed: {
    addressCoordinates () {
      return this.$store.getters.getAddressCoordinates
    }
  },
  methods: {
    ...mapActions(['searchAddressByCoords']),
    dragHandler (e) {
      console.log('EVENT ===>', e.get('target').geometry.getCoordinates())
      const coords = e.get('target').geometry.getCoordinates()
      this.searchAddressByCoords(coords)
    }
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
}

.yandex-map {
  width: 100%;
  height: 400px;
}
</style>
