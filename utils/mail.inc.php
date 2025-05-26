<?php
    class mail {
        public static function send_email($email) {
            switch ($email['type']) {
    
                case 'validate';
                    $email['fromEmail'] = 'danielgirgar@gmail.com';
                    $email['inputEmail'] = 'danielgirgar@gmail.com';
                    $email['inputMatter'] = 'Email verification';
                    $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://127.0.0.1/programas/Project_FrameWork/module/login/verify/$email[token]'>Click here for verify your email.</a>";
                    break;
                case 'recover';
                    $email['fromEmail'] = 'danielgirgar@gmail.com';
                    $email['inputEmail'] = 'danielgirgar@gmail.com';
                    $email['inputMatter'] = 'Recover password';
                    $email['inputMessage'] = "<a href='http://127.0.0.1/programas/Project_FrameWork/module/login/recover/$email[token]'>Click here for recover your password.</a>";
                    break;
            }
            return self::send_mailgun($email);
        }

        public static function send_mailgun($values){
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $config['api_url']);
            curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS,$message);
            $result = curl_exec($ch);
            curl_close($ch);
            return $result;
        }
    }