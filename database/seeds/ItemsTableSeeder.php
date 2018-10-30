<?php

use Illuminate\Database\Seeder;
use App\Category;
use App\Item;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('category_item')->delete();
        DB::table('items')->delete();

         $items = [
            [
                'title' => 'Anchor Butter',
                'category' => 'butter'
            ],
            [
                'title' => 'Stork',
                'category' => 'butter'
            ],
            [
                'title' => 'Tesco Butter',
                'category' => 'butter'
            ],
            [
                'title' => 'Kit Kat',
                'category' => 'chocolate'
            ],
            [
                'title' => 'Dairy Milk',
                'category' => 'chocolate'
            ],
            [
                'title' => 'Yorkie',
                'category' => 'chocolate'
            ],
            [
                'title' => 'Snickers',
                'category' => 'chocolate'
            ],
            [
                'title' => 'Mars Bar',
                'category' => 'chocolate'
            ]
         ];

         foreach ($items as $it) {
            $item = new Item;
            $item->title = $it['title'];
            $item->alias = str_slug($it['title']);
            $item->save();

            $category = Category::where('alias', '=' , $it['category'])->firstOrFail();
            $item->categories()->attach($category);
         }
    }
}
