import '../css/WritePostDetail.css';
import { useEffect } from "react";

function SmartEditor() {

    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                // if (document.querySelector(`script[src="${src}"]`)) {
                //     resolve(); // 이미 로드된 경우 재로드 방지
                //     return;
                // }
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        // if (window.oEditors && window.oEditors.length > 0) {
        //     return; // 이미 SmartEditor가 있으면 실행 안 함
        // }

        window.oEditors = [];

        // SmartEditor2 스크립트 로드
        loadScript("/smarteditor/js/HuskyEZCreator.js")
            .then(() => {
                if (window.nhn && window.nhn.husky && window.nhn.husky.EZCreator) {
                    window.nhn.husky.EZCreator.createInIFrame({
                        oAppRef: window.oEditors,
                        elPlaceHolder: "smartEditor",
                        sSkinURI: "/smarteditor/SmartEditor2Skin.html",
                        fCreator: "createSEditor2",
                    });

                    document.getElementById("smartEditor").style.display = "none";
                } else {
                    console.error("SmartEditor2 초기화 실패: nhn.husky가 없음");
                }
            })
            .catch((err) => console.error("SmartEditor2 스크립트 로드 실패", err));

        return () => {
            // 언마운트 시 스크립트 제거
            const script = document.querySelector(`script[src="/smarteditor/js/HuskyEZCreator.js"]`);
            if (script) document.body.removeChild(script);
        };
    }, []);

    return (
        <div style={{width:'100%'}}>
            <textarea id="smartEditor" rows="10" cols="100"></textarea>
        </div>
    );
};


export default SmartEditor;