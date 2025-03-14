package com.app.service.notice;

import com.app.dao.notice.NoticeDAO;
import com.app.dto.notice.NoticeDTO;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NoticeServiceImpl implements NoticeService {

    private final NoticeDAO noticeDAO;

    public NoticeServiceImpl(NoticeDAO noticeDAO) {
        this.noticeDAO = noticeDAO;
    }

    @Override
    public List<NoticeDTO> getNotices(int page, int size) {
        int startRow = (page - 1) * size;
        int endRow = page * size;
        
        Map<String, Object> params = new HashMap<>();
        params.put("startRow", startRow);
        params.put("endRow", endRow);
        
        return noticeDAO.getNotices(params);
    }

    @Override
    public NoticeDTO getNoticeById(int noticeId) {
        return noticeDAO.getNoticeById(noticeId);
    }

    @Override
    public void insertNotice(NoticeDTO notice) {
        noticeDAO.insertNotice(notice);
    }

    @Override
    public void updateNotice(NoticeDTO notice) {
        noticeDAO.updateNotice(notice);
    }

    @Override
    public void deleteNotice(int noticeId) {
        noticeDAO.deleteNotice(noticeId);
    }
}