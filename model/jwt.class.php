<?php

class jwt {
    private $alg;
    private $hash;
    private $data;
    
    private function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private function base64url_decode($data) {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }
    
    public function encode($header, $payload, $key) {
        $this->data = $this->base64url_encode($header) . '.' . $this->base64url_encode($payload);
        return $this->data.'.'.$this->JWS($header, $key);
    }
    
    public function decode($token, $key) {
        list($header, $payload, $signature) = explode('.', $token);
        $this->data = $header . '.' . $payload;
        if ($signature == $this->JWS($this->base64url_decode($header), $key)) {
            return $this->base64url_decode($payload);
        }
        exit('Invalid Signature');
    }
    
    private function setAlgorithm($algorithm) {
        switch ($algorithm[0]) {
            case 'n':
                $this->alg = 'plaintext';
                break;
            case 'H':
                $this->alg = 'HMAC';
                break;
            default: exit("RSA and ECDSA not implemented yet!");
        }
        switch ($algorithm[2]) {
            case 'a':
                $this->alg = 'plaintext';
                break;
            case 2:
                $hash = 'sha256';
                break;
            case 3:
                $hash = 'sha384';
                break;
            case 5:
                $hash = 'sha512';
                break;
        }
        if (in_array($hash, hash_algos())) $this->hash = $hash;
    }

    private function JWS($header, $key) {
        $json = json_decode($header);
        $this->setAlgorithm($json->alg);
        if ($this->alg == 'plaintext') {
            return '';
        }
        return $this->base64url_encode(hash_hmac($this->hash, $this->data, $key, true));
    }



    // public function generateToken(array $payload, int $expiration = 3600): string {
    //     $header = [
    //         'alg' => $this->algorithm,
    //         'typ' => 'JWT'
    //     ];
        
    //     $payload['iat'] = time();
    //     $payload['exp'] = time() + $expiration;
        
    //     $encodedHeader = $this->base64UrlEncode(json_encode($header));
    //     $encodedPayload = $this->base64UrlEncode(json_encode($payload));
        
    //     $signature = $this->createSignature($encodedHeader, $encodedPayload);
        
    //     return "$encodedHeader.$encodedPayload.$signature";
    // }

    // public function validateToken(string $token): array {
    //     $segments = explode('.', $token);
        
    //     if (count($segments) !== 3) {
    //         throw new Exception('Formato de token inválido');
    //     }
        
    //     list($encodedHeader, $encodedPayload, $signature) = $segments;
        
    //     $header = json_decode($this->base64UrlDecode($encodedHeader), true);
    //     $this->validateHeader($header);
        
    //     $calculatedSig = $this->createSignature($encodedHeader, $encodedPayload);
    //     if (!hash_equals($signature, $calculatedSig)) {
    //         throw new Exception('Firma inválida');
    //     }
        
    //     $payload = json_decode($this->base64UrlDecode($encodedPayload), true);
    //     $this->validatePayload($payload);
        
    //     return $payload;
    // }

    // private function createSignature(string $header, string $payload): string {
    //     $hashAlgo = 'sha' . substr($this->algorithm, 2);
    //     $signature = hash_hmac(
    //         $hashAlgo,
    //         "$header.$payload",
    //         $this->secretKey,
    //         true
    //     );
        
    //     return $this->base64UrlEncode($signature);
    // }

    // private function validateHeader(array $header): void {
    //     if (!isset($header['alg']) || !in_array($header['alg'], $this->allowedAlgorithms)) {
    //         throw new Exception('Algoritmo no permitido');
    //     }
        
    //     $this->algorithm = $header['alg'];
    // }

    // private function validatePayload(array $payload): void {
    //     if (!isset($payload['exp']) || $payload['exp'] < time()) {
    //         throw new Exception('Token expirado');
    //     }
        
    //     if (!isset($payload['iat']) || $payload['iat'] > time()) {
    //         throw new Exception('Timestamp inválido');
    //     }
    // }

    // private function base64UrlEncode(string $data): string {
    //     return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    // }

    // private function base64UrlDecode(string $data): string {
    //     return base64_decode(strtr($data, '-_', '+/'));
    // }

}

?>