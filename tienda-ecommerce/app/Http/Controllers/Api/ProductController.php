<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class ProductController extends Controller
{
    #[OA\Get(
        path: "/api/products",
        summary: "Obtener catálogo de productos",
        tags: ["Productos"],
        responses: [
            new OA\Response(
                response: 200,
                description: "Lista de productos devuelta con éxito"
            )
        ]
    )]
    public function index()
    {
        return response()->json(Product::all(), 200);
    }
}