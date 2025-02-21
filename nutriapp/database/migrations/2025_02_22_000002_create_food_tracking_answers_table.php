<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('food_tracking_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('food_tracking_question_id')->constrained()->onDelete('cascade');
            $table->text('answer');
            $table->date('tracking_date');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('food_tracking_answers');
    }
};
