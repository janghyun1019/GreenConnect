package com.app.dto.report;

<<<<<<< HEAD
import java.util.Date;

=======
>>>>>>> pcj-detail-payment
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
	
	private String userId; // 신고하는 유저아이디
	private String reportedUserId; //신고당하는 유저아이디
	private String reportedUserNickName; // 신고당하는 유저닉네임
	private String reportedPostId; // 신고당하는 포스트아이디
	private String reportContent; // 신고사유
	private String reportResult; // 신고 결과

}
