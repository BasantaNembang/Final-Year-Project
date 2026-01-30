package com.chat.controller;

import com.chat.dto.DmSubMessages;
import com.chat.dto.Message;
import com.chat.modal.DmRoom;
import com.chat.service.DmRoomServiceImple;
import com.chat.service.RoomServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomServiceImple serviceImple;

    @Autowired
    private DmRoomServiceImple dmRoomServiceImple;

    //for the discussion API
    @PostMapping("/create/{roomId}")
    @PreAuthorize("hasAnyRole('STUDENT')")
    public ResponseEntity<?> createRoom(@PathVariable("roomId") String roomId){
        return ResponseEntity.status(HttpStatus.OK).body(serviceImple.createRoom(roomId));
    }


    @GetMapping("/join/{roomId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<?> joinRoom(@PathVariable("roomId") String roomId){
        return ResponseEntity.status(HttpStatus.OK).body(serviceImple.joinRoom(roomId));
    }


    @GetMapping("/messages/{roomId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<List<Message>> getMessages(@PathVariable("roomId") String roomId,
                                                      @RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "3") int size
    ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(serviceImple.getMessages(roomId, page, size));
    }


    //to view the reply message
    @GetMapping("/messages")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<Message> getReplyMessages(@RequestParam("roomId") String roomId,
                                                     @RequestParam("mId") String mId
    ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(serviceImple.getReplyMessages(roomId, mId));
    }


    //like in a reply
    @PostMapping("/like")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<String> likeTheMessage(@RequestParam("roomId") String roomId,
                                                  @RequestParam("mId") String mId,
                                                  @RequestParam("sMId") String sMId,
                                                  @RequestParam("userId") String userId
    ){
      return ResponseEntity.status(HttpStatus.OK)
              .body(serviceImple.likeTheMessage(roomId, mId, sMId, userId));
    }


    //for the dm APIS
    @PostMapping("/dm-create/{roomId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<String> createDMRoom(@PathVariable("roomId") String roomId){
       return ResponseEntity.status(HttpStatus.OK).body(dmRoomServiceImple.createRoom(roomId));
    }


    @GetMapping("/dm-join/{roomId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<?> joinDMRoom(@PathVariable("roomId") String roomId){
        return ResponseEntity.status(HttpStatus.OK).body(dmRoomServiceImple.joinRoom(roomId));
    }


    //student
    @GetMapping("/dm-messages/student/{roomId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<List<DmSubMessages>> getMessagesCourseSTD(@PathVariable("roomId") String roomId,
                                                                    @RequestParam("studentId") String studentId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(dmRoomServiceImple.getMessages(roomId, studentId));
    }

    //get the list of message received by teacher
    @GetMapping("/dm-messages/teacher/{teacherId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<List<DmRoom>> getTeacherMessages(@PathVariable("teacherId") String teacherId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(dmRoomServiceImple.getTeacherMessages(teacherId));
    }



}
