<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

class APIBaseController extends Controller
{
    protected $data;

    public function __construct(Request $request) {
        $this->data['route'] = \Request::route()->getName();
    }

    public function sendResponse($result, $message = 'OK')
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }

    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    public function cacheKey()
    {
        $url = request()->url();
        $queryParams = request()->query();

        //Sorting query params by key (acts by reference)
        ksort($queryParams);

        //Transforming the query array to query string
        $queryString = http_build_query($queryParams);

        $fullUrl = "{$url}?{$queryString}";

        return $fullUrl;
    }
}
