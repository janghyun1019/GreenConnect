package com.app.utill;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SHA256Encryptor {

	private static final String ENC_SALT = "sha256encsalt"; // 비밀번호 암호화용 솔트 값

	// 비밀번호 암호화 메서드
	public static String encrypt(String text) throws NoSuchAlgorithmException {
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		text = text + ENC_SALT; // salt 는 옵션
		md.update(text.getBytes());

		return bytesToHex(md.digest());
	}

	//바이트 배열을 16진수 문자열로 변환하는 메서드
	private static String bytesToHex(byte[] cs) {
		StringBuilder sb = new StringBuilder();
		for (byte b : cs) {
			sb.append(String.format("%02x", b));
		}
		return sb.toString();
	}
}
