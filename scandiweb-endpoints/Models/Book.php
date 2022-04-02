<?php

namespace App\Models;

use App\Database\Query;
use App\Models\Product;

class Book extends Product
{
    public function __construct($sku , $name , $price)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->type = 'Book';
        $this->attrType = 'Weight';
    }

    public function create($data)
    {
        if ( ! $this->ValideProductData() )
            return;
        if ( ! $this->valideAttrValue($data) )
            return;
        $this->setAttrValue($data);
        $query = new Query();
        $query->create($this->getData());
    }

    protected function setAttrValue($data) 
    {
        $this->attrValue = $data['weight'] ;

    }

    protected function valideAttrValue($data)
    {
        if (isset($data['weight']))
        {
            if ( is_numeric($data['weight']) )
                return TRUE;
            echo 'Please, enter a numeric value for the weight.';
            return FALSE;
        }
        echo 'Please, enter the value corresponding to the product type.';
        return FALSE;
    }

}

?>