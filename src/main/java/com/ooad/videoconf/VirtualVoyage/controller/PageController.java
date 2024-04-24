package com.ooad.videoconf.VirtualVoyage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;



@Controller
public class PageController {
    @GetMapping("/")
    public String login() {
        return "login";
    }
    @GetMapping("/calendar")
    public String calendar() {
        return "calendar";
    }
    @GetMapping("/signUp")
    public String signUp() {
        return "signUp";
    }
    @GetMapping("/video")
    public String video() {
        return "index.html";
    }
}
