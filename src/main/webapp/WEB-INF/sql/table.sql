CREATE TABLE users
(
user_id varchar(24) primary key,
password varchar(64) not null,
username varchar(36) not null,
nickname varchar(36) not null UNIQUE,
email varchar(36) not null UNIQUE,
tel varchar(16) not null UNIQUE,
usertype varchar(12) ,
signup TIMESTAMP DEFAULT SYSTIMESTAMP,
terms TIMESTAMP DEFAULT SYSTIMESTAMP --약관동의시간
);

CREATE TABLE user_profile (
    user_id    NUMBER PRIMARY KEY,
    image_url  VARCHAR2(255)
);

CREATE TABLE post
(
  post_id varchar2(64) primary key,
  user_id varchar2(32),
  user_nick_name varchar2(32),
  board_id varchar2(32),
  post_title varchar2(64) not null,
  post_content varchar2(64) not null,
  url_file_path varchar2(500),
  post_price varchar2(64),
  post_spot varchar2(64),
  post_cost varchar2(64),
  store_id number,
  post_create_at TIMESTAMP DEFAULT SYSTIMESTAMP,
  post_views number
);

CREATE TABLE address (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    receiver VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    INDEX idx_user_id (user_id)
);


CREATE TABLE POSTS (
    POST_ID VARCHAR2(255) PRIMARY KEY,
    USER_ID VARCHAR2(255),
    TITLE VARCHAR2(255),
    CONTENT CLOB,
    CREATED_AT TIMESTAMP
);

-- 시퀀스 생성
CREATE SEQUENCE POSTS_SEQ
START WITH 1
INCREMENT BY 1;

-- 트리거 생성
CREATE OR REPLACE TRIGGER POSTS_BEFORE_INSERT
BEFORE INSERT ON POSTS
FOR EACH ROW
BEGIN
    SELECT POSTS_SEQ.NEXTVAL
    INTO :NEW.POST_ID
    FROM DUAL;
END;

CREATE TABLE address (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    receiver VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    INDEX idx_user_id (user_id)
);

create sequence post_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

create table image
(
    image_id number primary key,
    post_id varchar2(32) not null,
    file_name VARCHAR2(255) NOT NULL,  -- 저장된 파일명
    original_file_name VARCHAR2(255) NOT NULL,  -- 원본 파일명
    file_path VARCHAR2(500) NOT NULL,  -- 파일 경로
    url_file_path VARCHAR2(500) NOT NULL,       -- URL 경로 (웹에서 접근할 경우)
    file_extension VARCHAR2(10), -- 확장자
    uploaded_at TIMESTAMP DEFAULT SYSTIMESTAMP -- 업로드 시간
);

create sequence images_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE TABLE BUY (
    buy_id      NUMBER PRIMARY KEY,
    user_id     VARCHAR2(50) NOT NULL,   -- 사용자 ID
    nick_name   VARCHAR2(50) NOT NULL,   -- 닉네임
    board_id    NUMBER NOT NULL,         -- 게시판 ID
    post_id     VARCHAR2(50) NOT NULL,         -- 게시글 ID
    post_user_id VARCHAR2(50) NOT NULL,   -- 판매글 작성자 ID
    buy_count   VARCHAR2(50) NOT NULL,         -- 구매 수량
    total_price VARCHAR2(50) NOT NULL,         -- 총 가격
    total_gram    VARCHAR2(50) NOT NULL,         -- 총 주문량
    created_at  TIMESTAMP DEFAULT SYSTIMESTAMP,  -- 주문 날짜 (기본값: 현재 시간)
    
    trading_type varchar2(50), -- 거래방식
    request_content varchar2(300), --배송요청사항
    buyer_total_address varchar2(500), -- 배송지 주소
    receiver varchar2(50), -- 수령인
    
    payment_type varchar2(50), -- 결제방식
    receipt_applied varchar2(10), -- 현금영수증 소득공제 신청 여부
    receipt_type varchar2(50), -- 개인소득공제용 or 사업자증빙용
    receipt_phone_num varchar2(50), -- 개인소득공제용 폰번호
    receipt_business_regi_num varchar2(50), -- 사업자증빙용 사업자번호
    service_terms_agreement varchar2(10) default 'N', -- 서비스 이용약관 동의  
    payment_agency_terms_agreement varchar2(10) default 'N', -- 결제대행 서비스 이용약관 동의  
    personal_info_collection_agreement varchar2(10) default 'N', -- 개인정보 수집 및 이용 동의  
    personal_info_third_party_agreement varchar2(10) default 'N', -- 개인정보 제3자 제공 동의  
    
    pay_state VARCHAR2(10) DEFAULT 'N'  -- 결제 상태 Y:결제완료 N:결제미완료
);

