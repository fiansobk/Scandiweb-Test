<?php

namespace App\Models;

use App\Database\Query;

abstract class Product 
{
    protected $sku;
    protected $name;
    protected $price;
    protected $type;
    protected $attrType;
    protected $attrValue;

    public abstract function create($data);

    protected abstract function setAttrValue($data);

    protected abstract function valideAttrValue($data);

    protected function getData()
    {
        return [
            'product' => [
                $this->sku,
                $this->name,
                $this->price,
                $this->type,
            ],
            'attribute' => [
                $this->attrType ,
                $this->attrValue
            ]
        ];
    }

    public static function selectAll()
    {
        $query = new Query();
        $products = $query->all();
        echo json_encode($products);
    }

    public static function delete( $idList )
    {
        $query = new Query();
        foreach ($idList as $id):
            $query->delete($id);
        endforeach;
    }

    public static function skuNotAvailable($sku)
    {
        $query = new Query();
        $notAvailable = $query->productExist($sku);
        return $notAvailable;
    }

    protected function ValideProductData()
    {
        if (empty($this->sku) || empty($this->name) || empty($this->price))
        {
            echo 'please, fill up the required fields';
            return FALSE;
        }
        if ( !preg_match('/^([A-Z0-9]+)$/' , $this->sku) || !preg_match('/^([A-Za-z0-9 ]+)$/' , $this->name) || !is_numeric($this->price) )
        {
            echo 'please, verify your data';
            return FALSE;
        }
        return TRUE;
    }
    
    
}

?>