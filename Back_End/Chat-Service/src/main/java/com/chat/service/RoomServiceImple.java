package com.chat.service;

import com.chat.dto.SubMessageLikeDTO;
import com.chat.error.ChatException;
import com.chat.dto.Message;
import com.chat.modal.Room;
import com.chat.dto.SubMessage;
import com.chat.repo.RoomRepo;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomServiceImple implements RoomService{

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    MongoClient mongoClient;

    @Autowired
    MongoConverter mongoConverter;

    @Override
    public String createRoom(String roomId) {
        Room room = roomRepo.findByRoomId(roomId);
        if(room != null){
            return "success";
        }
            Room room1 = new Room();
            room1.setId(UUID.randomUUID().toString());
            room1.setRoomId(roomId);
            roomRepo.save(room1);
            return "success";
    }

    @Override
    public String joinRoom(String roomId) {
        Room room = roomRepo.findByRoomId(roomId);
        if(room == null){
            throw new ChatException("no such room available");
        }
        return "success";
    }


    @Override
    public List<Message> getMessages(String roomId, int page, int size) {

        List<Message> rls = new ArrayList<>();
        MongoDatabase database = mongoClient.getDatabase("chatdb");
        MongoCollection<Document> collection = database.getCollection("room");

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(
                new Document("$match", new Document("roomId", roomId)),
                new Document("$unwind", new Document("path", "$messages")),
                new Document("$sort", new Document("messages.time", -1L)),
                new Document("$skip", page * size),
                new Document("$limit", size),
                new Document("$replaceRoot", new Document("newRoot", "$messages"))
        ));

        result.forEach(r -> rls.add(mongoConverter.read(Message.class, r)));
       return rls;
    }


    @Override
    public Message getReplyMessages(String roomId, String mId) {
        Room room = roomRepo.findByRoomId(roomId);
        if(room == null){
            throw new ChatException("No such data founded.....");
        }
        return room.getMessages()
                .stream()
                .filter(f-> Objects.equals(f.getMId(), mId))
                .findFirst()
                .orElseThrow(RuntimeException::new);
            }



    @Override
    public String likeTheMessage(String roomId, String mId, String sMId, String userId) {
        Room room = roomRepo.findByRoomId(roomId);

        SubMessage targetSubMessages = room
                        .getMessages()
                        .stream()
                        .filter(f -> f.getMId().equals(mId))
                        .flatMap(m -> m.getSubMessages().stream()
                                .filter(f -> f.getSMId().equals(sMId)))
                        .findFirst()
                        .orElseThrow(()->new ChatException("please check the ids"));
         //already liked so remove
         if(targetSubMessages.getUserId().contains(userId)){
             targetSubMessages.getUserId().remove(userId);
         }else{
             targetSubMessages.getUserId().add(userId);
         }

        SubMessageLikeDTO likeDTO = new SubMessageLikeDTO(targetSubMessages.getSMId(), targetSubMessages.getSender(), targetSubMessages.getContent(),
                targetSubMessages.getTime(), targetSubMessages.getUserId());

        //now for the final changes
        roomRepo.save(room);

        messagingTemplate.convertAndSend("/topic/likes/"+roomId, likeDTO);   //publish
        return "success";
    }



}

