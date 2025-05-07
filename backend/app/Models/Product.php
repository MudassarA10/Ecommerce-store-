<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
        'image_path',
        'stock',
    ];
    
    public function getImagePathAttribute($value)
    {
        return $value ? asset('storage/' . $value) : asset('placeholder.jpg');
    }
    
    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    /**
     * Relationship with Category
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function setImageAttribute($value)
    {
        if ($value && is_file($value)) {
          
            $path = $value->store('products', 'public');
            $this->attributes['image'] = $path;
        }
    }
    
}
