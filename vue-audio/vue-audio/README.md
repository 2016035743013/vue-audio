# vue-audio

> A Vue.js project

## Build Setup

这是在vue的脚手架上开发的音频播放插件，使用jQuery和vue这两种框架 
``` bash
# install dependencies  首先是安装需要的依赖， 
npm install

# serve with hot reload at localhost:8080   运行项目
npm run dev



# 
# 项目中VueAudio组件的使用方法
# 
要使用该播放器，首先根据路径导入到用到的组件里面
import(路劲)  //记得要在components里面添加该组件的名称，这个应该就不用说了吧 

# 这是音频播放器的主要引用格式
<VueAudio :audio='audio' :src='audioSrc' @songEnded = 'songEnd' :audioCss = 'audioCss'/>

# 音频对象 audio  this.audio = this.$('#audio')[0];
这个必须传过去，不然无法使用该播放器

# 音频链接   audioSrc
如果是本地的音频链接那么记得一定要require(链接)， 例如  require('./assets/audio/audio.mp3')

# 这个是监听音频播放结束的事件 songEnd
在methods声明该方法，就可以书写音频播放结束之后对应的逻辑了

# 音频播放器的样式  audioCss的每一个属性都对应一个vueAudio对应标签的class类，这里面的每个属性可写可不写。
audioCss: { 
    lineContainer: {//进度容器的高度和颜色
        height: '4px',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    time: {//字体的大小和颜色
        fontSize: '15px',
        color: 'white'
    },
    point: {//进度条滑动点的大小和颜色
        width: '12px',
        height: '12px',
        backgroundColor: 'white'
    },
    preloadBar: {//预加载的进度条的颜色
        backgroundColor: 'gray'
    },
    currentTimeBar: {//滚动进度条的颜色
        backgroundColor: 'white'
    },
}







