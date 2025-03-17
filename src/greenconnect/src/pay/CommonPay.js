import { useEffect, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";

function CommonPay({ buyUser, buyInfo }) {

    const [paymentWidgetState, setPaymentWidgetState] = useState(null);
    const [paymentMethodsWidgetState, setPaymentMethodsWidgetState] = useState(null);

    const [clientKey, setClientKey] = useState(null);
    const [customerKey, setCustomerKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (buyUser) {
            setClientKey("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm");
            setCustomerKey("pcj123pcj123");
        }
    }, [buyUser]);

    useEffect(() => {
        if (!clientKey || !customerKey) return; // clientKey와 customerKey가 모두 설정된 후에 실행

        const initializePaymentWidget = async () => {
            try {
                const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

                const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
                    "#payment-widget",
                    buyInfo.postPrice
                );

                // 위젯 상태 설정
                setPaymentWidgetState(paymentWidget);
                setPaymentMethodsWidgetState(paymentMethodsWidget);

                setIsLoading(false);
                console.log("결제 위젯 초기화 완료!");
            } catch (error) {
                console.error("결제 위젯 초기화 실패:", error);
                setIsLoading(false);
            }
        };

        initializePaymentWidget();
    }, [clientKey, customerKey, buyInfo.postPrice]);

    // useEffect(() => {
    //     const paymentMethodsWidget = paymentMethodsWidgetState;

    //     if (paymentMethodsWidget == null) {
    //         return;
    //     }
    //     paymentMethodsWidget.updateAmount(buyInfo.postPrice);
    // }, [buyInfo.postPrice, paymentMethodsWidgetState]);

    useEffect(() => {
    // paymentMethodsWidgetState가 정상적으로 로드된 경우에만 updateAmount 호출
    if (paymentMethodsWidgetState) {
        paymentMethodsWidgetState.updateAmount(buyInfo.postPrice);
    }
}, [buyInfo.postPrice, paymentMethodsWidgetState]);

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
                orderId: buyInfo.userId,
                orderName: buyInfo.postTitle,
                customerName: buyInfo.nickName,
                customerEmail: "customer123@gmail.com"
            });
            console.log("결제 요청 성공!");
        } catch (err) {
            console.log("결제 요청 실패:", err);
        }
    };

    if (isLoading) {
        return <div>로딩 중...</div>; // 로딩 중일 때는 로딩 메시지 표시
    }

    return (
        <div>
            <div id="payment-widget" />
        </div>
    );
}

export default CommonPay;