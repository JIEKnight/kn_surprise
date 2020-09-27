function showDate(){
    var timeObj = new TimeObj();
    var year =  timeObj.year;
    var month = timeObj.month;
    var day = timeObj.day;
    month = doubleNum(month + 1);
    var str = year + '-' + (month) + '-' + day; 
    return str;
}// 显示时间

function showDay(){
    var timeObj = new TimeObj();
    week = dayOfWeek(timeObj.week);
    day = doubleNum(timeObj.day);
    hour = doubleNum(timeObj.hour);
    minute = doubleNum(timeObj.minute);
    second = doubleNum(timeObj.second);
    month = doubleNum(timeObj.month + 1);
    var str = `${timeObj.year}年${month}月${day}日 星期${week} ${hour}:${minute}:${second}`; 
    return str;
}

function TimeObj(){
    var d = new Date();
    this.year =  d.getFullYear();
    this.month = d.getMonth();
    this.day = d.getDate();
    this.week = d.getDay();
    this.hour = d.getHours();
    this.minute = d.getMinutes();
    this.second = d.getSeconds();
}

function dayOfWeek(week){
    var arr = ['日', '一', '二', '三', '四', '五', '六'];
    return arr[week];
}   

function doubleNum(num){
    if(num < 10){
        return '0' + num;
    }else{
        return num;
    }
}

function getDate(strDate){
    if(strDate==null||strDate===undefined) return null;
    var date = new Date();
    try{
      if(strDate == undefined){ 
        date= null;
      }else if(typeof strDate == 'string'){
        strDate = strDate.replace(/:/g,'-');
        strDate = strDate.replace(/ /g,'-');
        var dtArr = strDate.split("-");
        if(dtArr.length>=3&&dtArr.length<6){
          date=new Date(dtArr[0], dtArr[1], dtArr[2]);
        }else if(date.length>8){
          date=new Date(Date.UTC(dtArr[0],dtArr[1]-1,dtArr[2],dtArr[3]-8,dtArr[4],dtArr[5]));
        }
      }else{
        date = null;
      }
      return date;
    }catch(e){ 
      alert('格式化日期出现异常：' + e.message); 
    } 
}

function test(){
    var timeObj = new TimeObj();
    var time1 = showDate(); 
    var time2 = "2020-05-20";
    var timeslong = getDate(time1).getTime()-getDate(time2).getTime();
    // return (timeslong/(1000*60*60*24));
    return `${timeslong/(1000*60*60*24)}天${doubleNum(timeObj.hour)}时${doubleNum(timeObj.minute)}分${doubleNum(timeObj.second)}秒啦`; 
}

function slideShow(node, childNode, time){
  setInterval(function(){
      // console.log(childNode.);
      var offsetX = node.offsetLeft;
      startMove(node, {
          'left': node.offsetLeft - childNode.offsetWidth - 40
      },
      function(){
          if(node.offsetLeft <= -node.offsetWidth / 2){
          node.style.left = '0px';
      }
      }
      );           
  } ,time)
} // 轮播效果

function cpPlay(cp, audio, count){
  setInterval(function(){
  cp.style.transform = `rotateZ(${count % 360}deg)`;
  if(audio.paused){
      count = count;
  }else{
      count += 1;
  }
}, 30)
}// 唱片的旋转

function btnSwitch(audio, isPlay){
  if(audio.paused){
      audio.play()
      isPlay.className = 'iconfont icon-zanting';
  }else{
      audio.pause();
      isPlay.className = 'iconfont icon-kaishi';
  }
}// 开关的转换

function isPlay(audio, isPlay){
  if(audio.paused){
      // audio.play()
      isPlay.className = 'iconfont icon-kaishi';
  }else{
      // audio.pause();
     
      isPlay.className = 'iconfont icon-zanting';
  }
}// 检测是否播放

function progressBar(audio, past, current){
  setInterval(function(){
      var widthline = Math.round(audio.currentTime)/Math.round(audio.duration) * 100;
      past.style.width = widthline + "%";
      current.innerHTML = `${doubleNum(parseInt(Math.round(audio.currentTime)/60))}:${doubleNum(Math.round(audio.currentTime) % 60)}/${doubleNum(parseInt(Math.round(audio.duration)/60))}:${doubleNum(Math.round(audio.duration) % 60)}`;
      // console.log(Math.round(audio.duration));            
      },1000)
}// 进度条

function download(data){
  // 获取返回的数据
  var oAudio = document.getElementById('audio');
  oAudio.src = data.url;
}

function getSong(index, audio, songname){
  $ajax({
      method: 'get',
      url: 'getSong.php',
      success: function(result){
          var arr = JSON.parse(result);
          if(index < 0){
            index = arr.length - 1;
          };
          if(index == arr.length){
            index = 0;
          }
          var newScript = document.createElement('script');
          newScript.src = `http://www.kuwo.cn/url?format=mp3&rid=${arr[index].url}&response=url&type=convert_url3&br=128kmp3&from=web&t=1598794215821&httpsStatus=1&reqId=f088fae0-eac4-11ea-aad1-a17c406babb0&callback=download`;
          document.body.appendChild(newScript);
          songname.innerHTML = arr[index].songname;
          audio.index = index;
      },
      error: function(msg){
          alert(msg);
      }
  });
}

function username(username){
  var str = 'none';
  if(!username){
  str = '6～18个字符，可使用字母、数字、下划线，需要以字母开头'; 
  }else if(username.length < 6 || username.length > 18){
      str = '用户名长度必须是6~18位';
  } else if(!/^[a-zA-Z]/.test(username)){
      str = '用户名首字母必须为字母';
  }else if(/\W/.test(username)){
      str = '用户名必须由数字字母下划线组成';
  }else{
      str = '√';
  }
  return str;
}