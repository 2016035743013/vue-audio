<template>
  <div id="app">
   <audio id="audio"  preload="auto" autoplay>抱歉，你的浏览器不支持audio音频</audio>
   
    <div class="player" >

      <div class='btns'>
        <img @click="preSong" src="./assets/images/pre.png" >
        <img @click="pauseSong()" v-if="toggleBtn" src="./assets/images/stop.png" alt="">
        <img @click="playSong()" v-else src="./assets/images/play.png" >
        <img @click="nextSong" src="./assets/images/next.png">
      </div>

      <!-- 音频播放组件开始 -->
      <div class="audio-container">
        <VueAudio :audio='audio' :src='audioSrc' @songEnded='songEnd' :audioCss = 'audioCss'/>
      </div>
      <!-- 音频播放组件结束 -->
    </div>
  </div>
</template>

<script>
import VueAudio from './components/VueAudio'
// import cjhcjAudio from 'cjhcj-audio'
export default {
  name: 'App',
  data() {
    return {
      toggleBtn: true,//按钮的切换
      audio: null,//传一个音频的对象
      audioSrc: '',//音频链接
      audioLinks: [require('./assets/audio/audio.mp3'),require('./assets/audio/audio2.mp3'),require('./assets/audio/audio3.mp3')],//音频链接
      audioCss: {
        lineContainer: {
          height: '4px',
          backgroundColor: 'rgba(255,255,255,0.2)'
        },//进度容器的高度和颜色
        time: {
          fontSize: '15px',
          color: 'white'
        },//字体的大小和颜色
        point: {
          width: '12px',
          height: '12px',
          backgroundColor: 'white'
        },//进度条滑动点的大小和颜色
        preloadBar: {
          backgroundColor: 'gray'
        },//预加载的进度条的颜色
        currentTimeBar: {
          backgroundColor: 'white'
        },//滚动进度条的颜色
      },//音频播放器的样式
    }
  },
  mounted() {
    this.audio = this.$('#audio')[0];
  },
  methods: {
    // 一首歌播放结束之后
    songEnd() {
      // this.nextSong();
      console.log('播放结束');//这里播放结束你可以改变音频的链接播放下一首歌什么的，你自定义自己的逻辑
    },
    // 播放歌曲
    playSong() {
      this.toggleBtn = true;
      this.audio.play();
    },
    // 暂停歌曲
    pauseSong() {
      this.toggleBtn = false;
      this.audio.pause();
    },
    // 播放下一首歌
    nextSong() {
      this.audioSrc = this.audioLinks[1];
    },
    // 播放前一首歌
    preSong() {
      this.audioSrc = this.audioLinks[2];
    }
  },
  components: {
    VueAudio,
  }
}
</script>

<style scoped>

@import '../static/css/App.css'

</style>
