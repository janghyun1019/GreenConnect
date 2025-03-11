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
terms TIMESTAMP DEFAULT SYSTIMESTAMP
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
