package com.app.utill;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

public class SHA256Encryptor {

    private static final String ENC_SALT = "sha256encsalt"; // 비밀번호 암호화용 솔트 값

    // 비밀번호 암호화 메서드 (예외 내부 처리)
    public static String encrypt(String text) {
        try {
            if (text == null || text.isEmpty()) {
                throw new IllegalArgumentException("암호화할 문자열이 비어있습니다.");
            }

            MessageDigest md = MessageDigest.getInstance("SHA-256");
            text = text + ENC_SALT; // 솔트 추가
            md.update(text.getBytes(StandardCharsets.UTF_8)); // UTF-8 인코딩 적용

            return bytesToHex(md.digest());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 암호화 알고리즘을 찾을 수 없습니다.", e);
        }
    }

    // 바이트 배열을 16진수 문자열로 변환하는 메서드
    private static String bytesToHex(byte[] cs) {
        StringBuilder sb = new StringBuilder();
        for (byte b : cs) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
