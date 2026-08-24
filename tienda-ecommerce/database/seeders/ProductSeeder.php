use App\Models\Product;

public function run(): void
{
    Product::create([
        'name' => 'Carro de Control Remoto',
        'description' => 'Un carro veloz de color rojo',
        'price' => 25.00,
        'stock' => 10
    ]);
}