package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.quality.Quality;
import com.app.service.quality.QualityService;

@RestController
@RequestMapping("/admin/quality")
public class QualityController {

	@Autowired
	QualityService qualityService;
	
	@GetMapping("/seller-evaluations")
    public List<Quality> getSellerEvaluations() {
        return qualityService.getSellerEvaluations();
    }

    @GetMapping("/reviews")
    public List<Quality> getReviews() {
        return qualityService.getReviews();
    }

    @GetMapping("/certificates")
    public List<Quality> getCertificates() {
        return qualityService.getCertificates();
    }
}
