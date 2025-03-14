package com.app.service.signup;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private JavaMailSender mailSender;

    // Setter 주입 방식
    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // 비동기 방식으로 이메일 발송
    @Async
    public void sendVerificationEmail(String email, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("이메일 인증 코드");
        message.setText("이메일 인증 코드: " + code + " (3분 이내 입력)");
        mailSender.send(message);
    }
    
    @Async
    public void sendIdEmail(String email, String userId) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("함께하는 자연! Greenconnect!");
        message.setText("회원님의 아이디는 "+ userId +" 입니다." );
        mailSender.send(message);
    }
    
    public void sendPwEmail(String email, String userPw) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("함께하는 자연! Greenconnect!");
        message.setText("회원님의 비밀번호는 "+ userPw +" 입니다." );
        mailSender.send(message);
    }

    public void sendPasswordResetEmail(String toEmail, String resetUrl) {
        try {
            // 이메일 메시지 객체 생성
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            // 이메일 정보 설정
            helper.setTo(toEmail);
            helper.setSubject("함께하는 자연! Greenconnect! 비밀번호 재설정 안내");
            helper.setText("비밀번호를 재설정하려면 아래 링크를 클릭하세요: \n" + resetUrl, false);

            // 이메일 전송
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("이메일 전송 실패: " + e.getMessage());
        }
    }
}

