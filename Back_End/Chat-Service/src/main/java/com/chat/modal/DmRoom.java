package com.chat.modal;


import com.chat.dto.DmMessages;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "dmrooms")
@AllArgsConstructor
@NoArgsConstructor
//course related  message of teacher
//same course with teacher for easy to group
public class DmRoom {

    @Id
    private String id;

    //courseId + authorID
    private String roomId;//particular to teacher gets the list of all the message of teacher regarding the course

    private String teacherId;

    private List<DmMessages> dmMessages = new ArrayList<>();


}
