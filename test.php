<?php
    header('content:text/html;charset="utf-8"');
    $data = $_POST['data'];
    $responseDate = array('code' => 0, 'message' => '');
    if(!$data){
        $responseDate['code'] = 1;
        $responseDate['message'] = '没有获取到数据!';
        echo (json_encode($responseDate));
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
    // $data = json_decode($data);
    $cont = count($data);
    var_dump(json_decode($data));
    // for($i = 0; $i < $cont; $i++){    
    //     var_dump($data.data.list[$i].name);    
    // }
    // $sql1 = "SELECT * FROM songs WHERE songname='{$songname}'";

    // $res = mysql_query($sql1);
    // $row = mysql_fetch_assoc($res);
    // if($row){
    //     $responseDate['code'] = 4;
    //     $responseDate['message'] = '歌名已存在！';
    //     echo json_encode($responseDate);
    //     exit;
    // }

    // $sql2 = "INSERT INTO songs(songname,url) VALUES('{$songname}', '{$songurl}')";

    // $res = mysql_query($sql2);
    // if(!$res){
    //     $responseDate['code'] = 5;
    //     $responseDate['message'] = '添加失败！';
    //     echo json_encode($responseDate);
    // }else{
    //     $responseDate['message'] = '添加成功！';
    //     echo json_encode($responseDate);
    // }
    // mysql_close($link);
    // echo(json_encode($responseDate));
    
?>