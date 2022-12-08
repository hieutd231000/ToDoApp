<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        "name",
        "link",
        "category_id",
        "user_id",
        "artist",
    ];

    protected $primaryKey = "id";

    /**
     * Relation with table user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user() {
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
