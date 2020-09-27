window.onload = function(){
    var oUl = document.getElementById('banner_ul');
    var oLi = oUl.getElementsByTagName('li');
    var oLoveIcon = document.getElementById('love_icon');
    var oSecret = document.getElementById('secret_content');
    var oSbutton = oSecret.getElementsByTagName('button');
    var oSdiv = oSecret.getElementsByTagName('div');
    var oSi = oSecret.getElementsByTagName('i');
    var oIsplay = document.getElementById('isPlay');
    var oLast = document.getElementById('lastBtn');
    var oNext = document.getElementById('nextBtn');     
    var oAudio = document.getElementById('audio');
    var oPastTime = document.getElementById('past_time');
    var oCurrentTime = document.getElementById('current_time');
    var oControlBtn = document.getElementById('controlBtn');
    var oCp = document.getElementById('changpian');
    var oSongName = document.getElementById('song_name');
    var oMore = document.getElementById('more');
    var oNav = document.getElementById('nav');
    var oNavLi = oNav.getElementsByTagName('li');
    var oGururin = document.getElementById('gururin');
    var oGururinUl = oGururin.getElementsByTagName('ul')[0];
    var oGururinLi = oGururinUl.getElementsByTagName('li');
    oUl.innerHTML += oUl.innerHTML;
    oUl.style.width = (oLi.length * 240) + 'px';
    slideShow(oUl, oLi[0], 3000);
    var imgdeg = 0;// 爱心图标旋转角度
    var id = null;
    var cubedeg = 0// 旋转木马的角度
    var oLoginBox = document.getElementById('login_box');
    var oLoginInput = oLoginBox.getElementsByTagName('input');
    var oLoginBtn = document.getElementById('login_btn');
    var oSubmitBtn = document.getElementById('submit_btn');
    var oCancelBtn1 = document.getElementById('cancel_btn1');
    var oAlertInfo1 = document.getElementById('alert_info1');

    var oRegisterBox = document.getElementById('register_box');
    var oRegisterInput = oRegisterBox.getElementsByTagName('input');
    var oregisterBtn = document.getElementById('register_btn');
    var oEnsureBtn = document.getElementById('ensure_btn');
    var oCancelBtn2 = document.getElementById('cancel_btn2');
    var oAlertInfo2 = document.getElementById('alert_info2');
    var isUsername = false;
    var isPassword = false;

    // 登录
    oLoginBtn.onclick = function(){
        // alert('登录');
        setTimeout(function(){
            oLoginBox.style.display = 'block';
        }, 1000);
    }
    oSubmitBtn.onclick = function(){
        // alert('提交');
        $ajax({
            method: 'post',
            url: 'login.php',
            data: {
                username: oLoginInput[0].value,
                password: oLoginInput[1].value
            },
            success: function(result){
                var obj = JSON.parse(result);
                if(obj.code){
                    oAlertInfo1.style.display = 'block';
                    // alert('错误');
                    oAlertInfo1.innerHTML = obj.message;
                }else{
                    alert('成功');
                }
                // oAlertInfo1.innerHTML = obj.message;
            },
            error: function(msg){
                alert(msg);
            }
        })
    }
    oCancelBtn1.onclick = function(){
        oLoginBox.style.display = 'none';
        oLoginInput[0].value = '';
        oLoginInput[1].value = '';
        oAlertInfo1.style.display = 'none';
        // alert('取消');
    }
    // 注册
    oregisterBtn.onclick = function(){
        // alert('登录');
        setTimeout(function(){
            oRegisterBox.style.display = 'block';
        }, 1000);
    }
    oRegisterInput[0].onblur = function(){
        var str = username(oRegisterInput[0].value);
        // alert(oRegisterInput[0].value);
        if(str == '√'){
            oAlertInfo2.className = 'alert alert-success';
            isUsername = true;
        }else{
            oAlertInfo2.className = 'alert alert-danger';
            isUsername = false;
        }
        oAlertInfo2.style.display = 'block';
        oAlertInfo2.innerHTML = str;
        // alert('失去焦点');
    }
    oRegisterInput[2].onblur = function(){
        if(oRegisterInput[2].value == oRegisterInput[1].value){
            oAlertInfo2.className = 'alert alert-success';
            oAlertInfo2.innerHTML = '√';
            isPassword = true;
        }else{
            oAlertInfo2.className = 'alert alert-danger';
            oAlertInfo2.innerHTML = '两次密码不一致，请重新输入！';
            isPassword = false;
        }
        oAlertInfo2.style.display = 'block';
        
    }
    oEnsureBtn.onclick = function(){
        // alert('提交');
        // 验证用户名是否合法
        //1、6～18个字符，可使用字母、数字、下划线，需要以字母开头
        //2、用户名长度必须是6~18位
        //3、用户名必须由数字字母下划线组成
        if(isPassword && isUsername){
            $ajax({
            method: 'post',
            url: 'register.php',
            data: {
                username: oRegisterInput[0],
                password: oRegisterInput[1],
                },
            success: function(result){
                alert(result);
            },
            error: function(msg){
                alert(msg);
            }
            })
        }
        
    }
    oCancelBtn2.onclick = function(){
        oRegisterBox.style.display = 'none';
        oLoginBox.style.display = 'none';
        oRegisterInput[0].value = '';
        oRegisterInput[1].value = '';
        oRegisterInput[2].value = '';
        oAlertInfo2.style.display = 'none';
        // alert('取消');
    }


    // 图标旋转
    setInterval(function(){
        oLoveIcon.style.transform = `rotateZ(${imgdeg % 360}deg)`;
        isPlay(oAudio, oIsplay);
        imgdeg += 1;
        // console.log(oAudio.index);
        if(Math.round(oAudio.currentTime) == Math.round(oAudio.duration)){
            id = Number(oAudio.index) + 1;
            getSong(id, oAudio, oSongName);
            
        }
    },30)
    // 旋转马车
    setInterval(function(){
        oGururinUl.style.transform = `rotateY(${cubedeg}deg)`;
        cubedeg += 0.5;
    },30)
    // learnmore按钮
    for(var i = 0; i < oSbutton.length; i++){
        oSbutton[i].index = i;
        oSi[i].index = i;
        oSbutton[i].onclick = function(){
            // alert(this.index);
            var num = Math.ceil(Math.random() * 15);
            num = doubleNum(num);
            console.log(num);
            for(var j = 0; j < oSbutton.length; j++){
                oSdiv[j].className = `content`;
            }
            oSdiv[this.index].style.backgroundImage = `url(./img/cat/${num}600.jpg)`;
            oSdiv[this.index].className = 'content active';
        }
        oSi[i].onclick = function(){
            for(var j = 0; j < oSi.length; j++){
                oSdiv[j].className = `content`;
            }
        }
    }
    progressBar(oAudio, oPastTime, oCurrentTime);
    oIsplay.onclick = function(){
        btnSwitch(oAudio, oIsplay);
    }
    // 默认播放歌曲
    getSong(0,oAudio,oSongName);
    var cpdeg = 0; // 唱片的旋转角度
    cpPlay(oCp, oAudio, cpdeg);
    oNext.onclick = function(){
        id = Number(oAudio.index) + 1;
        getSong(id,oAudio,oSongName);
    }// 下一首
    oLast.onclick = function(){
        id = Number(oAudio.index) - 1;
        getSong(id,oAudio,oSongName);
        // alert('sgs');
    }// 上一首
    localStorage.setItem('islogin', false);
    


} 