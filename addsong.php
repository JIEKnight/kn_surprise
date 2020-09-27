<?php
    header('content-type:text/html;charset="utf-8"');
    $songname = $_POST['songname'];
    $songurl = $_POST['songurl'];
    // echo "$songname";
    // var_dump($songname);
    $responseDate = array('code' => 0, 'message' => '');
    if(!$songname){
        $responseDate['code'] = 1;
        $responseDate['message'] = '歌名不能为空！';
        echo json_encode($responseDate);
        exit;
    }
    if(!$songurl){
        $responseDate['code'] = 2;
        $responseDate['message'] = '地址不能为空！';
        echo json_encode($responseDate);
        exit;
    }

    // var_dump($songname, $songurl, $create_date);
    $link = mysql_connect('localhost', 'root', 'root');
    if(!$link){
        $responseDate['code'] = 3;
        $responseDate['message'] = '数据库链接失败！';
        echo json_encode($responseDate);
        exit;
    }
    mysql_set_charset('utf-8');
    mysql_select_db('surprise');
    $sql1 = "SELECT * FROM songs WHERE songname='{$songname}'";

    $res = mysql_query($sql1);
    $row = mysql_fetch_assoc($res);
    if($row){
        $responseDate['code'] = 4;
        $responseDate['message'] = '歌名已存在！';
        echo json_encode($responseDate);
        exit;
    }

    $sql2 = "INSERT INTO songs(songname,url) VALUES('{$songname}', '{$songurl}')";

    $res = mysql_query($sql2);
    if(!$res){
        $responseDate['code'] = 5;
        $responseDate['message'] = '添加失败！';
        echo json_encode($responseDate);
    }else{
        $responseDate['message'] = '添加成功！';
        echo json_encode($responseDate);
    }
    mysql_close($link);
    // echo($responseDate['code'])

?>
