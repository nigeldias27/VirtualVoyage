package com.ooad.videoconf.VirtualVoyage.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ooad.videoconf.VirtualVoyage.model.Event;
import com.ooad.videoconf.VirtualVoyage.model.User;
import com.ooad.videoconf.VirtualVoyage.repository.EventRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class EventController {
    @Autowired
    private EventRepository eventRepository;
       @PostMapping("/api/newEvent")
    public Event postMethodName(@RequestBody Event newEvent) {
        eventRepository.save(newEvent);
        return newEvent;
    }
     @PostMapping("/api/getEvent")
     public List<Event> postMethodName(@RequestBody String username) {
        List<Event> eventsRec= new ArrayList<Event>();
         List<Event> events = eventRepository.findAll();
         for(int i=0;i<events.size();i++){
            String[] usernames = events.get(i).getPerson().split(",");
            for(int j=0;j<usernames.length;j++){
                if (usernames[j].equals(username)){
                    eventsRec.add(events.get(i));
                }

            }
         }
         return eventsRec;
     }
     
     
}
