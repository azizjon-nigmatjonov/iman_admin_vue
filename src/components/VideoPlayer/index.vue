<template>
  <div class="item">
    <div class="player">
      <video-player
        class="vjs-custom-skin"
        ref="videoPlayer"
        :options="options"
        :playsinline="true"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @ready="playerReadied"
        @statechanged="playerStateChanged($event)"
      >
      </video-player>
    </div>
  </div>
</template>

<script>
// custom skin css
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'
export default {
    props: {
        src: {
            type: Object,
            required: true
        }
    },
    components: {
        videoPlayer
    },
  data () {
    return {
      // videojs options
      playerOptions: {
        height: '360',
        autoplay: true,
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/webm',
            // mp4
            // src: 'http://vjs.zencdn.net/v/oceans.mp4'
            // webm
            src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
          }
        ],
        poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg'
      }
    }
  },
  mounted () {
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    },
    options () {
          return {
              ...this.playerOptions,
              sources: [
                {
                    type: this.src.type,
                    src: this.src.url
                }
              ]
          }
      }
  },
  methods: {
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded (player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata (player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting (player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying (player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate (player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay (player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough (player) {
      // console.log('player Canplaythrough!', player)
    },

    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
      // seek to 10s
    //   console.log('example player 1 readied', player)
    //   player.currentTime(10)
      // console.log('example 01: the player is readied', player)
    }
  }
}
</script>
