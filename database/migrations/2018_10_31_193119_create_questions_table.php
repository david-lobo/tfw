<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
           $table->increments('id');
           $table->text('content');
           $table->string('alias');
           $table->integer('parent_id')->unsigned()->nullable();
           $table->integer('category_id')->unsigned()->nullable();
           $table->timestamps();
           //$table->unsignedTinyInteger('answer')->default(0);

           $table->unique(['alias']);
           $table->unique(['parent_id']);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
