package com.app.dto.cutoff;

import lombok.Data;

@Data
public class Cutoff { //차단
	
	private String cutOffId;
	private String cutOffUserId; //차단당한 사람
	private String userId; //차단한 사람

}
