package com.chat.service;


import com.chat.dto.DmMessages;
import com.chat.dto.DmSubMessages;
import com.chat.error.ChatException;
import com.chat.modal.DmRoom;
import com.chat.repo.DmRoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DmRoomServiceImple implements  DmRoomService{

    @Autowired
    private DmRoomRepo roomRepo;


    @Override
    public String createRoom(String roomId) {
        DmRoom room =  roomRepo.findByRoomId(roomId);
        if(room != null){
            return "success";
        }
        DmRoom dmRoom = new DmRoom();
        dmRoom.setId(UUID.randomUUID().toString());
        dmRoom.setRoomId(roomId);
        roomRepo.save(dmRoom);
        return "success";
    }

    @Override
    public String joinRoom(String roomId) {
        DmRoom room =  roomRepo.findByRoomId(roomId);
        if(room == null){
            throw new ChatException("room not exist");
        }
        return "success";
    }

    @Override
    public List<DmSubMessages> getMessages(String roomId, String studentId) {
        DmRoom room =  roomRepo.findByRoomId(roomId);

        if(room == null){
            throw new ChatException("room not exist");
        }

        DmMessages collect = room.getDmMessages()
                .stream().filter(f -> f.getStudentId().equals(studentId))
                .findFirst()
                .orElseThrow(()->new ChatException("No such user found"));

        return collect.getSubMessages();
     }



    @Override
    public List<DmRoom> getTeacherMessages(String teacherId) {
        return roomRepo.findByTeacherId(teacherId);
    }


}
