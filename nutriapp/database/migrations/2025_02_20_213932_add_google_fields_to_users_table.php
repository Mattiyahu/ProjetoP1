<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('google_id')->nullable()->unique()->after('password'); // Adiciona google_id após a coluna password, permite nulo e garante unicidade
            $table->string('google_token')->nullable()->after('google_id');       // Opcional: para armazenar o token de acesso do Google
            $table->string('google_refresh_token')->nullable()->after('google_token'); // Opcional: para armazenar o refresh token do Google
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['google_id', 'google_token', 'google_refresh_token']);
        });
    }
};