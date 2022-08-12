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

