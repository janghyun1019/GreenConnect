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
  nick_name varchar2(32),
  board_id number,
  post_product_type varchar2(100),
  post_title varchar2(100) not null,
  post_content varchar2(3000) not null,
  url_file_path varchar2(500),
  post_sales_unit varchar2(100),
  post_price varchar2(64),
  post_spot varchar2(500),
  post_cost varchar2(64),
  store_id varchar2(500),
  post_create_at TIMESTAMP DEFAULT SYSTIMESTAMP,
  post_views number DEFAULT '0' NOT NULL,
  post_state varchar2(10) DEFAULT 'Y'  --상태관리: 게시글 삭제하면 N으로 변경
);

CREATE TABLE POSTS (
    POST_ID VARCHAR2(255) PRIMARY KEY,
    USER_ID VARCHAR2(255),
    TITLE VARCHAR2(255),
    CONTENT CLOB,
    CREATED_AT TIMESTAMP
);

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
    post_id     VARCHAR2(50) NOT NULL,         -- 게시글 ID (숫자로 저장)
    buy_count   VARCHAR2(50) NOT NULL,         -- 구매 수량 (숫자로 저장)
    total_price VARCHAR2(50) NOT NULL,         -- 총 가격 (숫자로 저장)
    total_gram    VARCHAR2(50) NOT NULL,         -- 총 주문량 (숫자로 저장)
    created_at  TIMESTAMP DEFAULT SYSTIMESTAMP  -- 주문 날짜 (기본값: 현재 시간)
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
  report_result varchar2(32) -- 신고 결과
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