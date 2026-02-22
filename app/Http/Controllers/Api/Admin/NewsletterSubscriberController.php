<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;

class NewsletterSubscriberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subscribers = NewsletterSubscriber::latest()->paginate(20);
        return response()->json($subscribers);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subscriber = NewsletterSubscriber::findOrFail($id);
        $subscriber->delete();

        return response()->json(['message' => 'Subscriber removed successfully']);
    }
}
