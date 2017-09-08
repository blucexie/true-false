/**
 * Created by Administrator on 2017/6/22 0022.
 */
$(function () {
    // 测试题目
    var testTiele = "身上有纹身不能做核磁共振？";
    // 测试内容
    var testContent = "身上有纹身的话， 如果做核磁共振，就会有灼烧感，因为纹身的染料里有金属成分，这是真的吗？";
    //真：true;假：false
    var trueFalse="true";
    // array:真相；array[i]：段落。
    var array = ["目前大部分纹身采用的染料不含重金属，可以核磁共振。但是纹身病人开磁共振之前我们会和其说明，如果纹身含有金属颗粒，可能会有烧灼疼痛。目前还没有碰到因纹身做磁共振而疼痛的病人。"]
    var   reportArray=[];
    var result;

    $('#wrap .main h3').text(testTiele);
    $('#wrap .main .content p').text(testContent);

    function falseAtrue(obj){
        reportArray.push(obj.id);
        result=obj.id;
        if (result == trueFalse){
            $("#wrap").hide();
            $("#trueY").show();
        }else{
            $("#wrap").hide();
            $("#falseY").show();
            $('#falseY .share .truth .truthNR').text(array[0])
        }

    }

    /*获取页面地址*/
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    var Request = new Object();
    Request = GetRequest();
    var score;
    score = Request['score'];

    if(!score){

        $("#true").click(function(){
            var obj_T=document.getElementById("true");
            falseAtrue(obj_T);
        });

        $("#false").click(function(){
            var obj_F=document.getElementById("false");
            falseAtrue(obj_F);
        });

    }
    if(score == undefined){
       $('#wrap').show();
       $('#trueY').hide();
       $('#falseY').hide();
    }else{
        if (score == trueFalse){
            $("#wrap").hide();
            $("#trueY").show();
            $("#falseY").hide();
        }else{
            $("#wrap").hide();
            $("#trueY").hide();
            $("#falseY").show();
        }

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
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //判断iPhone|iPad|iPod|iOS
        //这是固定的不用改。
        function setupWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
        }
        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge) {
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
                falseAtrue(obj_T);
            });

            $("#false").click(function(){
                var obj_F=document.getElementById("false");
                falseAtrue(obj_F);
            });
            var userPage = {'option':reportArray.join(","),'Result':result};
            bridge.callHandler('postData',
                {'postArray':userPage//传给IOS值
                },
                function callback(response) {
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
                    , function() {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
            }
        }
        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.init(function(message, responseCallback) {
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
                falseAtrue(obj_T);
            });

            $("#false").click(function(){
                var obj_F=document.getElementById("false");
                falseAtrue(obj_F);
            });

            var userPage = {'option':reportArray.join(","),'Result':result};
            bridge.callHandler('postData',
                {'postArray':userPage//传给IOS值
                },
                function callback(response) {
                });
        });


    }
    $('#trueY .share .btn').click(function () {
        window.location.href ="../tf1.html";
    })
    $('#falseY .share .btn').click(function () {
        window.location.href ="../tf1.html";
    })
});