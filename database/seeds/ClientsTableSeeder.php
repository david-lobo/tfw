<?php

use Illuminate\Database\Seeder;
use App\Department;
use Faker\Factory as Faker;

class ClientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('clients')->delete();

         //insert some base categories
         DB::table('clients')->insert(array(
             array(
                'title'=> 'Acme',
                'alias' => str_slug('Acme'),
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()),
             array(
                'title'=> 'Tetley',
                'alias' => str_slug('Tetley'),
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'title'=> 'Loreal',
                'alias' => str_slug('Loreal'),
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            )
        ));

        $faker = Faker::create();
        foreach (range(1,20) as $index) {
            $title = $faker->company();
            DB::table('clients')->insert([
                'title' => $title,
                'alias' => str_slug($title),
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ]);
    }

    }
}
