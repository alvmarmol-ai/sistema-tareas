<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: "1.0.0",
    title: "API de E-Commerce Segura",
    description: "Documentación interactiva de la tienda online con Laravel 12 y Stripe"
)]
#[OA\Server(
    url: "http://127.0.0.1:8000",
    description: "Servidor Local"
)]
#[OA\SecurityScheme(
    securityScheme: "bearerAuth",
    type: "http",
    name: "Authorization",
    in: "header",
    scheme: "bearer",
    bearerFormat: "JWT"
)]
abstract class Controller
{
    //
}