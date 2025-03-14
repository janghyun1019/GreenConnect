import './css/Profile.css';
import { useState } from 'react';
import axios from "axios";

function Profile(){
    const[image,setImage] = useState(null);
    const[preview,setPreview] = useState(null);
    const[nickname, setNickname] = useState("");

    const imageChange =(e)=>{
        const imageFile = e.target.files[0];
        if(!imageFile) return;
        setImage(imageFile);
        const reader = new FileReader();
        reader.onloadend=() =>{
            setPreview(reader.result);
        };
        reader.readAsDataURL(imageFile);
    };
    const profileUpload = async ()=> {
        if(!image){
            alert("이미지를 선택하여주십시오");
            return;
        }
        const formData = new FormData();
        formData.append("profileImage",image);
        // formData.append("userId", userId);
        try{
        const userId = localStorage.getItem('userId');
        const response = await axios.post('http://localhost:8080/profile/upload/{userId}',formData,{
            headers:{"Content-Type":"multipart/form-data"},
        });
        alert("업로드를 성공하였습니다");
    } catch(error){
        console.error("업로드에 실패하였습니다.:",error);
        alert("업로드에 실패하였습니다.");
    }
    };
    const profileDelete = async () => {
        try {
            await axios.delete('http://localhost:8080/profile/delete/${userId}');
            setPreview(null);
            setImage(null);
            alert("삭제 성공!");
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제 실패");
        }
    };
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const updateNickname = async () => {
        try {
            await axios.post('http://localhost:8080/profile/updateNickname/${userId}', { nickname });
            alert("닉네임이 변경되었습니다.");
        } catch (error) {
            console.error("닉네임 변경 실패:", error);
            alert("닉네임 변경에 실패하였습니다.");
        }
    };

    return(
        <div className="profile-container">
        <div className="profile-card">
            <div className="profile-preview-container">
                {preview && <img src={preview} alt="미리보기" className="profile-preview" />}
            </div>
            <div className="file-input-container">
                <input type="file" id="profile-image-input" onChange={imageChange} />
                <label htmlFor="profile-image-input" className="file-input-label">사진 선택</label>
            </div>
            <div className="button-group">
                <button onClick={profileUpload}>프로필 사진 변경</button>
                <button onClick={profileDelete}>삭제</button>
            </div>
        </div>
        <div className="card">
            닉네임<input type="text" value={nickname} onChange={handleNicknameChange} />
            <button onClick={updateNickname}>적용</button>
        </div>
    </div>
    )
    
}
export default Profile;