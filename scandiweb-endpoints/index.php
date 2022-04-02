<?php
    require_once 'config.php';
    require_once 'vendor/autoload.php';

    use App\Controllers\MyController;
    
    
    if ($_GET['url'] === 'endpoint') 
    {
        $req = $_SERVER['REQUEST_METHOD'];
        $controller = new MyController($req);
        $controller->req();
    }
    else if ($_GET['url'] === 'delete')
    {
        $controller = new MyController('DELETE'); // endpoint host does not allow DELETE method
        $controller->req();
    }
    else
        echo '404';
?>