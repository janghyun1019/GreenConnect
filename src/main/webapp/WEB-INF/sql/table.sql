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

select * from users;

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
  post_spot varchar2(100),
  post_cost varchar2(64),
  store_id varchar2(100),
  post_create_at TIMESTAMP DEFAULT SYSTIMESTAMP,
  post_views number
);

select * from post;

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
    post_id     VARCHAR2(50) NOT NULL,         -- 게시글 ID (숫자로 저장)
    buy_count   VARCHAR2(50) NOT NULL,         -- 구매 수량 (숫자로 저장)
    total_price VARCHAR2(50) NOT NULL,         -- 총 가격 (숫자로 저장)
    total_kg    VARCHAR2(50) NOT NULL,         -- 총 주문량 (숫자로 저장)
    created_at  TIMESTAMP DEFAULT SYSTIMESTAMP  -- 주문 날짜 (기본값: 현재 시간)
);

select * from buy;

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
  report_content varchar2(32) not null, -- 신고사유
  report_result varchar2(32) -- 신고 결과
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