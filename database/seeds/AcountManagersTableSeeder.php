<?php

use Illuminate\Database\Seeder;
use App\Department;
use Faker\Factory as Faker;

class AccountManagersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('account_managers')->delete();
        DB::table('account_managers')->insert(array(
            array(
            'title'=> 'Mike Jones',
            'alias' => str_slug('Mike Jones'),
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()),
            array(
            'title'=> 'Scrooge McDuck',
            'alias' => str_slug('Scrooge McDuck'),
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
            'title'=> 'Mr Burns',
            'alias' => str_slug('Mr Burns'),
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            )
        ));

        $faker = Faker::create();

        foreach (range(1, 20) as $index) {
            $title = $faker->name();
            DB::table('account_managers')->insert([
                'title' => $title,
                'alias' => str_slug($title),
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ]);
        }
    }
}
