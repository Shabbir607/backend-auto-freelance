<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsletterSubscriberController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:newsletter_subscribers,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $subscriber = NewsletterSubscriber::create([
            'email' => $request->email,
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Subscribed successfully!',
            'data' => $subscriber
        ], 201);
    }
}
