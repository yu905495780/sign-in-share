var timestamp = Date.parse(new Date()) / 1000;
var nonceStr = generateUUID();
var url = encodeURIComponent(window.location.href);
var signature = "";
var data = {
    timestamp: timestamp,
    nonceStr: nonceStr,
    url: url
};

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

$.ajax({
    url: apiUrl + "/resource/getWXSignature",
    type: 'GET',
    data: data,
    async: false,
    success: function (data) {
        signature = data.datas.signature;
    }
});


wx.config({
    debug: false,
    appId: 'wxf54623aae3cde798',
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: [
        // 所有要调用的 API 都要加到这个列表中
//            'checkJsApi',
//            'openLocation',
//            'getLocation',
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
    ]
});

wx.ready(function () {
    wx.onMenuShareAppMessage({
        title: '王者荣耀免海选，求赞', // 分享标题
        desc: '我正在参加王者荣耀线上比赛，帮我点赞免海选', // 分享描述
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://www.shenyueapp.com/wzry/img/King.jpg', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
//                alert('用户点击发送给朋友');
        },
        success: function (res) {
//                alert('已分享');
        },
        cancel: function (res) {
//                alert('已取消');
        },
        fail: function (res) {
//                alert(JSON.stringify(res));
        }
    });

    wx.onMenuShareTimeline({
        title: '王者荣耀免海选，求赞',
        link: window.location.href,
        imgUrl: 'http://www.shenyueapp.com/wzry/img/King.jpg',
        trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
//                alert('用户点击分享到朋友圈');
        },
        success: function (res) {
//                alert('已分享');
        },
        cancel: function (res) {
//                alert('已取消');
        },
        fail: function (res) {
//                alert(JSON.stringify(res));
        }
    });

});