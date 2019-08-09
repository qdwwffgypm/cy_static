(function () {
	var protocol, isBata, doc = document;
	protocol = ('https:' == doc.location.protocol ? 'https://' : 'http://');
	isBata = !/changyoyo\.com|47.100.101.184/.test(doc.domain);
    _fmOpt = {
        display: 'bind', //popup方式渲染验证码
        container: '.captcha', //验证码button渲染的目标DOM，自动展现方式下必需，详情见后文
        area: '.customForm',//对于custom模式，弹出窗口的加载容器，详情见后文
        partner: "changyou",
        appName: "changyou_web",
        fmb: true,
        hideCompInfo: true,
        initialTime: new Date().getTime(),
        token: "changyou" + "-" + new Date().getTime() + "-" + Math.random().toString(16).substr(2),
        env: isBata ? 0 : 1, // 请注意：切换到线上时应去掉此变量或更改为1
        getinfo: function () {
            return "e3Y6ICIyLjUuMCIsIG9zOiAid2ViIiwgczogMTk5LCBlOiAianMgbm90IGRvd25sb2FkIn0=";
        },
    };
    var fm = doc.createElement('script'); fm.type = 'text/javascript';
    fm.src = ('https:' == doc.location.protocol ? 'https://' : 'http://') + 'static.tongdun.net/captcha/main/tdc.js?ver=1.0&t=' + (new Date().getTime() / 600000).toFixed(0);
    var s = doc.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fm, s);
})();