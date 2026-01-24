package com.chat.service;

import com.chat.dto.DmSubMessages;
import com.chat.modal.DmRoom;

import java.util.List;

public interface DmRoomService {

    String createRoom(String roomId);

    String joinRoom(String roomId);

    List<DmSubMessages> getMessages(String roomId, String studentId);

    List<DmRoom> getTeacherMessages(String teacherId);
}
