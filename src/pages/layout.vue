<template>
  <div>
    <canvas id="canvas" width="1011" height="803"></canvas>
    <header class="header" :class="isNavHidden ? 'navUp' : 'navDown'">
			<section class="box header-content">
			<nav>
				<router-link
					v-for="(item, index) in nav"
					:key="index"
					:to="item.path"
					:class="navIndex == index ? 'active' : ''"
					>{{item.text}}</router-link>
			</nav>

			</section>
		</header>
    <Main />
  </div>
</template>

<script>
import Main from "./index";
export default {
  data() {
    return {
      isNavHidden: false,
      navIndex: 1,
      nav: [
        {
          path: "/",
          text: "首页"
        },
        {
          path: "/article",
          text: "文章"
        },
        // {
        // 	path: '/project',
        // 	text: '项目'
        // },
        {
          path: "/about",
          text: "关于"
        }
      ]
    };
  },
  methods:{
    bgCanvas () {
			let canvas = null
			if (!this.canvasDom) {
				this.canvasDom = document.querySelector('#canvas')
				canvas = this.canvasDom
			} else {
				canvas = this.canvasDom
			}
			let ctx = canvas.getContext("2d")
			let cw = canvas.width = window.innerWidth
			let cx = cw / 2
			let ch = canvas.height = window.innerHeight
			let	cy = ch / 2
			ctx.fillStyle = "#ccc";
			const linesNum = 16;
			let linesRy = [];
			let requestId = null;
			function Line(flag) {
				this.flag = flag;
				this.a = {};
				this.b = {};
				if (flag == "v") {
					this.a.y = 0;
					this.b.y = ch;
					this.a.x = randomIntFromInterval(0, ch);
					this.b.x = randomIntFromInterval(0, ch);
				} else if (flag == "h") {
					this.a.x = 0;
					this.b.x = cw;
					this.a.y = randomIntFromInterval(0, cw);
					this.b.y = randomIntFromInterval(0, cw);
				}
				this.va = randomIntFromInterval(25, 100) / 100;
				this.vb = randomIntFromInterval(25, 100) / 100;
				this.draw = function() {
					ctx.strokeStyle = "#f4f4f4";
					ctx.beginPath();
					ctx.moveTo(this.a.x, this.a.y);
					ctx.lineTo(this.b.x, this.b.y);
					ctx.stroke();
				}
				this.update = function() {
					if (this.flag == "v") {
						this.a.x += this.va;
						this.b.x += this.vb;
					} else if (flag == "h") {
						this.a.y += this.va;
						this.b.y += this.vb;
					}
					this.edges();
				}
				this.edges = function() {
					if (this.flag == "v") {
						if (this.a.x < 0 || this.a.x > cw) {
							this.va *= -1;
						}
						if (this.b.x < 0 || this.b.x > cw) {
							this.vb *= -1;
						}
					} else if (flag == "h") {
						if (this.a.y < 0 || this.a.y > ch) {
							this.va *= -1;
						}
						if (this.b.y < 0 || this.b.y > ch) {
							this.vb *= -1;
						}
					}
				}
			}
			for (var i = 0; i < linesNum; i++) {
				var flag = i % 2 == 0 ? "h" : "v";
				var l = new Line(flag);
				linesRy.push(l);
			}
			function Draw() {
				requestId = window.requestAnimationFrame(Draw);
				ctx.clearRect(0, 0, cw, ch);
				for (var i = 0; i < linesRy.length; i++) {
					var l = linesRy[i];
					l.draw();
					l.update();
				}
				for (var i = 0; i < linesRy.length; i++) {
					var l = linesRy[i];
					for (var j = i + 1; j < linesRy.length; j++) {
						var l1 = linesRy[j]
						Intersect2lines(l, l1);
					}
				}
			}
			function Init() {
				linesRy.length = 0;
				for (var i = 0; i < linesNum; i++) {
					var flag = i % 2 == 0 ? "h" : "v";
					var l = new Line(flag);
					linesRy.push(l);
				}
				if (requestId) {
					window.cancelAnimationFrame(requestId);
					requestId = null;
				}
				cw = canvas.width = window.innerWidth;
				cx = cw / 2;
				ch = canvas.height = window.innerHeight;
				cy = ch / 2;
				Draw();
			};
			setTimeout(function() {
				Init();
				addEventListener('resize', Init, false);
			}, 15);
			function Intersect2lines(l1, l2) {
				var p1 = l1.a,
					p2 = l1.b,
					p3 = l2.a,
					p4 = l2.b;
				var denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
				var ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator;
				var ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator;
				var x = p1.x + ua * (p2.x - p1.x);
				var y = p1.y + ua * (p2.y - p1.y);
				if (ua > 0 && ub > 0) {
					markPoint({
						x: x,
						y: y
					})
				}
			}
			function markPoint(p) {
				ctx.beginPath();
				ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
				ctx.fillStyle = "#eeeeee";
				ctx.fill();
			}
			function randomIntFromInterval(mn, mx) {
				return ~~(Math.random() * (mx - mn + 1) + mn);
			}
		},
    scroll() {
			window.addEventListener('scroll', (e) => {
        const top = $(document).scrollTop()
				if (top >= 100) {
					this.isNavHidden = true
				} else {
					this.isNavHidden = false
				}
			})
		},
  },
  mounted() {
    this.$nextTick(function () {
      window.scrollTop = 0
      this.bgCanvas()
			this.scroll()
		})
  },
  components: {
    Main
  }
};
</script>

<style scoped>
#canvas{
		position: fixed;
		left: 0;
		top: 0;
		z-index: -1;
	}
.navUp {
		transform: translate3d(0, -60px, 0)
	}
	.navDown {
		transform: translate3d(0, 0, 0)
	}
.header {
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
  height: 50px;
  overflow: hidden;
  width: 100%;
  position: fixed;
  z-index: 2;
  transition: 0.3s;
}
.box {
  width: 900px;
  margin: 0 auto;
}
.header-content {
  display: flex;
  height: 50px;
  justify-content: space-between;
}
.header-content>nav {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.header-content>nav>a {
  display: inline-block;
  height: 50px;
  transition: 0.3s;
  padding: 0 20px;
  position: relative;
  color: #8c8c8c;
  text-decoration: none;
}
.header-content>nav>a:hover {
  color: #3fb76c;
}
.header-content>nav>a.active {
  color: #3fb76c;
}


</style>
