package com.chat.repo;

import com.chat.modal.DmRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DmRoomRepo extends MongoRepository<DmRoom, String> {

    DmRoom findByRoomId(String roomId);

    List<DmRoom> findByTeacherId(String teacherId);
}
