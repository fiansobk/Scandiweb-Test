<?php

namespace App\Database;

use \PDO;

abstract class Connection
{
    # DB Properties
    private $host = "localhost" ;
    private $dbname = "scandiweb" ;
    private $user = "root" ;
    private $pass = "" ;

    protected static $_db;

    private function setDb()
    {
        self::$_db = new PDO('mysql:host='.$this->host.';dbname='.$this->dbname.';charset=utf8',$this->user,$this->pass);
        self::$_db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE , PDO::FETCH_ASSOC);
    }

    protected function getDb ()
    {
        if (self::$_db == null)
            $this->setDb();
        return self::$_db;
    }
}

?>