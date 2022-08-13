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


# コントローラーを使って登録したデータを取得するAPIを作成
```
app/Http/Controllers/TaskController.php
    /**
     * タスク一覧
     *
     * @return Task[]\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        return Task::orderByDesc('id')->get();
        //return Task::all();
    }

routes/api.php //今回はAPIなのでこっち
    Route::apiResource('tasks', 'TaskController');

app/Providers/RouteServiceProviders.php //自動的にコントラーズディレクトリに入れたファイルを読み込ませるhttps://biz.addisteria.com/laravel_route_error/
    public const HOME = '/home';
    protected $namespace = 'App\\Http\\Controllers';

    Route::middleware('api')
        ->prefix('api')
        ->namespace($this->namespace)
        ->group(base_path('routes/api.php'));

$ php artisan route:list

$ php artisan serve
    http://localhost:8000/api/tasks
    で表示されればOK
```


# テストコードを書いて、APIを検証
```
.envをコピーして下記を作成
.env.testing
    DB_CONNECTION=sqlite
    DB_DATABASE=test.sqlite

config/database.php
    'url' => env('DATABASE_URL'),
    'database' => database_path(env('DB_DATABASE', 'database.sqlite')), //envにDB_DATABASEがなければdatabase.sqliteを読み込む
    'prefix' => '',

$ touch database/test.sqlite
```

テストコードを記載
```
tests/Feature/TaskTest.php
    use Illuminate\Foundation\Testing\RefreshDatabase;
    use Tests\TestCase;
    use App\Models\Task;
    class TaskTest extends TestCase
    {
        use RefreshDatabase;
        /**
        * @test
        */
        public function 一覧を取得()
        {
            $tasks = Task::factory()->count(10)->create();
            $response = $this->getJson('api/tasks');
            $response
                ->assertOk()
                ->assertJsonCount($tasks->count());
        }
    }
```
テストを実行
```
$ ./vendor/bin/phpunit tests/Feature/TaskTest.php
```

# API作成
```
app/Http/Controllers/TaskController.php
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->all());
        return $task
            ? response()->json($task, 201)
            : response()->json([], 500);
    }
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->title = $request->title;

        return $task->update()
            ? response()->json($task)
            : response()->json([], 500);
    }
    public function destroy(Task $task)
    {
        return $task->delete()
            ? response()->json($task)
            : response()->json([], 500);
    }

app/Models/Task.php
    class Task extends Model
    {
        use HasFactory;
        protected $fillable = [
            'title', 'is_done'
        ];
        protected $casts = [
            'is_done' => 'bool'
        ];
    }

app/Http/Requests/StoreTaskRequest.php
app/Http/Requests/UpdateTaskRequest.php
    public function authorize()
    {
        return true;
    }

tests/Feature/TaskTest.php
    /**
     * @test
     */
    public function 登録ができる()
    {
        $data = [
            'title' => 'テスト投稿'
        ];
        $response = $this->postJson('api/tasks', $data);
        $response
            ->assertStatus(201)
            ->assertJsonFragment($data);
    }
    /**
     * @test
     */
    public function 更新ができる()
    {
        $task = Task::factory()->create();
        $task->title = '書き換え';
        $response = $this->patchJson("api/tasks/{$task->id}", $task->toArray());
        $response
            ->assertOk()
            ->assertJsonFragment($task->toArray());
    }
    /**
     * @test
     */
    public function 削除ができる()
    {
        $task = Task::factory()->count(10)->create();
        $response = $this->deleteJson("api/tasks/1");
        $response->assertOk();
        $response = $this->getJson("api/tasks");
        $response->assertJsonCount($task->count() -1);
    }
```
テストを実行
```
$ ./vendor/bin/phpunit tests/Feature/TaskTest.php
```


# バリデーション
```
$ php artisan make:request TaskRequest

app/Http/Requests/TaskRequest.php
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'title' => 'required'
        ];
    }

app/Http/Controllers/TaskController.php
    use App\Http\Requests\TaskRequest;
    use App\Models\Task;

    各RequestをTaskRequestに書き換え
```
テストを実行
```
$ ./vendor/bin/phpunit tests/Feature/TaskTest.php
```