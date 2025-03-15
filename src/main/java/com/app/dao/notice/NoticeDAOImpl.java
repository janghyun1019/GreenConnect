package com.app.dao.notice;

import com.app.dto.notice.NoticeDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class NoticeDAOImpl implements NoticeDAO {

    private final SqlSession sqlSession;

    public NoticeDAOImpl(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    @Override
    public List<NoticeDTO> getNotices(Map<String, Object> params) {
        return sqlSession.selectList("com.app.dao.notice.NoticeDAO.getNotices", params);
    }

    @Override
    public NoticeDTO getNoticeById(int noticeId) {
        return sqlSession.selectOne("com.app.dao.notice.NoticeDAO.getNoticeById", noticeId);
    }

    @Override
    public void insertNotice(NoticeDTO notice) {
        sqlSession.insert("com.app.dao.notice.NoticeDAO.insertNotice", notice);
    }

    @Override
    public void updateNotice(NoticeDTO notice) {
        sqlSession.update("com.app.dao.notice.NoticeDAO.updateNotice", notice);
    }

    @Override
    public void deleteNotice(int noticeId) {
        sqlSession.delete("com.app.dao.notice.NoticeDAO.deleteNotice", noticeId);
    }
}
