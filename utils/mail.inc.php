<?php
    class mail {
        public static function send_email($email) {
            switch ($email['type']) {
                case 'validate';
                    $email['fromEmail'] = 'danieltest1@gmail.com';
                    $email['inputEmail'] = 'danielgirgar@gmail.com';
                    $email['inputMatter'] = 'Email verification';
                    $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://127.0.0.1/programas/Project_FrameWork/module/login/verify/$email[token]'>Click here for verify your email.</a>";
                    break;
                case 'recover';
                    $email['fromEmail'] = 'danieltest1@gmail.com';
                    $email['inputEmail'] = 'danielgirgar@gmail.com';
                    $email['inputMatter'] = 'Recover password';
                    $email['inputMessage'] = "<a href='http://127.0.0.1/programas/Project_FrameWork/module/login/recover/$email[token]'>Click here for recover your password.</a>";
                    break;
            }
            return self::send_mailgun($email);
        }

        public static function send_mailgun($values){
            // Leer credenciales de Resend desde mail.ini
            $resend = parse_ini_file(MODEL_PATH . "mail.ini", true)['resend'];
            $api_key = trim($resend['api_key'], '"');
            $api_url = trim($resend['api_url'], '"');
            $from = trim($resend['from'], '"');
            $to = trim($resend['to'], '"');

            $message = array();
            $message['from'] = $from;
            $message['to'] = $to;
            $message['subject'] = $values['inputMatter'];
            $message['html'] = $values['inputMessage'];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $api_url);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $api_key,
                'Content-Type: application/json'
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($message));
            $result = curl_exec($ch);
            curl_close($ch);
            return $result;
        }
    }