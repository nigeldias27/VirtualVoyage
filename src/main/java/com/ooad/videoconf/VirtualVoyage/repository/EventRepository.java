package com.ooad.videoconf.VirtualVoyage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ooad.videoconf.VirtualVoyage.model.Event;

public interface EventRepository extends JpaRepository<Event,Long>{
    
}
