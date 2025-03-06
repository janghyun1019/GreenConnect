CREATE TABLE post
(
  post_id varchar2(64) primary key,
  user_id varchar2(32),
  nick_name varchar2(32),
  board_id number,
  post_title varchar2(100) not null,
  post_content varchar2(3000) not null,
  url_file_path varchar2(500),
  post_price varchar2(64),
  post_spot varchar2(100),
  post_cost varchar2(64),
  store_id varchar2(100),
  post_create_at TIMESTAMP DEFAULT SYSTIMESTAMP,
  post_views number
);

create sequence post_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

create table image
(
    image_id number primary key,
    post_id number not null,
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