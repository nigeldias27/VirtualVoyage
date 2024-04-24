package com.ooad.videoconf.VirtualVoyage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.ooad.videoconf.VirtualVoyage.model.User;
import com.ooad.videoconf.VirtualVoyage.repository.UserRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/user")
    public String postMethodName(@RequestBody User newUser) {
        //TODO: process POST request
        
        userRepository.save(newUser);
        return "Succes";
    }
    @PostMapping("/api/login")
    public String getMethodName(@RequestBody User validateUser) {
        List<User> allUsers= userRepository.findAll();
        for(int i=0;i<allUsers.size();i++){
            if (allUsers.get(i).getName().equals(validateUser.getName()) && allUsers.get(i).getPassword().equals(validateUser.getPassword())){
                return "Valid";
            } 
        }
        return "Invalid";
    }
    
    
}
