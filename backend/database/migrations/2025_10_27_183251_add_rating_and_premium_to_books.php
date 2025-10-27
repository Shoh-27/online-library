<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->boolean('is_premium')->default(false)->after('published_year');
            $table->decimal('rating', 3, 2)->default(0)->after('is_premium');
            $table->integer('rating_count')->default(0)->after('rating');
        });
    }

    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->dropColumn(['is_premium', 'rating', 'rating_count']);
        });
    }
};
