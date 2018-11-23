<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;


class CreateCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
           $table->increments('id');
           $table->string('title');
           $table->string('alias');
           //$table->integer('parent_id')->unsigned()->nullable();
           $table->timestamps();

           $table->unique(['alias']);
       });

        /*Schema::table('categories', function (Blueprint $table) {

          $table->foreign('parent_id')->references('id')->on('categories')->onDelete('cascade');;
        });*/
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop("categories");
    }
}
