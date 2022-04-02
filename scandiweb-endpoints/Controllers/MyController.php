<?php

namespace App\Controllers;

use App\Database\Query;
use App\Models\Product;

class MyController
{
    private $requestType;

    public function __construct($requestType)
    {
        $this->requestType = $requestType;
    }

    public function req()
    {
        switch ($this->requestType) {
            case 'GET':
                Product::selectAll();
                break;
            case 'POST':
                $this->create();
                break;
            case 'DELETE':
                Product::delete($this->getData());
                break;
            
            default:
                echo '404';
                break;
        }
    }

    private function create()
    {
        $productType = ucfirst(strtolower( filter_var($this->getData('type') , FILTER_SANITIZE_FULL_SPECIAL_CHARS) ));
        $className = 'App\\Models\\' . $productType; 
        if ( !file_exists( './Models/' . $productType .'.php' ) )
        {
            echo 'Product type not recognized.';
            return;
        }
        $productSku = filter_var($this->getData('sku') , FILTER_SANITIZE_FULL_SPECIAL_CHARS);   
        $productName = filter_var($this->getData('name') , FILTER_SANITIZE_FULL_SPECIAL_CHARS);   
        $productPrice = filter_var($this->getData('price') , FILTER_SANITIZE_FULL_SPECIAL_CHARS);   
        if (Product::skuNotAvailable($productSku) )
        {
            echo 'SKU not available';
            return;
        }
        $product = new $className($productSku , $productName , $productPrice);
        $product->create($this->getData());
    }

    private function getData($value = '')
    {
        $json = json_decode(file_get_contents('php://input'), true);
        if ($value === '')
            return $json;
        if (!$json[$value]) 
            return NULL;
        return $json[$value];
    }

}

?>