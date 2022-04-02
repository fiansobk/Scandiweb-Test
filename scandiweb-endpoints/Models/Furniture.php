<?php 

namespace App\Models;

use App\Models\Product;
use App\Database\Queries;
use App\Database\Query;

class Furniture extends Product
{
    public function __construct($sku , $name , $price)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->type = 'Furniture';
        $this->attrType = 'Dimension';
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
        $height = $data['height'];
        $width = $data['width'];
        $length = $data['length'];
        $this->attrValue = $height . 'x' . $width . 'x' . $length ;
    }

    protected function valideAttrValue($data)
    {
        if ( isset($data['height']) && isset($data['width']) && isset($data['length']) )
        {
            if (is_numeric($data['height']) && is_numeric($data['width']) && is_numeric($data['length']))
                return TRUE;
            echo 'Please, enter numeric values for height, width and length';
            return FALSE;
        }
        echo 'Please, enter values corresponding to the product type.';
        return FALSE;
    }

    
}
?>