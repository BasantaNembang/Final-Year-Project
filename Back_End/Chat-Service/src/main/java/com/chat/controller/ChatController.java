package com.chat.controller;


import com.chat.dto.*;
import com.chat.error.ChatException;
import com.chat.modal.DmRoom;
import com.chat.modal.Room;
import com.chat.repo.DmRoomRepo;
import com.chat.repo.RoomRepo;
import com.chat.service.RoomServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.Instant;
import java.util.*;


@Controller
@CrossOrigin("*")
public class ChatController {

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private RoomServiceImple serviceImple;

    @Autowired
    private DmRoomRepo dmRoomRepo;


    //send for discussion
    @MessageMapping("/message/{roomId}")
    public Message communication(@DestinationVariable("roomId") String roomId,
                                 @Payload MessageRequest request){
        Room roombyID = roomRepo.findByRoomId(roomId);
        if(roombyID == null){
            throw new ChatException("No room is present");
        }
        Message message = new Message();
        message.setMId(UUID.randomUUID().toString());
        message.setSender(request.sender());
        message.setContent(request.content());
        message.setTime(Instant.now());

        roombyID.getMessages().add(message);
        System.out.println("message added....." + message);
        //save the data
        roomRepo.save(roombyID);
        //call the service and send that data
        List<Message> messageList = serviceImple.getMessages(roomId, 0, 3);

        messagingTemplate.convertAndSend("/topic/room/"+roomId, messageList);   //subscribe
        return message;
    }



    //send for subMessage
    @MessageMapping("/sub_message/{roomId}/{mId}")
    public Room communicationSubMessage(@DestinationVariable("roomId") String roomId,
                                           @DestinationVariable("mId") String mId,
                                 @Payload MessageRequest request){
        List<Message> messages = new ArrayList<>();
        List<SubMessage> subMessages = new ArrayList<>();

        Room roombyID = roomRepo.findByRoomId(roomId);
        if(roombyID == null) {
            throw new ChatException("no room available having id  " + roomId);
        }
        //only selected message???
        Message message =  roombyID.getMessages().stream()
                                    .filter(m->m.getMId().equals(mId))
                                            .findAny()
                                                    .orElseThrow(RuntimeException::new);

        SubMessage subMessage = new SubMessage();
        subMessage.setSMId(UUID.randomUUID().toString());
        subMessage.setSender(request.sender());
        subMessage.setContent(request.content());
        subMessage.setTime(Instant.now());

        //setting subMessage in a Message
        message.getSubMessages().add(subMessage);

        //for all
        List<Message> messageList = roombyID.getMessages();
        for(Message m: messageList){
            if(!Objects.equals(m.getMId(), mId)){
                messages.add(m);
            }
        }
        messages.add(message);
        //setting in a final room
        roombyID.setMessages(messages);

        roomRepo.save(roombyID);

       Message messageList1 =   messages.stream()
                 .filter(f -> Objects.equals(f.getMId(), mId))
                         .findFirst()
                                 .orElseThrow(RuntimeException::new);

        messagingTemplate.convertAndSend("/topic/sub_room/"+roomId,  messageList1);   //subscribe
        return roombyID;
    }



    //send for dm-messages
    @MessageMapping("/dm-message/{roomId}")
    public List<DmMessages> dmCommunication(@DestinationVariable("roomId") String roomId,
                                            @Payload MessageDmRequest request){

        DmRoom room = dmRoomRepo.findByRoomId(roomId);

        if(room == null){
            throw new ChatException("No such room available");
        }
        List<DmMessages> messagesList = new ArrayList<>();
        List<DmSubMessages> sub_messages = new ArrayList<>();

        String id = request.courseId() + "_" + request.studentId();
        Optional<DmMessages> dMMessages  =  room.getDmMessages().stream()
                                           .filter(f->f.getMId().equals(id))
                                           .findFirst();

        //the messages
        DmSubMessages subMessages = new DmSubMessages();
        subMessages.setId(UUID.randomUUID().toString().substring(0,7));
        subMessages.setUsername(request.username());
        subMessages.setContent(request.content());
        subMessages.setTime(Instant.now());

        if(dMMessages.isPresent()){  //update
            dMMessages.get()
                    .getSubMessages().add(subMessages);

           dmRoomRepo.save(room);

        }else{   // adding the new one

            room.setTeacherId(request.teacherId());

            DmMessages dm_Messages = new DmMessages();
            dm_Messages.setMId(id);
            dm_Messages.setStudentId(request.studentId());
            dm_Messages.setCourseName(request.courseName());
            dm_Messages.setSubMessages(sub_messages);

            sub_messages.add(subMessages);

            room.getDmMessages().add(dm_Messages);
            dmRoomRepo.save(room);
        }

        List<DmMessages> dmMessages = room.getDmMessages();

        DmMessages messages =   dmMessages.stream()
                                          .filter(f->f.getStudentId().equals(request.studentId()))
                                                  .findFirst()
                                                          .orElseThrow(RuntimeException::new);

        messagingTemplate.convertAndSend("/topic/dm-room/"+roomId, messages.getSubMessages());   //subscribe
        return room.getDmMessages();
    }



}
