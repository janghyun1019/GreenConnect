import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './components/AdminSidebar';

function Quality() {
    const [sellerEvaluations, setSellerEvaluations] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        axios.get('/admin/quality/seller-evaluations')
            .then(response => {
                console.log('Seller Evaluations:', response.data);
                const evaluations = Array.isArray(response.data) ? response.data : [];
                setSellerEvaluations(evaluations);
            })
            .catch(error => console.error('Error fetching seller evaluations:', error));

        axios.get('/admin/quality/reviews')
            .then(response => setReviews(response.data || []))
            .catch(error => console.error('Error fetching reviews:', error));

        axios.get('/admin/quality/certificates')
            .then(response => setCertificates(response.data || []))
            .catch(error => console.error('Error fetching certificates:', error));
    }, []);

    return (
        <div className="qualityContainer">
            <AdminSidebar />
            <div className="qualityContent">
                <div className="section">
                    <h2>판매자 평가 시스템 관리</h2>
                    <div className="sellerEvaluations">
                        {sellerEvaluations.length > 0 ? (
                            sellerEvaluations.map(evaluation => (
                                <div key={evaluation.evalId} className="evalItem">
                                    판매자: {evaluation.sellerId} - 점수: {evaluation.score} - 코멘트: {evaluation.sellerComment}
                                </div>
                            ))
                        ) : (
                            <div>판매자 평가 데이터가 없습니다.</div>
                        )}
                    </div>
                </div>
                <div className="section">
                    <h2>리뷰 및 평점 관리</h2>
                    <div className="reviews">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <div key={review.reviewId} className="reviewItem">
                                    게시글: {review.postId} - 평점: {review.rating} - 내용: {review.reviewContent}
                                </div>
                            ))
                        ) : (
                            <div>리뷰 데이터가 없습니다.</div>
                        )}
                    </div>
                </div>
                <div className="section">
                    <h2>품질 인증서 및 농산물 이력 관리</h2>
                    <div className="certificates">
                        {certificates.length > 0 ? (
                            certificates.map(cert => (
                                <div key={cert.certId} className="certItem">
                                    인증서 ID: {cert.certId} - 제품: {cert.productType} - 발급일: {cert.issueDate}
                                </div>
                            ))
                        ) : (
                            <div>인증서 데이터가 없습니다.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quality;