package com.ooad.videoconf.VirtualVoyage.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Event {
    @Id
    @GeneratedValue
    private Long EventID;
    private String eventName;
        private String Person;
                private String Date;
            public String getEventName(){
                return eventName;
            }
            public String getPerson(){
                return Person;
            }
            public Long getEventID(){
                return EventID;
            }
            public String getDate(){
                return Date;
            }
            public void setEventName(String evventName){
                this.eventName = evventName;
            }
                        public void setPerson(String evventName){
                this.Person = evventName;
            }
                        public void setEventID(Long evventName){
                this.EventID = evventName;
            }
                        public void setDate(String evventName){
                this.Date = evventName;
            }

}
