<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('r24h_questionnaire_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('r24h_questionnaire_item_id')->constrained()->onDelete('cascade');
            $table->text('answer');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('r24h_questionnaire_answers');
    }
};
