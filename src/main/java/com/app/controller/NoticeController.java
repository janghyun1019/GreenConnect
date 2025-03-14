package com.app.controller;

import com.app.dto.notice.NoticeDTO;
import com.app.service.notice.NoticeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @GetMapping
    public List<NoticeDTO> getNotices(@RequestParam(defaultValue = "1") int page, 
                                      @RequestParam(defaultValue = "10") int size) {
        return noticeService.getNotices(page, size);
    }

    @GetMapping("/{id}")
    public NoticeDTO getNoticeById(@PathVariable int id) {
        return noticeService.getNoticeById(id);
    }

    @PostMapping
    public void insertNotice(@RequestBody NoticeDTO notice) {
        noticeService.insertNotice(notice);
    }

    @PutMapping("/{id}")
    public void updateNotice(@PathVariable int id, @RequestBody NoticeDTO notice) {
        notice.setNoticeId(id);
        noticeService.updateNotice(notice);
    }

    @DeleteMapping("/{id}")
    public void deleteNotice(@PathVariable int id) {
        noticeService.deleteNotice(id);
    }
}
