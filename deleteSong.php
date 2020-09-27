<?php
    header('content-type:text/html;charset="utf-8"');
    $id = $_GET['id'];
    // echo $id;   
    $link = mysql_connect('localhost','root','root');
    $responseDate = array('code' => 0, 'message' => '');
    if(!$link){
        $responseDate['code'] = 1;
        $responseDate['message'] = '数据库链接失败！';
        echo json_encode($responseDate);
        exit;
    }
    mysql_set_charset('utf-8');
    mysql_select_db('surprise'); 
    $sql = "DELETE FROM songs WHERE id={$id}";
    $res = mysql_query($sql);
    if(!$res){
        $responseDate['code'] = 2;
        $responseDate['message'] = '删除数据失败！';
        echo json_encode($responseDate);
    }else{
        $responseDate['message'] = '删除数据成功！';
        echo json_encode($responseDate);
    }
    mysql_close($link);
    
?>