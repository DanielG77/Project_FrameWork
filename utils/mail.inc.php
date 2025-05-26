<?php
    class mail {
        public static function send_email($email) {
            switch ($email['type']) {
            case 'validate':
                $email['inputMatter'] = 'Email verification';
                $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://127.0.0.1/programas/Project_FrameWork/auth/verify/$email[token]'>Verify</a>";
                break;
            case 'recover':
                $email['inputMatter'] = 'Recover password';
                $email['inputMessage'] = "<a href='http://127.0.0.1/programas/Project_FrameWork/auth/recover/$email[token]'>Recover</a>";
                break;
                }
                return self::send_resend_api($email); // Método renombrado
        }

       public static function send_resend_api($values) {
            $resend_config = parse_ini_file(MODEL_PATH . "mail.ini", true)['resend'];
            $api_key = trim($resend_config['api_key'], '"');

            // Mover la inclusión del autoloader al inicio del script si es posible
            require_once __DIR__ . '/vendor/autoload.php';

            $resend = Resend::client($api_key);

            try {
                $result = $resend->emails->send([
                    'from' => 'Daniel <onboarding@resend.dev>',
                    'to' => [$resend_config['to']], // Asumiendo que $values contiene el correo destino
                    'subject' => $values['inputMatter'],
                    'html' => $values['inputMessage'],
                    'tags' => [['name' => 'category', 'value' => 'confirm_email']]
                ]);
                return ['success' => true, 'data' => $result];
            } catch (\Exception $e) {
                return ['success' => false, 'error' => $e->getMessage()];
            }
        }
    }