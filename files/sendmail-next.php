<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	//От кого письмо
	$mail->setFrom('vipannapavlova@gmail.com', 'сайт');
	//Кому отправить
	$mail->addAddress('vipannapavlova@gmail.com');
	//Тема письма
	$mail->Subject = 'Новая заявка';

	//Тело письма
	$body = '<h1>Контактная форма (имя, телефон)</h1>';

	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if (trim(!empty($_POST['tel']))) {
		$body .= '<p><strong>Телефон:</strong> ' . $_POST['tel'].'</p>';
	}


	
//Прикрепить файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//путь загрузки файла
		$filePath = __DIR__ . "/files/" . $_FILES['image']['name']; 
		//грузим файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото в приложении</strong>';
			$mail->addAttachment($fileAttach);
		}
	}
	

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Error';
	} else {
		$message = 'Data sent!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);