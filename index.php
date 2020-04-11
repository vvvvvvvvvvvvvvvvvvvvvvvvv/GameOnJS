<?php
$dbc = mysqli_connect('localhost', 'root', '', 'data');
if(!isset($_COOKIE['user_id'])) {
	if(isset($_POST['submit'])) {
		$user_username = mysqli_real_escape_string($dbc, trim($_POST['username']));
		$user_password = mysqli_real_escape_string($dbc, trim($_POST['password']));
		if(!empty($user_username) && !empty($user_password)) {
			$query = "SELECT `user_id` , `username` FROM `signup` WHERE username = '$user_username' AND password = SHA('$user_password')";
			$data = mysqli_query($dbc,$query);
			if(mysqli_num_rows($data) == 1) {
				$row = mysqli_fetch_assoc($data);
				setcookie('user_id', $row['user_id'], time() + (60*60*24*30));
				setcookie('username', $row['username'], time() + (60*60*24*30));
				$home_url = 'http://' . $_SERVER['HTTP_HOST'];
				header('Location: '. $home_url);
			}
			else {
				echo 'Извините, вы должны ввести правильные имя пользователя и пароль';
			}
		}
		else {
			echo 'Извините вы должны заполнить поля правильно';
		}
	}
}

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link href="style/style.css" rel="stylesheet">
</head>
<body>
<header>
<ul>
	<li><a href="/">Главная</a></li>
	<li><a href="/">Новости</a></li>
	<li><a href="/">Музыка</a></li>
	<li><a href="/">Обратная связь</a></li>
</ul>
</header>
<content>
	<div class="articles">
		<img src="images/2.jpg">
		<h2>Название статьи 1</h2>
		<p>Написание символов на сайтах и зла средневековый книгопечатник вырвал отдельные. Самым известным рыбным текстом является знаменитый lorem некоторые вопросы. Нечитабельность текста исключительно демонстрационная, то и т.д текстом является знаменитый lorem этот.</p>
		<a href="/">Читать полностью</a>
	</div>
	<div class="articles">
		<img src="images/2.jpg">
		<h2>Название статьи 2</h2>
		<p>Написание символов на сайтах и зла средневековый книгопечатник вырвал отдельные. Самым известным рыбным текстом является знаменитый lorem некоторые вопросы. Нечитабельность текста исключительно демонстрационная, то и т.д текстом является знаменитый lorem этот.</p>
		<a href="/">Читать полностью</a>
	</div>
	<div class="articles">
		<img src="images/2.jpg">
		<h2>Название статьи 3</h2>
		<p>Написание символов на сайтах и зла средневековый книгопечатник вырвал отдельные. Самым известным рыбным текстом является знаменитый lorem некоторые вопросы. Нечитабельность текста исключительно демонстрационная, то и т.д текстом является знаменитый lorem этот.</p>
		<a href="/">Читать полностью</a>
	</div>
	<div class="articles">
		<img src="images/2.jpg">
		<h2>Название статьи 4</h2>
		<p>Написание символов на сайтах и зла средневековый книгопечатник вырвал отдельные. Самым известным рыбным текстом является знаменитый lorem некоторые вопросы. Нечитабельность текста исключительно демонстрационная, то и т.д текстом является знаменитый lorem этот.</p>
		<a href="/">Читать полностью</a>
	</div>

</content>
<section>
<?php
	if(empty($_COOKIE['username'])) {
?>
	<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
		<label for="username">Логин:</label>
	<input type="text" name="username">
	<label for="password">Пароль:</label>
	<input type="password" name="password">
	<button type="submit" name="submit">Вход</button>
	<a href="signup.php">Регистрация</a>
	</form>
<?php
}
else {
	?>
	<p><a href="/">Мой профиль</a></p>
    <p><a href="MainFyle.html">Играть</a></p>
  	<p><a href="/">Очки: 0</a></p>
  	<p><a href="exit.php">Выйти(<?php echo $_COOKIE['username']; ?>)</a></p>
  <?echo ''; ?>
<?php	
}
?>
</section>


<footer class="clear">
	<p>Все права защищены</p>
</footer>

</body>

</html>