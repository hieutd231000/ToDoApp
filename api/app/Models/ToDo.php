<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDo extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        "title",
        "status",
        "user_id",
        "begin",
        "end",
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
