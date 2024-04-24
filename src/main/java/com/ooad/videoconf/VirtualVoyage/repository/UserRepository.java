package com.ooad.videoconf.VirtualVoyage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ooad.videoconf.VirtualVoyage.model.User;

public interface UserRepository extends JpaRepository<User,Long>{
    
}
