import '../css/WritePostDetail.css';
import SmartEditor from './SmartEditor';

function WritePostDetail() {


    return (
        <div className='writePostDetailMainContainer'>
            <div className="writePostDetailContainer">

                <h1>글을 작성 하세요</h1>
                <br></br>

                <form id="writePostDetailForm" action="" method="post" >
                    
                    <div className='writePostDetailTitleBox'>
                        <div className='titleText'>제목 : </div>
                        <div><input type="text" className="writePostDetailTitle" /></div>
                    </div>

                    <div className='writePostDetailContentBox'>
                        <div className='contentText'>내용 : </div>
                        <div className='writePostDetailContent'>
                        <SmartEditor />
                        </div>
                    </div>
                    
                    <div className='writePostDetailBtnBox'>
                        <button className='saveBtn'>저장</button>
                        <button className='cancelBtn'>취소</button>
                    </div>
                    
                    
                </form>


            </div>
        </div>
    )
}


export default WritePostDetail;