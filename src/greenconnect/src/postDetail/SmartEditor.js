import '../css/WritePostDetail.css';
import { useEffect, useRef  } from "react";
import { useNavigate } from "react-router-dom";

function SmartEditor({ onChange }) {

    const editorRef = useRef(null); // textarea 요소 접근을 위한 ref
    const formRef = useRef(null); // form 요소 접근을 위한 ref
    const navigate = useNavigate();

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

    // 스마트에디터 내용 반영 후 폼 제출하는 함수 추가
    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        if (window.oEditors && window.oEditors.length > 0) {
            window.oEditors.getById["smartEditor"].exec("UPDATE_CONTENTS_FIELD", []);
            
            const content = window.oEditors.getById("smartEditor").getIR(); // 스마트에디터 내용 가져오기
            if (onChange) {
                onChange(content);  // 스마트에디터의 내용을 onChange 콜백으로 전달
            }
        }
        console.log("전송할 데이터:", editorRef.current.value); // textarea 값 확인 (테스트용)
        formRef.current.submit(); // 폼 제출
    };


    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div style={{ width: '100%' }}>
                <textarea ref={editorRef} id="smartEditor" name="content" rows="10" cols="100"></textarea> {/* ref 추가 */}
            </div>
        </form>
    );
};


export default SmartEditor;