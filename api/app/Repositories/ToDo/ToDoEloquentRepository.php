<?php

namespace App\Repositories\ToDo;

use App\Models\ToDo;
use App\Repositories\Eloquent\EloquentRepository;
use Illuminate\Support\Facades\DB;

class ToDoEloquentRepository extends EloquentRepository implements ToDoRepositoryInterface
{
    /**
     * @return mixed
     */
    public function getModel()
    {
        return ToDo::class;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function getList($user_id)
    {
        return DB::table("to_dos")
            ->select("id", "user_id", "title as task_name", "status", "created_at", "updated_at", "end")
            ->where("user_id", $user_id)
            ->get();
    }
}
