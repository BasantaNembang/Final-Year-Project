package com.chat.service;


import com.chat.dto.Message;

import java.util.List;

public interface RoomService {

    String createRoom(String roomId);

    String joinRoom(String roomId);

    List<Message> getMessages(String roomId, int page, int size);

    Message getReplyMessages(String roomId, String mId);

    String likeTheMessage(String roomId, String mId, String sMId, String userId);


}
