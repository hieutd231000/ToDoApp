<?php

namespace App\Providers;

use App\Repositories\Music\MusicEloquentRepository;
use App\Repositories\Music\MusicRepositoryInterface;
use App\Repositories\ToDo\ToDoEloquentRepository;
use App\Repositories\ToDo\ToDoRepositoryInterface;
use App\Repositories\Users\UserEloquentRepository;
use App\Repositories\Users\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            UserRepositoryInterface::class,
            UserEloquentRepository::class,
        );

        $this->app->bind(
            ToDoRepositoryInterface::class,
            ToDoEloquentRepository::class,
        );

        $this->app->bind(
            MusicRepositoryInterface::class,
            MusicEloquentRepository::class,
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
