# vue-audio

> A Vue.js project

## Build Setup

这是在vue的脚手架上开发的音频播放插件，使用jQuery和vue这两种框架 
``` bash
# install dependencies  首先是安装需要的依赖， 
npm install

# serve with hot reload at localhost:8080   运行项目
npm run dev


# 这是音频播放器
<VueAudio :audio='audio' :src='audioSrc' @songEnded = 'songEnd' :audioCss = 'audioCss'/>







