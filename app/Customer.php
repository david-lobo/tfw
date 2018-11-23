<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public $table = 'customers';
    protected $fillable = [
        'name', 'email', 'mobileno'
    ];
}
