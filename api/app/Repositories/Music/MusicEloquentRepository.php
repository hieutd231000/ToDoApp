<?php

namespace App\Repositories\Music;

use App\Models\Music;
use App\Repositories\Eloquent\EloquentRepository;
use Illuminate\Support\Facades\DB;

class MusicEloquentRepository extends EloquentRepository implements MusicRepositoryInterface
{
    /**
     * @return mixed
     */
    public function getModel()
    {
        return Music::class;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function getList($user_id)
    {
        return DB::table("music")
            ->join("music_categories", "music.category_id", "=", "music_categories.id")
            ->select("music.id", "music.name", "music_categories.title as category", "music.link", "music.artist")
            ->where("user_id", $user_id)
            ->get();
    }
}
