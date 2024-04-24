package com.ooad.videoconf.VirtualVoyage.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue
    private Long user_id;
    private String name;
    private String password;
    public Long getUser_id(){
        return user_id;
    }
    public void setUser_id(Long user_id){
        this.user_id = user_id;
    }
        public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String passsword){
        this.password = passsword;
    }
}
