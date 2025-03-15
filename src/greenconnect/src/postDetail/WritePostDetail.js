// import '../css/WritePostDetail.css';
// import SmartEditor from './SmartEditor';
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function WritePostDetail() {

//     const navigate = useNavigate();
//     const [content, setContent] = useState("");
//     const [title, setTitle] = useState("");

//     // 스마트에디터에서 작성한 내용을 업데이트하는 함수
//     const handleEditorChange = (newContent) => {
//         setContent(newContent);
//     };

//     // 제목 변경 함수
//     const handleTitleChange = (e) => {
//         setTitle(e.target.value);
//     };

//     // 폼 제출 시 스마트에디터 내용도 포함시키기
//     const handleSubmit = (e) => {
//         e.preventDefault(); // 기본 폼 제출 방지

//         // 제목이나 내용이 빈칸이면 저장X
//         if (!title.trim() || !content.trim()) {
//             alert("제목과 내용을 모두 입력해주세요.");
//             return;
//         }

//         // 컨펌 창 띄우기
//         const isConfirmed = window.confirm("저장하시겠습니까?");
//         if (isConfirmed) {
//             console.log("제목:", title);
//             console.log("내용:", content); // ✅ 스마트에디터 내용 출력 (서버로 전송 가능)
//             // 백엔드 API로 데이터 전송 로직 추가해야함

//             navigate("/main"); // 저장 후 /main 페이지로 이동
//         } else {
//             // 취소 시 아무것도 하지 않음
//             return;
//         }
//     };

//     // 취소 버튼 클릭 시 /main으로 이동 (컨펌창 추가)
//     const handleCancel = () => {
//         const isConfirmed = window.confirm("취소하시겠습니까?");
//         if (isConfirmed) {
//             navigate("/main"); // 취소 후 /main 페이지로 이동
//         } else {
//             // 취소 시 아무것도 하지 않음
//             return;
//         }
//     };

//     return (
//         <div className='writePostDetailMainContainer'>
//             <div className="writePostDetailContainer">
//                 <h1>글을 작성 하세요</h1>
//                 <br></br>

//                 <form id="writePostDetailForm" action="" method="post" onSubmit={handleSubmit}>

//                     <div className='writePostDetailTitleBox'>
//                         <div className='titleText'>제목 : </div>
//                         <div><input 
//                             type="text" 
//                             className="writePostDetailTitle" 
//                             value={title} 
//                             onChange={handleTitleChange} /> {/* 제목 입력값을 상태로 관리 */}
//                         </div>
//                     </div>

//                     <div className='writePostDetailContentBox'>
//                         <div className='contentText'>내용 : </div>
//                         <div className='writePostDetailContent'>
//                             <SmartEditor onChange={handleEditorChange} /> {/* 내용 변경 함수 전달 */}
//                         </div>
//                     </div>

//                     <div className='writePostDetailBtnBox'>
//                         <button className='saveBtn' type='submit'>저장</button>
//                         <button className="cancelBtn" type="button" onClick={handleCancel}>
//                             취소
//                         </button>
//                     </div>

//                 </form>

//             </div>
//         </div>

//     )
// }


// export default WritePostDetail;