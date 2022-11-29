<?php

namespace App\Repositories\Users;

use App\Models\User;
use App\Repositories\Eloquent\EloquentRepository;
use Illuminate\Support\Facades\DB;

class UserEloquentRepository extends EloquentRepository implements UserRepositoryInterface
{
    /**
     * @return mixed
     */
    public function getModel()
    {
        return User::class;
    }
    /**
     * Get username by id
     *
     * @param $userId
     * @return mixed
     */
    public function getUserName($userId)
    {
        return DB::table("users")
            ->where("id", $userId)
            ->first()->name;
    }
}
