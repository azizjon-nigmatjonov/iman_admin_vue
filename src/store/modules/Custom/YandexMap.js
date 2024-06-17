import defaultSettings from '@/config/defaultSettings'
import axios from 'axios'

const YandexMap = {
  state: {
    foundedAddresses: [],
    addressCoordinates: null,
    addressString: ''
  },
  getters: {
    getFoundedAddresses: state => state.foundedAddresses,
    getAddressCoordinates: state => state.addressCoordinates,
    getAddressString: state => state.addressString
  },
  mutations: {
    setFoundedAdresses (state, payload) {
      state.foundedAddresses = payload
    },
    clearFoundedAddresses (state) {
      state.foundedAddresses = []
    },
    setAddressCoordinates (state, payload) {
      state.addressCoordinates = payload
    },
    setAddressString (state, payload) {
      state.addressString = payload
    }
  },
  actions: {
    searchAddressByName ({ commit }, value) {
      axios({
        method: 'get',
        url: 'https://geocode-maps.yandex.ru/1.x/',
        params: {
          format: 'json',
          apikey: defaultSettings.yandexMapApiKey,
          geocode: value,
          sco: 'latlong',
          lang: 'ru-RU',
          results: 10,
          ll: '69.241320,41.292906',
          spn: '6.5,6.5',
          rspn: 1
        }
      }).then(res => {
        const members = res.data.response.GeoObjectCollection.featureMember
        if (members.length > 0) {
          const result = members.map(map => {
            return {
              name: map.GeoObject.name,
              latlong: {
                lat: map.GeoObject.Point.pos.split(' ')[1],
                lon: map.GeoObject.Point.pos.split(' ')[0]
              },
              type: map.GeoObject.metaDataProperty.GeocoderMetaData.kind,
              description: map.GeoObject.description
            }
          })
          commit('setFoundedAdresses', result)
        } else {
          commit('setFoundedAdresses', [])
        }
      }).catch(() => {
        commit('setFoundedAdresses', [])
      })
    },
    searchAddressByCoords ({ commit }, coords) {
      commit('setAddressCoordinates', coords)
      axios({
        method: 'get',
        url: 'https://geocode-maps.yandex.ru/1.x/',
        params: {
          format: 'json',
          apikey: defaultSettings.yandexMapApiKey,
          geocode: coords.toString(),
          sco: 'latlong',
          lang: 'ru-RU',
          results: 5,
          ll: '69.241320,41.292906',
          spn: '6.5,6.5',
          rspn: 1
        }
      }).then(res => {
        const members = res.data.response.GeoObjectCollection.featureMember
        if (members.length > 0) {
          const result = members.map(map => {
            return {
              name: map.GeoObject.name,
              latlong: {
                lat: map.GeoObject.Point.pos.split(' ')[1],
                lon: map.GeoObject.Point.pos.split(' ')[0]
              },
              type: map.GeoObject.metaDataProperty.GeocoderMetaData.kind,
              description: map.GeoObject.description
            }
          })
          commit('setAddressString', result[0].description + ' ' + result[0].name)
        } else {
          commit('setAddressString', '')
        }
      })
    }
  }
}

export default YandexMap
