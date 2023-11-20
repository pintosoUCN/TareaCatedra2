<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable=[
        'name',
        'date',
        'symptoms',
        'user_id'
    ];
    // Si hay una relación con User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
