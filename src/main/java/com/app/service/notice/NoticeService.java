package com.app.service.notice;

import com.app.dto.notice.NoticeDTO;
import java.util.List;

public interface NoticeService {
    List<NoticeDTO> getNotices(int page, int size);
    NoticeDTO getNoticeById(int noticeId);
    void insertNotice(NoticeDTO notice);
    void updateNotice(NoticeDTO notice);
    void deleteNotice(int noticeId);
}
