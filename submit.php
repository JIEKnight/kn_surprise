<?php
    header('content-type:text/html;charset="utf-8"');
    $songname = $_POST['songname'];
    $url = $_POST['url'];
    $id = $_POST['id'];

    $responseDate = array('code' => 0, 'message' => '');
    if(!$songname){
        $responseDate['code'] = 1;
        $responseDate['message'] = '用户名不能为空！';
        echo json_encode($responseDate);
        exit;
    }
    if(!$url){
        $responseDate['code'] = 2;
        $responseDate['message'] = '密码不能为空！';
        echo json_encode($responseDate);
        exit;
    }
    if(!$id){
        $responseDate['code'] = 3;
        $responseDate['message'] = '修改的用户名不存在！请重试！';
        echo json_encode($responseDate);
        exit;
    }
    // var_dump($songname,$url,$id);

    $link = mysql_connect('localhost', 'root', 'root');
    if(!$link){
        $responseDate['code'] = 4;
        $responseDate['message'] = '数据库链接失败！';
        echo json_encode($responseDate);
        exit;
    }

    mysql_set_charset('utf-8');
    mysql_select_db('surprise');

    //判断是否重名
    $sql1 = "SELECT * FROM songs WHERE songname='{$songname}' AND id!={$id}";
    $res1 = mysql_query($sql1);
    $row1 = mysql_fetch_assoc($res1);
    // var_dump($res);
    // var_dump($row);
    if($row1){
        $responseDate['code'] = 5;
        $responseDate['message'] = '用户名已存在！';
        echo json_encode($responseDate);
        exit;
    }
    // echo json_encode($responseDate);
    $sql2 = "UPDATE songs set songname='{$songname}', url='{$url}' WHERE id={$id}";
    $res2 = mysql_query($sql2);
    if(!$res2){
        $responseDate['code'] = 6;
        $responseDate['message'] = '修改失败！请重试！';
        echo json_encode($responseDate);
        exit;
    }else{
        $responseDate['message'] = '修改成功！';
        echo json_encode($responseDate);
    }
    
    mysql_close($link);
?>