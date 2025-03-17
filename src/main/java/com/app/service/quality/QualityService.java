package com.app.service.quality;

import java.util.List;

import com.app.dto.quality.Quality;

public interface QualityService {
	List<Quality> getSellerEvaluations();
    List<Quality> getReviews();
    List<Quality> getCertificates();
}
