<?php

use Illuminate\Database\Seeder;
use App\Department;

class CustomersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('customers')->delete();

        //insert some base categories
        DB::table('customers')->insert(array(
            array(
                'name' => 'David Lobo',
                'email' => 'oldlobster@gmail.com',
                'mobileno' => '07914362667'
            ),
            array(
                'name' => 'Alex Caprani',
                'email' => 'alex@tfw.com',
                'mobileno' => '0791443432'
            ),
        ));
    }
}
