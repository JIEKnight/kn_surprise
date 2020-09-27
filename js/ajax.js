function $ajax({method = 'get', url, data, success, error}){
    var xhr = null;
    // 1、创建ajax对象
    try{
        xhr = new XMLHttpRequest();
    }catch(error){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 2、判断如果数据存在
    if(data){
        data = querystring(data);
    }
    if(method == 'get' && data){
        url = url + '?' + data;
    }
    // 3、 打开
    xhr.open(method, url, true);
    // 4、 提交
    if(method == 'get'){
        xhr.send();
    }else{
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                // console.log(url)
                if(success){
                    success(xhr.responseText);
                }
            }else{
                if(error){
                    error('Error:' + xhr.status);
                }
            }
        }
    }

}
function querystring(data){
    var str = '';
    for(var arr in data){
        str += arr + '=' + data[arr] + '&';
    }
    str = str.substring(0, str.length - 1);
    return str;
}