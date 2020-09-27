function getStyle(node, style){
    return node.currentStyle ? node.currentStyle[style] : getComputedStyle(node)[style];
}
function startMove(node, styleObj, complete){
    clearInterval(node.timer);
    node.timer = setInterval(function(){
        var isEnd = true;
        for(var style in styleObj){
            var iCur = null;
            var iTarget = styleObj[style];
            if(style == 'opacity'){
                iCur = parseInt(parseFloat(getStyle(node, 'opacity')) * 100);
                // alert(iCur);
            }else{
                iCur = parseInt(getStyle(node, style))
            }
            var speed = (iTarget - iCur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            
            if(style == 'opacity'){
                iCur += speed;
                console.log(iCur, iTarget);
                node.style.opacity = iCur / 100;
                // node.style.filter = 'alpha(opacity=' + iCur +')';
            }else{
                node.style[style] = iCur + speed + 'px';
            }
            if(iCur != iTarget){
                isEnd = false;
            }  
        }  
        if(isEnd){
            clearInterval(node.timer);
            if(complete){
                complete.call(node);
            }
        }         
    }, 30)        
}// 改变样式的节点，改变的样式对象，回调函数  链式运动