create sequence buy_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE Table user_report(
  user_id varchar2(32) not null, -- 신고하는 유저아이디
  reported_user_id varchar2 (32) not null, --신고당하는 유저아이디
  reported_user_nick_name varchar2 (32) not null, -- 신고당하는 유저닉네임
  reported_post_id varchar2 (32), -- 신고당하는 포스트아이디
  report_content varchar2(1000) not null, -- 신고사유
  report_result varchar2(32), -- 신고 결과
  report_create_at TIMESTAMP DEFAULT SYSTIMESTAMP
);

CREATE Table report(
  report_id number primary key, -- 시퀀스
  reported_user_id varchar2(32),
  report_count number, -- 신고당한 횟수
  report_punish varchar2(32) -- 처벌
);

create sequence report_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE TABLE AdminDashboard (
    stat_id NUMBER PRIMARY KEY,
    user_count NUMBER,
    daily_sales NUMBER(10,2),
    weekly_sales NUMBER(10,2),
    monthly_sales NUMBER(10,2),
    new_users NUMBER,
    pending_reports NUMBER,
    transaction_count NUMBER,
    system_status VARCHAR2(50),
    update_time TIMESTAMP DEFAULT SYSTIMESTAMP
);
);

SELECT ---------------------- 구매자가 구매했을때 구매자정보와 해당판매글의 판매자아이디, 글제목, 상품타입, 판매자 주소, 농장이름, 판매상태 불러오는 쿼리
    b.buy_id,
    b.user_id AS buy_user_id,
    b.nick_name AS buy_nick_name,
    b.board_id,
    b.post_id,
    b.buy_count,
    b.total_price,
    b.total_gram,
    b.created_at AS buy_created_at,
    p.user_id AS post_user_id,
    p.post_title,
    p.post_product_type,
    p.post_spot,
    p.store_id,
    p.post_state
FROM 
    buy b
JOIN 
    post p ON b.post_id = p.post_id;

CREATE Table jjim (
  post_id varchar2(32),
  user_id varchar2(32),
  CONSTRAINT jjim_unique UNIQUE (post_id, user_id) -- postid와userid 묶어서 유니크
);
select * from jjim;



=========================================================================================



CREATE TABLE users
(
user_id varchar(24) primary key,
password varchar(64) not null,
username varchar(36) not null,
nickname varchar(36) not null UNIQUE,
profile_image VARCHAR2(200), -- 프로필 이미지 (선택)
email varchar(36) not null UNIQUE,
tel varchar(16) not null UNIQUE,
role VARCHAR2(50) DEFAULT 'buyer', -- 역할 (기본값: buyer)
status VARCHAR2(50) DEFAULT 'active', -- 상태 (기본값: active)
user_type varchar(12) DEFAULT 'CUS',  -- adm, cus, primiumcus
signup TIMESTAMP DEFAULT SYSTIMESTAMP,
terms TIMESTAMP DEFAULT SYSTIMESTAMP --약관동의시간
);

select * from image;
select * from image;
select * from post;

