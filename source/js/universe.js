
function cvdisplay() {
    if (document.getElementsByTagName('html')[0].getAttribute('data-theme') == 'dark') {
        document.getElementById('universe').style.display = "";
        document.getElementById('body-wrap').style.background = "none";
    }
}
cvdisplay()
let theme = document.getElementsByTagName('html')[0].getAttribute('data-theme');
// 为白天黑夜模式添加监听事件   日常模式和暗黑模式之间切换的优化
document.getElementById('darkmode').addEventListener('click', function () {
    if (theme === 'light') {
        // theme = 'dark'
        document.getElementById('universe').style.display = "";
        document.getElementById('body-wrap').style.background = "none";
    } else {
        // theme = 'light'
        document.getElementById('universe').style.display = "none";//暗黑模式的canvas画布
        document.getElementById('body-wrap').style.background = "";//日常模式的背景图片
    }
})

function dark() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var n, e, i, h, t = .05,
        s = document.getElementById("universe"),
        o = !0,
        a = "180,184,240",
        r = "226,225,142",
        d = "226,225,224",
        c = [];

    function f() {
        n = window.innerWidth, e = window.innerHeight, i = .216 * n, s.setAttribute("width", n), s.setAttribute("height", e)
    }

    function u() {
        h.clearRect(0, 0, n, e);
        for (var t = c.length, i = 0; i < t; i++) {
            var s = c[i];
            s.move(), s.fadeIn(), s.fadeOut(), s.draw()
        }
    }

    function y() {
        this.reset = function () {
            this.giant = m(3), this.comet = !this.giant && !o && m(10), this.x = l(0, n - 10), this.y = l(0, e), this.r = l(1.1, 2.6), this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t, this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120), this.fadingOut = null, this.fadingIn = !0, this.opacity = 0, this.opacityTresh = l(.2, 1 - .4 * (this.comet + 1 - 1)), this.do = l(5e-4, .002) + .001 * (this.comet + 1 - 1)
        }, this.fadeIn = function () {
            this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do)
        }, this.fadeOut = function () {
            this.fadingOut && (this.fadingOut = !(this.opacity < 0), this.opacity -= this.do / 2, (this.x > n || this.y < 0) && (this.fadingOut = !1, this.reset()))
        }, this.draw = function () {
            if (h.beginPath(), this.giant) h.fillStyle = "rgba(" + a + "," + this.opacity + ")", h.arc(this.x, this.y, 2, 0, 2 * Math.PI, !1);
            else if (this.comet) {
                h.fillStyle = "rgba(" + d + "," + this.opacity + ")", h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, !1);
                for (var t = 0; t < 30; t++) h.fillStyle = "rgba(" + d + "," + (this.opacity - this.opacity / 20 * t) + ")", h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2), h.fill()
            } else h.fillStyle = "rgba(" + r + "," + this.opacity + ")", h.rect(this.x, this.y, this.r, this.r);
            h.closePath(), h.fill()
        }, this.move = function () {
            this.x += this.dx, this.y += this.dy, !1 === this.fadingOut && this.reset(), (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0)
        }, setTimeout(function () {
            o = !1
        }, 50)
    }

    function m(t) {
        return Math.floor(1e3 * Math.random()) + 1 < 10 * t
    }

    function l(t, i) {
        return Math.random() * (i - t) + t
    }
    f(), window.addEventListener("resize", f, !1),
        function () {
            h = s.getContext("2d");
            for (var t = 0; t < i; t++) c[t] = new y, c[t].reset();
            u()
        }(),
        function t() {
            document.getElementsByTagName('html')[0].getAttribute('data-theme') == 'dark' && u(), window.requestAnimationFrame(t)
        }()
};
dark()



// 每日一言 的配置准备
let newEle = `
<p id="hitokoto">
  <a href="#" id="hitokoto_text">:D 获取中...</a>
</p>`;

let insertAfter = function (content) {
    this.content = content;
    (function (content) {
        if (document.getElementById('site-info')) {
            var div = document.createElement('div');
            div.innerHTML = content;
            // div.style.color = 'red';
            var site = document.getElementsByClassName("site_social_icons")[0];
            document.getElementById('site-info').insertBefore(div, site)

            evenonlange();
        }
    })(content)
};
insertAfter(newEle);

// 每日一言内容获取
function evenonlange() {
    fetch('https://v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
            const hitokoto = document.querySelector('#hitokoto_text')
            // hitokoto.href = `https://hitokoto.cn/?uuid=${data.uuid}`
            hitokoto.innerText = data.hitokoto

            daziji();
        })
        .catch(console.error)
}


// 打字机效果
function daziji() {
    const text = document.querySelector('#hitokoto_text');
    const nr = document.getElementById('hitokoto_text').innerText;
    const txt = [nr];

    var index = 0;
    var xiaBiao = 0;
    var huan = true;

    setInterval(function () {

        if (huan) {
            text.innerHTML = txt[xiaBiao].slice(0, ++index);
            // console.log(index);
        }
        else {
            text.innerHTML = txt[xiaBiao].slice(0, index--);
            // console.log(index);
        }

        if (index == txt[xiaBiao].length + 3) {
            huan = false;
        }
        else if (index < 0) {
            index = 0;
            huan = true;
            xiaBiao++;
            if (xiaBiao >= txt.length) {
                xiaBiao = 0;
            }
        }

    }, 200)
}
