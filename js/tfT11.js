/**
 * Created by blucexie on 2017/6/26.
 */
$(function () {
    $('.btn').click(function () {
      window.location.href="tfT11.html";
    });

    //真：true;假：false
    var trueFalse="true";
    // array:真相；array[i]：段落。
    var   reportArray=[];
    var result;


    function falseAtrue(obj){
        reportArray.push(obj.id);
        result=obj.id;
        if (result == trueFalse){
            $(".judge").hide();
            $("#share-T").show();
            $('#share-T h2').textillate({in: {effect: 'rollIn'}});
        }else{
            $("#share-F").show();
            $(".judge").hide();
            $('#share-F h2').textillate({in: {effect: 'rollIn'}});
            typewrite();
        }
        if(trueFalse == "true"){
            $("#true_t").show();
        }else {
            $("#false_t").show();
        }
        $(".erweima").show();

    }

    /*获取页面地址*/
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    var Request = new Object();

    Request = GetRequest();
    var score;
    score = Request['score'];

    if (!score) {
        $("#true").click(function(){
            $(".erweima").show();
            var obj_T=document.getElementById("true");
            falseAtrue(obj_T);
        });

        $("#false").click(function(){
            $(".erweima").show();
            var obj_F=document.getElementById("false");
            falseAtrue(obj_F);
        });
    }
    if (score == undefined) {
        $(".judge").show();
        $('#share-T').hide();
        $('#share-F').hide();
        $(".erweima").hide();
    }else {
        $(".judge").show();
        $('#share-T').hide();
        $('#share-F').hide();
        $("#true").click(function(){
            $(".erweima").show();
            var obj_T=document.getElementById("true");
            falseAtrue(obj_T);
        });
        $("#false").click(function(){
            $(".erweima").show();
            var obj_F=document.getElementById("false");
            falseAtrue(obj_F);
        });
        return false;
    }
        var browser = {
            versions: function () {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                    weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                    qq: u.match(/\sQQ/i) == " qq" //是否QQ
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };




    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //判断iPhone|iPad|iPod|iOS

        //这是固定的不用改。
        function setupWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }

        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function (bridge) {
            var uniqueId = 1;

            function log(message, data) {
                var log = document.getElementById('log');
                var el = document.createElement('div');
                el.className = 'logLine';
                el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data);
                if (log.children.length) {
                    log.insertBefore(el, log.children[0])
                } else {
                    log.appendChild(el)
                }

            }

            /* Initialize your app here */
            //<font>"+value.stationName+"</font>
            /*我们在这注册一个js调用OC的方法，不带参数，且不用ObjC端反馈结果给JS：打开本demo对应的博文*/
            /*JS给ObjC提供公开的API，在ObjC端可以手动调用JS的这个API。接收ObjC传过来的参数，且可以回调ObjC*/
            //ios调js

            bridge.registerHandler('teampk', function(data, responseCallback) {

            });
            $("#true").click(function(){
                var obj_T=document.getElementById("true");
                reportArray.push(obj_T.id);
                result=obj_T.id;
                if (result == trueFalse){
                    $(".judge").hide();
                    $("#share-T").show();
                    $('#share-T h2').textillate({in: {effect: 'rollIn'}});
                }else{
                    $(".judge").hide();
                    $("#share-F").show();
                    $('#share-F h2').textillate({in: {effect: 'rollIn'}});
                    typewrite();
                }
                if(trueFalse == "true"){
                    $("#true_t").show();
                }else {
                    $("#false_t").show();
                }
                $(".erweima").hide();

                var userPage = {'option':reportArray.join(","),'Result':result};
                bridge.callHandler('postData',
                    {'postArray':userPage//传给IOS值
                    },
                    function callback(response) {
                    });
            });

            $("#false").click(function(){
                var obj_F=document.getElementById("false");
                reportArray.push(obj_F.id);
                result=obj_F.id;
                if (result == trueFalse){
                    $(".judge").hide();
                    $("#share-T").show();
                    $('#share-T h2').textillate({in: {effect: 'rollIn'}});
                }else{
                    $(".judge").hide();
                    $("#share-F").show();
                    $('#share-F h2').textillate({in: {effect: 'rollIn'}});
                    typewrite();
                }
                if(trueFalse == "true"){
                    $("#true_t").show();
                }else {
                    $("#false_t").show();
                }
                $(".erweima").hide();
                var userPage = {'option':reportArray.join(","),'Result':result};
                bridge.callHandler('postData',
                    {'postArray':userPage,//传给IOS值
                    },
                    function callback(response) {
                    });
            });


        });

    }else if (/(Android)/i.test(navigator.userAgent)) {
        //判断Android

//这是固定的不用改。

        function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function () {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
            }
        }

        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.init(function (message, responseCallback) {
                console.log('JS got a message', message);
                var data = {
                    'Javascript Responds': 'Wee!'
                };
                console.log('JS responding with', data);
                responseCallback(data);
            });
            var uniqueId = 1;

            function log(message, data) {
                var log = document.getElementById('log');
                var el = document.createElement('div');
                el.className = 'logLine';
                el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data);
                if (log.children.length) {
                    log.insertBefore(el, log.children[0])
                } else {
                    log.appendChild(el)
                }
            }

            /* Initialize your app here */
            //<font>"+value.stationName+"</font>
            /*我们在这注册一个js调用OC的方法，不带参数，且不用ObjC端反馈结果给JS：打开本demo对应的博文*/
            /*JS给ObjC提供公开的API，在ObjC端可以手动调用JS的这个API。接收ObjC传过来的参数，且可以回调ObjC*/
            //ios调js
            bridge.registerHandler('postData', function (data, responseCallback) {

            });
            $("#true").click(function(){
                var obj_T=document.getElementById("true");
                reportArray.push(obj_T.id);
                result=obj_T.id;
                if (result == trueFalse){
                    $(".judge").hide();
                    $("#share-T").show();
                    $('#share-T h2').textillate({in: {effect: 'rollIn'}});
                }else{
                    $(".judge").hide();
                    $("#share-F").show();
                    $('#share-F h2').textillate({in: {effect: 'rollIn'}});
                    typewrite();
                }
                if(trueFalse == "true"){
                    $("#true_t").show();
                }else {
                    $("#false_t").show();
                }
                $(".erweima").hide();

                var userPage = {'option':reportArray.join(","),'Result':result};
                bridge.callHandler('postData',
                    {'postArray':userPage//传给IOS值
                    },
                    function callback(response) {
                    });
            });

            $("#false").click(function(){
                var obj_F=document.getElementById("false");
                reportArray.push(obj_F.id);
                result=obj_F.id;
                if (result == trueFalse){
                    $(".judge").hide();
                    $("#share-T").show();
                    $('#share-T h2').textillate({in: {effect: 'rollIn'}});
                }else{
                    $(".judge").hide();
                    $("#share-F").show();
                    $('#share-F h2').textillate({in: {effect: 'rollIn'}});
                    typewrite();
                }
                if(trueFalse == "true"){
                    $("#true_t").show();
                }else {
                    $("#false_t").show();
                }
                $(".erweima").hide();
                var userPage = {'option':reportArray.join(","),'Result':result};
                bridge.callHandler('postData',
                    {'postArray':userPage,//传给IOS值
                    },
                    function callback(response) {
                    });
            });


        });

    }
    /*打字效果*/
    function  typewrite() {
        var text = document.getElementsByClassName('truthNR')[0];
        var str = '中铁山桥集团教授级高级工程师于宝东在接受记者采访时明确表示：“现在铁轨确实没有缝隙，这是真的。长度可以达到几十公里甚至上百公里的长度，整个钢轨没有轨缝接头。”<br>原来，无缝钢轨在刚生产出来的时候，也是一节一节的，通过无缝钢轨焊接机，将两根钢轨相邻两端升温至1000度以上，然后两根轨道挤压到一起。这样焊接出来的轨道，可以达到500米长。<br>经过焊接、打磨、检验一道道工序的钢轨，将被运输到铺设现场，再与其它轨道再次焊接，最终成为几百公里长的无缝轨道。';
        var arr = [];
        for(var i=0;i<str.length;i++){
            arr.push(str[i])
        }
        var text1 = '';
        var num = 0;
        var timer = setInterval(function (){
            if(num < arr.length){
                text1 += arr[num];
                text.innerHTML = text1;
                num++;
            } else {
                clearInterval(timer)
            }
        },60)

    }
});