import { useEffect, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";

function CommonPay() {

    const [buyUser, setBuyUser] = useState(null);
    const [paymentWidgetState, setPaymentWidgetState] = useState(null);
    const [paymentMethodsWidgetState, setPaymentMethodsWidgetState] = useState(null);
    const [price, setPrice] = useState(300);

    const [clientKey,setClientKey] = useState(null);
    const [customerKey,setCustomerKey]= useState(null);

    // useEffect(() => {
    //     // 세션에서 사용자 정보 가져오기 (localStorage나 sessionStorage에서)
    //     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // 세션에 저장된 사용자 정보 가져오기
    //     if (loggedInUser) {
    //         setBuyUser(loggedInUser);
    //     }
    // }, []);

    useEffect(() => {
        const initializePaymentWidget = async () => {
            const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

            const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
                "#payment-widget",
                price
            );

            // useState로 상태 업데이트
            setPaymentWidgetState(paymentWidget);
            setPaymentMethodsWidgetState(paymentMethodsWidget);
            console.log("결제 위젯 초기화 완료!");
        };

        initializePaymentWidget();
    }, []);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetState;

        if (paymentMethodsWidget == null) {
            return;
        }

    }, [price, paymentMethodsWidgetState]);

    const handlePayment = async () => {
        console.log("handlePayment 실행됨");
        const paymentWidget = paymentWidgetState;
        console.log("paymentWidget 로드됨:", paymentWidget);

        if (!paymentWidget) {
            console.log("paymentWidget이 null입니다.");
            return;
        }
        try {
            await paymentWidget.requestPayment({
                orderId: "zz",
                orderName: "토스 티셔츠 외 2건",
                customerName: "김토스",
                customerEmail: "customer123@gmail.com"
            });
            console.log("결제 요청 성공!");
        } catch (err) {
            console.log("결제 요청 실패:", err);
        }
    };

    return (
        <div>
            <h1>주문서</h1>
            <div id="payment-widget" />
            <button onClick={handlePayment}>결제하기</button>
        </div>
    );
}

export default CommonPay;