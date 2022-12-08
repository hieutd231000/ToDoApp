<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MusicCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('music_categories')->insert([
            ['id' => 1, 'title' => 'ロフィ'],
            ['id' => 2, 'title' => 'ポップス'],
            ['id' => 3, 'title' => 'EDM'],
            ['id' => 4, 'title' => 'ほかの'],
        ]);
    }
}
