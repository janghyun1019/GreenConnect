package com.app.dto.report;

import java.util.Date;


import lombok.Data;

@Data
public class UserReport {
	String userId;
    String reportedUserId;
    String reportedUserNickName;
    String reportedPostId;
    String reportContent;
    String reportResult;
    Date reportCreatAt;
}
