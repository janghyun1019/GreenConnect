package com.app.dao.notice;

import com.app.dto.notice.NoticeDTO;
import java.util.List;
import java.util.Map;

public interface NoticeDAO {
    List<NoticeDTO> getNotices(Map<String, Object> params); // 페이징 처리
    NoticeDTO getNoticeById(int noticeId);
    void insertNotice(NoticeDTO notice);
    void updateNotice(NoticeDTO notice);
    void deleteNotice(int noticeId);
}