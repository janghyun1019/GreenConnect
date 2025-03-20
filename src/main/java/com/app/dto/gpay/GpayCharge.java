package com.app.dto.gpay;

import lombok.Data;

@Data
public class GpayCharge {
	
	private String userId; // 유저아이디
	private int chargeMoney; // 충전금액
	private String chargeWay; // 충전경로?
	
	private String paymentType; // 결제수단 (g-pay or 일반결제)
    private boolean receiptApplied; // 소득공제 신청 여부
    private String receiptType; // 개인소득공제용 or 사업자증빙용
    private String receiptPhoneNum; // 개인소득공제용 폰번호
    private String receiptBusinessRegiNum; // 사업자증빙용 사업자번호

    private boolean serviceTermsAgreement; // 서비스 이용약관 동의
    private boolean paymentAgencyTermsAgreement; // 결제대행 서비스 이용약관 동의
    private boolean personalInfoCollectionAgreement; // 개인정보 수집 및 이용 동의
    private boolean personalInfoThirdPartyAgreement; // 개인정보 제3자 제공 동의

}
