<?php
    header('content-type:text/html;charset="utf-8"');
    $id = $_GET['id'];

    $responseDate = array('code' => 0, 'message' => '');
    if(!$id){
        $responseDate['code'] = 1;
        $responseDate['message'] = '修改的歌曲不存在！';
        echo json_encode($responseDate);
        exit;
    }

    $link = mysql_connect('localhost', 'root', 'root');
    if(!$link){
        $responseDate['code'] = 2;
        $responseDate['message'] = '数据库链接失败！';
        echo json_encode($responseDate);
        exit;
    }

    mysql_set_charset('utf-8');
    mysql_select_db('surprise');

    $sql = "SELECT * FROM songs WHERE id={$id}";

    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    if(!$row){
        $responseDate['code'] = 3;
        $responseDate['message'] = '修改的歌曲不存在！';
        echo json_encode($responseDate);
        exit;
    }else{
        $responseDate['message'] = $row;
        echo json_encode($responseDate);
    }
    mysql_close($link);
?>