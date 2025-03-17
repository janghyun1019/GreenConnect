package com.app.dao.quality;

import java.util.List;

import com.app.dto.quality.Quality;

public interface QualityDAO {
	List<Quality> getSellerEvaluations();
    List<Quality> getReviews();
    List<Quality> getCertificates();
}
