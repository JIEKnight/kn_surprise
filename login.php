<?php
    header('content-type:text/html;charset="utf-8"');
    $username = $_POST['username'];
    $password = $_POST['password'];
    // var_dump($username, $password);
    $responseDate = array('code' => 0, 'message' => '');
    if(!$username){
        $responseDate['code'] = 1;
        $responseDate['message'] = '用户名不能为空！';
        echo json_encode($responseDate);
        exit;
    }
    if(!$password){
        $responseDate['code'] = 2;
        $responseDate['message'] = '密码不能为空！';
        echo json_encode($responseDate);
        exit;
    }

    $link = mysql_connect('localhost', 'root', 'root');
    if(!$link){
        $responseDate['code'] = 3;
        $responseDate['message'] = '数据库链接失败！';
        echo json_encode($responseDate);
        exit;
    }

    mysql_set_charset('utf-8');
    mysql_select_db('surprise');
    $str = md5(md5(md5($password)."xxx")."yyy");
    $sql = "SELECT * FROM userdata WHERE username='{$username}' AND password='{$str}'";
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    // var_dump($row);
    if(!$row){
        $responseDate['code'] = 4;
        $responseDate['message'] = '用户名或密码错误！';
        echo json_encode($responseDate);
        // var_dump($str);
    }else{
        $responseDate['message'] = '登录成功！';
        echo json_encode($responseDate);
    }
    mysql_close($link);
?>