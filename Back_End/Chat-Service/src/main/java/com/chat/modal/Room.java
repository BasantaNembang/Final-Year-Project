package com.chat.modal;


import com.chat.dto.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "room")
@AllArgsConstructor
@NoArgsConstructor
//meaning one for one course discussion area
public class Room {

    @Id
    private String id;

    private String roomId;
    private List<Message> messages = new ArrayList<>();


}




