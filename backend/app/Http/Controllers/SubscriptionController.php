<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class SubscriptionController extends Controller
{
    /**
     * Premium'ga obuna bo'lish (Demo - haqiqiy to'lov tizimi yo'q)
     */
    public function subscribe(Request $request)
    {
        $user = auth()->user();

        // Agar allaqachon premium bo'lsa
        if ($user->isPremium()) {
            return response()->json([
                'success' => false,
                'message' => 'You already have an active premium subscription',
            ], 400);
        }

        // 1 oylik premium berish (demo)
        $user->update([
            'subscription_type' => 'premium',
            'subscription_expires_at' => Carbon::now()->addMonth(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Premium subscription activated successfully!',
            'data' => [
                'subscription_type' => 'premium',
                'expires_at' => $user->subscription_expires_at,
            ],
        ]);
    }

    /**
     * Obunani bekor qilish
     */
    public function cancel()
    {
        $user = auth()->user();

        $user->update([
            'subscription_type' => 'free',
            'subscription_expires_at' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Subscription cancelled successfully',
        ]);
    }

    /**
     * Obuna statusini ko'rish
     */


}
