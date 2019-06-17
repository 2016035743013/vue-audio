<template>
	<div class="vue-audio">
		<audio id="audio"  preload="auto" autoplay>
		</audio> 
		<div class="content">
			<div class="left-btn">
				<img @click="preSong" src="../assets/images/pre.png" alt="">
				<img @click='audioPause' v-if="toggleBtn" src="../assets/images/stop.png" alt="">
				<img @click="audioPlay" v-else src="../assets/images/play.png" alt="">
				<img @click="nextSong" src="../assets/images/next.png" alt="">
				<div class="singer-head">
					<img src="../assets/logo.png" alt="">
				</div>
			</div>
			<div class="center-content">
				<div class="song-info">
					<div class="song">
						test - test
					</div>
					<div class="time-info">
						{{curTime}} / {{duration}}
					</div>
				</div>
				<div class="progress-bar">
					<!-- 进度条容器 -->
					<div class="line-container">
						<!-- 进度条滑块 -->
						<div class="time-point">
						</div>
						<!-- 当前播放的进度条 -->
						<div class="current-time-bar">
						</div>
						<!-- 预加载的进度条 -->
						<div class="preload-bar">
						</div>
					</div>
				</div>
			</div>
			<div class="right-btn">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'vue-audio',
		data() {
			return {
				audioDom: null,//音频对象
				audioSrc: ["https://music.snowmusic.com.cn/formalServer/song/e13cfb37e8216fb9165dc95d0bd74186/HQ/1ABCF2B24405F4530E34B062030DBC8F.mp3","https://music.snowmusic.com.cn/SQ/36aa3393af4b4d4884ccabb09b03cf62/sq/FLY%20ANU.mp3", "https://music.snowmusic.com.cn//uploadfile/2015/0507/20150507030641510.mp3"],//音频资源	
				audioIndex: 0,
				toggleBtn: false,//暂停和播放按钮的切换
				duration: '00:00',
				curTime: '00:00',
				durationTime: 0,//音乐播放持续的时间
			}
		},
		mounted() {
			const that = this;
			this.$(function() {
				that.audioDom = $('#audio')[0];
				// that.audioDom.src = that.audioSrc[0];
				// 播放结束播放下一首歌
				that.audioDom.addEventListener('ended', function() {
					// console.log('播放完了');
					that.nextSong();
				});
				// 获取歌曲的持续时间
				that.getDuration();
				// 实时监听音频的播放位置
				that.audioDom.addEventListener('timeupdate', function() {
					let curTime = that.audioDom.currentTime;
					that.curTime = that.formatTime(curTime);
					let pointX = curTime * 1000 / (that.durationTime * 1000) * $('.line-container').width();
					if(Number.isNaN(pointX)) {
						return;
					}
					// console.log(pointX);
					// 动态设置进度条的播放
					that.setProgress(pointX);
					// 动态设置缓存的的进度条
					that.setCacheProgress();
				} );
				
				// 动态改变进度条的播放进度
				that.playBar();
				that.audioDom.addEventListener('emptied', function() {
					console.log('empty');
				})
			});
		},
		methods: {
			// 音频的播放
			audioPlay() {
				if(this.audioDom.src != '') {
					this.audioDom.play();
					this.toggleBtn = true;
				}
			},
			// 音频暂停
			audioPause() {
				if(this.audioDom.src != '') {
					this.audioDom.pause();
					this.toggleBtn = false;
				}
			},
			// 下一首歌
			nextSong() {
				if(this.audioIndex >= this.audioSrc.length - 1) {
					this.audioIndex = 0;
				} else {
					this.audioIndex++;
				}
				this.audioDom.src = this.audioSrc[this.audioIndex];//改变音频的播放链接
				this.audioPlay();
			},
			// 上一首歌
			preSong() {
				if(this.audioIndex <=0 ) {
					this.audioIndex = this.audioSrc.length - 1;
				} else {
					this.audioIndex--;
				}
				this.audioDom.src = this.audioSrc[this.audioIndex];//改变音频的播放链接
				this.audioPlay();
			},
			// 获取歌曲对的持续时间
			getDuration() {
				const that = this;
				this.audioDom.addEventListener('canplay', function() {//监听歌曲是否可以播放了，当歌曲可以播放时获取歌曲的播放时长
					that.durationTime = that.audioDom.duration;
					that.duration = that.formatTime(that.audioDom.duration);
				});
			},
			// 手动改变进度条进度
			playBar() {
				let pointX = 0;//存放鼠标距离进度条最左边的点的位置的横坐标
				let pageX = 0;//存放鼠标相距离整个浏览器最左边的横坐标
				let lineX = $('.line-container').offset().left;//进度条容器距离浏览器左边的横坐标
				const that = this;
				// 点击进度条容器改变歌曲播放进度
				this.$('.line-container').click(function(event) {
					pageX = event.pageX || event.clientX;//获取鼠标点击的横坐标（现对于整个浏览器）
					pointX = pageX - lineX;
					// 比对缓存的进度条宽度，如果超过，那就无法改变当前的播放进度
					if(pointX > that.$('.preload-bar').width()) {
						return;
					}
					that.setProgress(pointX);//设置进度条宽度和滑块的横坐标
					let percent = pointX /  $('.line-container').width();
					that.audioDom.currentTime = percent * that.durationTime;//改变音频的播放进度
				})

				// 滑动进度条滑块改变歌曲播放进度
				this.$('.time-point').mousedown(function() {
					$(document).mousemove(function(event) {
						// console.log('mousemove');
					 	pageX = event.clientX || event.pageX;
						pointX = pageX - lineX;
						// 比对缓存的进度条宽度，如果超过，那就无法改变当前的播放进度
						if(pointX > that.$('.preload-bar').width()) {
							return;
						}
						that.setProgress(pointX);
						let percent = pointX /  $('.line-container').width();
						that.audioDom.currentTime = percent * that.durationTime;
					})
				});
				// 整个浏览器监听鼠标抬起事件
				this.$(document).mouseup(function(event) {
					$(document).off('mousemove');
				})
			},
			// 设置进度条的宽度和滑动点的位置
			setProgress(pointX) {
				if(pointX <= 0) {
					pointX = 0;
				} else if(pointX >= $('.line-container').width() ) {
					pointX = $('.line-container').width() - $('.time-point').width();
				}
				$('.current-time-bar').css({
					width: pointX
				});
				$('.time-point').css({
					left: pointX
				})
			},
			// 设置音频缓存的进度条
			setCacheProgress() {
				if(this.audioDom.buffered.length != 0) {
					let buffered = this.audioDom.buffered;
					let cacheX  = buffered.end(buffered.length - 1) / this.durationTime;
					let lineContainerWidth = $('.line-container').width();
					$('.preload-bar').css({
						width: lineContainerWidth * cacheX
					})
				}
			},
			// 格式化时间为 00:00 样式
			formatTime(time) {
				let minute = Math.floor(time / 60);
				let second = parseInt(time % 60);
				minute = minute >= 10 ? minute + '' : '0' + minute;
				second = second >= 10 ? second + '' : '0' + second;
				return minute + ':' + second;
			}
		}
	}
</script>
<style scoped> 
@import '../../static/css/vue-audio.css';
</style>