CREATE TABLE user_activity_log (
log_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_id VARCHAR2(50),
action VARCHAR2(100), -- 예: 'login', 'role_update', 'suspend'
action_date DATE DEFAULT SYSDATE,
CONSTRAINT fk_user_activity FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO user_activity_log (user_id, action) VALUES ('user1', 'login');

CREATE TABLE post
(
  post_id varchar2(64) primary key,
  user_id varchar2(32),
  nick_name varchar2(32),
  board_id number,
  post_product_type varchar2(100), -- 품목 타입 (옥수수,감자,포도..)
  post_title varchar2(100) not null,
  post_content varchar2(3000) not null,
  url_file_path varchar2(500), -- 썸네일용
  post_sales_unit varchar2(100), -- 판매수량 (500g, 1kg ..)
  post_price varchar2(64), -- 판매수량당 가격
  post_spot varchar2(500), -- 판매자 주소
  post_cost varchar2(64), -- 배송비
  store_id varchar2(500), -- 판매자 가게  이름
  post_create_at TIMESTAMP DEFAULT SYSTIMESTAMP, -- 판매글 작성 시간
  post_views number DEFAULT '0' NOT NULL, -- 조회수
  post_state varchar2(10) DEFAULT 'Y'  --상태관리: 게시글 삭제하거나 정지되면 N으로 변경
);
select * from post order by post_id;

create sequence post_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

create table image
(
    image_id number primary key,
    post_id varchar2(32) not null,
    file_name VARCHAR2(255) NOT NULL,  -- 저장된 파일명
    original_file_name VARCHAR2(255) NOT NULL,  -- 원본 파일명
    file_path VARCHAR2(500) NOT NULL,  -- 파일 경로
    url_file_path VARCHAR2(500) NOT NULL,       -- URL 경로 (웹에서 접근할 경우)
    file_extension VARCHAR2(10), -- 확장자
    uploaded_at TIMESTAMP DEFAULT SYSTIMESTAMP -- 업로드 시간
);
select * from image;

create sequence images_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE TABLE BUY (
    buy_id      NUMBER PRIMARY KEY,
    user_id     VARCHAR2(50) NOT NULL,   -- 사용자 ID
    nick_name   VARCHAR2(50) NOT NULL,   -- 닉네임
    board_id    NUMBER NOT NULL,         -- 게시판 ID
    post_id     VARCHAR2(50) NOT NULL,         -- 게시글 ID
    post_user_id VARCHAR2(50) NOT NULL,   -- 판매글 작성자 ID
    buy_count   VARCHAR2(50) NOT NULL,         -- 구매 수량
    total_price VARCHAR2(50) NOT NULL,         -- 총 가격
    total_gram    VARCHAR2(50) NOT NULL,         -- 총 주문량
    created_at  TIMESTAMP DEFAULT SYSTIMESTAMP,  -- 주문 날짜 (기본값: 현재 시간)
    
    trading_type varchar2(50), -- 거래방식
    request_content varchar2(300), --배송요청사항
    buyer_total_address varchar2(500), -- 배송지 주소
    receiver varchar2(50), -- 수령인
    
    payment_type varchar2(50), -- 결제방식
    receipt_applied varchar2(10), -- 현금영수증 소득공제 신청 여부
    receipt_type varchar2(50), -- 개인소득공제용 or 사업자증빙용
    receipt_phone_num varchar2(50), -- 개인소득공제용 폰번호
    receipt_business_regi_num varchar2(50), -- 사업자증빙용 사업자번호
    service_terms_agreement varchar2(10) default 'N', -- 서비스 이용약관 동의  
    payment_agency_terms_agreement varchar2(10) default 'N', -- 결제대행 서비스 이용약관 동의  
    personal_info_collection_agreement varchar2(10) default 'N', -- 개인정보 수집 및 이용 동의  
    personal_info_third_party_agreement varchar2(10) default 'N', -- 개인정보 제3자 제공 동의  
    
    pay_state VARCHAR2(10) DEFAULT 'N'  -- 결제 상태 Y:결제완료 N:결제미완료
);
select * from buy order by buy_id;

create sequence buy_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE Table user_report(
  user_id varchar2(32) not null, -- 신고하는 유저아이디
  reported_user_id varchar2 (32) not null, --신고당하는 유저아이디
  reported_user_nick_name varchar2 (32) not null, -- 신고당하는 유저닉네임
  reported_post_id varchar2 (32), -- 신고당하는 포스트아이디
  report_content varchar2(1000) not null, -- 신고사유
  report_result varchar2(32), -- 신고 결과
  report_create_at TIMESTAMP DEFAULT SYSTIMESTAMP
);
select * from user_report;

CREATE Table report(
  report_id number primary key, -- 시퀀스
  reported_user_id varchar2(32),
  report_count number, -- 신고당한 횟수
  report_punish varchar2(32) -- 처벌
);
create sequence report_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

SELECT ---------------------- 구매자가 구매했을때 구매자정보와 해당판매글의 판매자아이디, 글제목, 상품타입, 판매자 주소, 농장이름, 판매상태 불러오는 쿼리
    b.buy_id,
    b.user_id AS buy_user_id,
    b.nick_name AS buy_nick_name,
    b.board_id,
    b.post_id,
    b.buy_count,
    b.total_price,
    b.total_gram,
    b.created_at AS buy_created_at,
    p.user_id AS post_user_id,
    p.post_title,
    p.post_product_type,
    p.post_spot,
    p.store_id,
    p.post_state
FROM 
    buy b
JOIN 
    post p ON b.post_id = p.post_id;

CREATE Table jjim (
  post_id varchar2(32),
  user_id varchar2(32),
  created_at TIMESTAMP DEFAULT SYSTIMESTAMP,
  CONSTRAINT jjim_unique UNIQUE (post_id, user_id) -- postid와userid 묶어서 유니크
);

select * from jjim;

CREATE TABLE Card (
card_id NUMBER PRIMARY KEY,
user_id VARCHAR(255),
card_type VARCHAR(50),
card_provider VARCHAR(50),
last_four VARCHAR(4),
expires VARCHAR(7),
is_default NUMBER(1)
);
select * from card;

CREATE TABLE AdminDashboard(
stat_date DATE DEFAULT SYSDATE PRIMARY KEY, -- 날짜별 통계 (PK)
user_count NUMBER, -- 전체 사용자 수
daily_sales NUMBER(10,2), -- 일일 매출
weekly_sales NUMBER(10,2), -- 주간 매출
monthly_sales NUMBER(10,2), -- 월간 매출
new_users NUMBER, -- 신규 가입자 수
pending_reports NUMBER, -- 미처리 신고 수
transaction_count NUMBER, -- 거래 수
system_status VARCHAR2(50) -- 시스템 상태
);
INSERT INTO AdminDashboard (user_count, daily_sales, weekly_sales, monthly_sales, new_users, pending_reports, transaction_count, system_status)
VALUES (100, 1500.50, 8500.75, 35000.25, 15, 3, 75, 'Operational');

select * from AdminDashboard;



create Table gpay_charge( --충전
    charge_id number primary key,
    user_id varchar2(32),
    charge_date timestamp default systimestamp,
    charge_money number,
    charge_way varchar2(32),
    payment_type varchar2(50), -- 결제방식
    receipt_applied varchar2(10), -- 현금영수증 소득공제 신청 여부
    receipt_type varchar2(50), -- 개인소득공제용 or 사업자증빙용
    receipt_phone_num varchar2(50), -- 개인소득공제용 폰번호
    receipt_business_regi_num varchar2(50), -- 사업자증빙용 사업자번호
    service_terms_agreement varchar2(10) default 'N', -- 서비스 이용약관 동의  
    payment_agency_terms_agreement varchar2(10) default 'N', -- 결제대행 서비스 이용약관 동의  
    personal_info_collection_agreement varchar2(10) default 'N', -- 개인정보 수집 및 이용 동의  
    personal_info_third_party_agreement varchar2(10) default 'N' -- 개인정보 제3자 제공 동의
);

select * from gpay_charge order by charge_id;

create sequence charge_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

create Table gpay_property( --현재 gpay 재산
  property_id number primary key,
  user_id varchar2(32),
  before_property number,
  now_property number,
  property_date timestamp default systimestamp
);

select * from gpay_property;

create sequence property_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;
--create Table gpay_use( --사용
--  use_id number primary key,
--  user_id varchar2(32),
--  use_date timestamp default systimestamp,
--  use_pay number,
--  use_way varchar2(32)
--);
--create sequence use_id_seq
--START WITH 1
--INCREMENT BY 1
--NOCACHE
--NOCYCLE;
--create Table gpay_exchange( -- 환전
--  exchange_id number primary key,
--  user_id varchar2(32),
--  exchange_date timestamp default systimestamp,
--  exchange_gpay number,
--  exchange_way varchar2(32)
--);
--create sequence exchange_id_seq
--START WITH 1
--INCREMENT BY 1
--NOCACHE
--NOCYCLE;

CREATE TABLE reviews (
    review_id NUMBER PRIMARY KEY,  -- 시퀀스
    user_id VARCHAR2(64) NOT NULL, -- 후기쓴 유저 아이디
    user_nick_name VARCHAR2(64) NOT NULL, -- 후기쓴 유저 닉네임
    post_id VARCHAR2(64) NOT NULL,  -- 판매글아아디
    rating NUMBER NOT NULL,  -- 별점
    review_content VARCHAR2(3000), -- 후기내용
    url_file_path varchar2(500), -- 후기이미지
    created_at TIMESTAMP DEFAULT SYSTIMESTAMP -- 작성시간
);
select * from reviews order by review_id;
CREATE SEQUENCE reviews_seq START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;



select * from post where post_id = 39;
select * from buy where user_id = 'qwer';
select * from gpay_charge order by charge_id;
select * from gpay_property order by property_id;
SELECT 
        b.*,
        p.user_id AS post_user_id,
        p.nick_name AS post_nick_name,
        p.post_title,
        p.url_file_path,
        p.post_price,
        p.post_cost
	    FROM buy b
	    JOIN post p ON b.post_id = p.post_id
	    WHERE b.user_id = 'qwer'
	      AND b.post_id = 39
	      AND b.buy_id = (SELECT MAX(buy_id) FROM buy WHERE user_id = 'qwer' AND post_id = 39)

