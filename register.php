<?php
    header('content-type:text/html;charset="utf-8"');
    $username = $_POST['username'];
    $password = $_POST['password'];
    $create_date = $_POST['create_date'];
    var_dump($username,$password)
    // echo "$username";
    // var_dump($username);
    // $responseDate = array('code' => 0, 'message' => '');
    // if(!$username){
    //     $responseDate['code'] = 1;
    //     $responseDate['message'] = '用户名不能为空！';
    //     echo json_encode($responseDate);
    //     exit;
    // }
    // if(!$password){
    //     $responseDate['code'] = 2;
    //     $responseDate['message'] = '密码不能为空！';
    //     echo json_encode($responseDate);
    //     exit;
    // }



    // // var_dump($username, $password, $create_date);
    // $link = mysql_connect('localhost', 'root', 'root');
    // if(!$link){
    //     $responseDate['code'] = 3;
    //     $responseDate['message'] = '数据库链接失败！';
    //     echo json_encode($responseDate);
    //     exit;
    // }
    // mysql_set_charset('utf-8');
    // mysql_select_db('userdata');
    // $sql1 = "SELECT * FROM drusocute WHERE username='{$username}'";

    // $res = mysql_query($sql1);
    // $row = mysql_fetch_assoc($res);
    // if($row){
    //     $responseDate['code'] = 4;
    //     $responseDate['message'] = '用户名已存在！';
    //     echo json_encode($responseDate);
    //     exit;
    // }
    // $str = md5(md5(md5($password)."xxx")."yyy");

    // $sql2 = "INSERT INTO drusocute(username,password,create_date) VALUES('{$username}', '{$str}', {$create_date})";

    // $res = mysql_query($sql2);
    // if(!$res){
    //     $responseDate['code'] = 5;
    //     $responseDate['message'] = '注册失败！';
    //     echo json_encode($responseDate);
    // }else{
    //     $responseDate['message'] = '注册成功！';
    //     echo json_encode($responseDate);
    // }
    // mysql_close($link);
    // // echo($responseDate['code'])

?>
