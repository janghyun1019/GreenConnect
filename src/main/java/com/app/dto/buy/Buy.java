package com.app.dto.buy;

import lombok.Data;

@Data
public class Buy {
	//장바구니에 담을때만 들어가는 정보들
	private String userId;
	private String nickName;
	private int boardId;
	private String postId;
	private String buyCount;
	private String totalPrice;
	private String totalGram;
	
	//결제했을때 추가로 들어가는 정보들
	private String tradingType; // 거래방식 (택배, 만나서)
    private String requestContent; // 배송 요청 사항
    private String buyerTotalAddress; // 우편번호 포함 배송받을 주소
    private String receiver; // 수령인

    private String paymentType; // 결제수단 (g-pay or 일반결제)
    private boolean receiptApplied; // 소득공제 신청 여부
    private String receiptType; // 개인소득공제용 or 사업자증빙용
    private String receiptPhoneNum; // 개인소득공제용 폰번호
    private String receiptBusinessRegiNum; // 사업자증빙용 사업자번호

    private boolean serviceTermsAgreement; // 서비스 이용약관 동의
    private boolean paymentAgencyTermsAgreement; // 결제대행 서비스 이용약관 동의
    private boolean personalInfoCollectionAgreement; // 개인정보 수집 및 이용 동의
    private boolean personalInfoThirdPartyAgreement; // 개인정보 제3자 제공 동의
	
	// postId로 조인해서 가져온 post테이블 정보 담는 변수
	private String postUserId;
	private String postNickName;
	private String postTitle;
	private String urlFilePath;
	private String postPrice;
	private String postCost;

}
