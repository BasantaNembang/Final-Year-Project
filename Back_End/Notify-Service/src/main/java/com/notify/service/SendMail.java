package com.notify.service;


import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@Service
public class SendMail {

    private final JavaMailSender mailSender;

    public SendMail(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    @KafkaListener(topics = "sendMsg")
    public void sendMessage(com.enroll.event.SendNotify notify){

        MimeMessagePreparator preparatory = mimeMessage -> {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
            helper.setSubject(notify.getSubject().toString());
            helper.setText(notify.getMsg().toString());
            helper.setFrom("mygoto@gmail.com");
            helper.setTo(notify.getEmail().toString());
        };
        try{
            mailSender.send(preparatory);
            System.out.println("Mail has been send successfully...");
        } catch (Exception e) {
             System.out.println("message has not been send!........");
             throw new RuntimeException(e);
        }


    }




}
