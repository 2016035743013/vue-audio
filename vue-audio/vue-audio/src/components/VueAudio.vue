<template>
	<div class="vue-audio">
		<div class="content">
			<div class="center-content">
				<div class="time">
					{{curTime}} / {{duration}}
				</div>
				<!-- </div> -->
				<div class="progress-bar">
					<!-- 进度条容器 -->
					<div class="lineContainer">
						<!-- 进度条滑块 -->
						<div class="point">
						</div>
						<!-- 当前播放的进度条 -->
						<div class="currentTimeBar">
						</div>
						<!-- 预加载的进度条 -->
						<div class="preloadBar">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'vue-audio',
		data() {
			return {
				audioDom: null,
				duration: '00:00',
				curTime: '00:00',
				durationTime: 0,//音乐播放持续的时间
			}
		},
		props: [
			'audio',//audio对象
			'src',//音频链接
			'audioCss',//播放器样式
		],
		watch: {
			src(newVal, oldVal) {
				this.audioDom.src = newVal;
			}
		},
		mounted() {

			const that = this;
			// this.$(function() {
			// that.audioDom = $('#audio')[0];
			this.$(function() {

				// 播放器样式初始化
				for(let item in that.audioCss) {
					$('.' + item ).css(
						that.audioCss[item]
					)
				}

				that.audioDom = that.audio;
				// that.audioDom.src = that.audioSrc[0];
				// 播放结束播放下一首歌
				that.audioDom.addEventListener('ended', function() {
					// that.nextSong();
					that.$emit('songEnded');
				});
				// 获取歌曲的持续时间
				that.getDuration();
				// 实时监听音频的播放位置
				that.audioDom.addEventListener('timeupdate', function() {
					let curTime = that.audioDom.currentTime;
					that.curTime = that.formatTime(curTime);
					let pointX = curTime * 1000 / (that.durationTime * 1000) * $('.lineContainer').width();
					if(Number.isNaN(pointX)) {
						return;
					}
					// 动态设置进度条的播放
					that.setProgress(pointX);
					// 动态设置缓存的的进度条
					that.setCacheProgress();
				} );
				
				// 动态改变进度条的播放进度
				that.playBar();
			});
		},
		methods: {
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
				let lineX = $('.lineContainer').offset().left;//进度条容器距离浏览器左边的横坐标
				const that = this;
				// 点击进度条容器改变歌曲播放进度
				this.$('.lineContainer').click(function(event) {
					pageX = event.pageX || event.clientX;//获取鼠标点击的横坐标（现对于整个浏览器）
					pointX = pageX - lineX;
					// 比对缓存的进度条宽度，如果超过，那就无法改变当前的播放进度
					if(pointX > that.$('.preloadBar').width()) {
						return;
					}
					that.setProgress(pointX);//设置进度条宽度和滑块的横坐标
					let percent = pointX /  $('.lineContainer').width();
					that.audioDom.currentTime = percent * that.durationTime;//改变音频的播放进度
				})

				// 滑动进度条滑块改变歌曲播放进度
				this.$('.point').mousedown(function() {
					$(document).mousemove(function(event) {
					 	pageX = event.clientX || event.pageX;
						pointX = pageX - lineX;
						// 比对缓存的进度条宽度，如果超过，那就无法改变当前的播放进度
						if(pointX > that.$('.preloadBar').width()) {
							return;
						}
						that.setProgress(pointX);
						let percent = pointX /  $('.lineContainer').width();
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
				} else if(pointX >= $('.lineContainer').width() ) {
					pointX = $('.lineContainer').width() - $('.point').width();
				}
				$('.currentTimeBar').css({
					width: pointX
				});
				$('.point').css({
					left: pointX
				})
			},
			// 设置音频缓存的进度条
			setCacheProgress() {
				if(this.audioDom.buffered.length != 0) {
					let buffered = this.audioDom.buffered;
					let cacheX  = buffered.end(buffered.length - 1) / this.durationTime;
					let lineContainerWidth = $('.lineContainer').width();
					$('.preloadBar').css({
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