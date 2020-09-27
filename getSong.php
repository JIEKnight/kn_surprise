<?php
    header('content:text/html;charset="utf-8"');
    $link = mysql_connect('localhost', 'root', 'root');
    if(!$link){
        $responseDate['code'] = 1;
        $responseDate['message'] = '数据库链接失败！';
        echo json_encode($responseDate);
        exit;
    }

    mysql_set_charset('utf-8');
    mysql_select_db('surprise');
   
    $sql = "SELECT * FROM songs";
    $res = mysql_query($sql);
    $arr = array();
    while($row = mysql_fetch_assoc($res)){
        array_push($arr, $row);
    }
    echo(json_encode($arr));
    
    mysql_close($link);

?>