package com.app.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    // 메인 페이지 매핑
    @GetMapping("/")
    public String main(HttpServletRequest request) {
        // /WEB-INF/views/main.jsp 로 포워딩
        return "main";
    }

    // 루트(/) 접근 시 /main으로 리다이렉트
    @GetMapping("/")
    public String root() {
        return "redirect:/main";
    }
}
