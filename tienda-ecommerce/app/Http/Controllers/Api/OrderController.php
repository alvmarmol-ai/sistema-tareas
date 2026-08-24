use Stripe\Stripe;
use Stripe\PaymentIntent;

public function checkout(Request $request)
{
    Stripe::setApiKey(config('services.stripe.secret'));

    // Creamos una intención de cobro con el monto total
    $paymentIntent = PaymentIntent::create([
        'amount' => $request->total * 100, // Stripe cobra en centavos
        'currency' => 'usd',
        'payment_method' => $request->payment_method_id,
        'confirm' => true,
    ]);

    return response()->json([
        'message' => '¡Pago realizado con éxito!',
        'payment_id' => $paymentIntent->id
    ], 200);
}