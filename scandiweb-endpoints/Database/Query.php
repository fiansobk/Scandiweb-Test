<?php

namespace App\Database;

use App\Database\Connection;

class Query extends Connection
{
    public function all()
    {
        $sql = 'SELECT * FROM `product` LEFT JOIN `product_attribute` ON product.id = product_id';
        $query = $this->getDb()->prepare($sql);
        $query->execute();
        return $query->fetchAll();
    }
    
    public function productExist($sku)
    {
        $sql = 'SELECT * FROM `product` WHERE sku = ?';
        $query = $this->getDb()->prepare($sql);
        $query->execute([$sku]);
        return empty($query->fetch()) ? FALSE : TRUE;
    }

    public function create($data)
    {
        $sql = 'INSERT INTO `product` (sku , name , price , type) VALUES ( ? , ? , ? , ?)';
        $query = $this->getDb()->prepare($sql);
        if ( !$query->execute($data['product']) )
            return 'Error';
        $productId = $this->getDb()->lastInsertId();
        array_unshift($data['attribute'] , $productId);
        $sql = 'INSERT INTO `product_attribute` ( product_id , type , value ) VALUES ( ? , ? , ?)';
        $query = $this->getDb()->prepare($sql);
        $query->execute($data['attribute']);
    }

    public function delete($id)
    {
        $sql = 'DELETE FROM  `product` WHERE id = ? '; /* Attribute is automatically deleted (on cascade ) */
        $query = $this->getDb()->prepare($sql);
        return $query->execute([$id]);
    }
}

?>