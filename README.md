# 環境構築

laravel プロジェクト作成

```
$ composer create-project laravel/laravel TodoApp
$ cd TodoApp
$ php artisan serve
```

laravel 初期設定
```
config/app.php
    'timezone' => 'Asia/Tokyo',
    'faker_locale' => 'ja_JP',
```

データベース設定（今回はSQlite）
```
config/database.php で設定されている

.env
    DB_CONNECTION=sqlite

$ touch database/database.sqlite

.gitignore
    database/database.sqlite
```

ヘルパーをインストール
```
$ composer require --dev barryvdh/laravel-ide-helper   
```

# データベース作成
マイグレーションを行い、Taskというテーブルを作成
```
$ php artisan make:model -a Task

database/migrations/日付_create_テーブル名
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->boolean('is_done')->default(false);
            $table->timestamps();
        });
    }

$ php artisan migrate
```

ファクトリーという機能を使ってデータベースにダミーデータを登録
```
database/factories/TaskFactory.php
    use Illuminate\Database\Eloquent\Factories\Factory;
    use App\Models\Task;

    public function definition()
    {
        return [
            'title' => $this->faker->realText(rand(15,45)),
            'is_done' => $this->faker->boolean(10),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }

database/seeders/TaskSeeder.php
    use Illuminate\Database\Console\Seeds\WithoutModelEvents;
    use Illuminate\Database\Seeder;
    use App\Models\Task;

    public function run()
    {
        Task::factory()->count(10)->create(); //10件登録
    }

database/seeders/DatabaseSeeder.php
    public function run()
    {
        $this->call(TaskSeeder::class);
    }

$ php artisan db:seed
```