import { Navigate, useNavigate } from 'react-router-dom';
import '../css/PostDetailBottom.css'


function PostDetailBottom({ post, postImages }) {

    const navigate = useNavigate();

    return (

        <div className="PostDetailBottomMainContainer">

            <div className='navBarContainer'>
                <div className='navPostDetailBottomContent' onClick={()=>navigate("/postDetail/" + post.postId)}>판매글 내용</div>
                <div className='navPostDetailBottomReview' onClick={()=>navigate("/postDetailReview/" + post.postId)}>판매글 별점 및 후기</div>
            </div>
            
            <div className='PostDetailBottomContent'>
                <pre> {post.postContent} </pre>
                <br/>
                <div className='PostDetailBottomContentImages'>
                    {postImages.map((image, index) => (
                        <div>
                            <img src={ image } alt={ "판매 예시 이미지" + (index+1) } style={{maxWidth:'100%'}}/>
                        </div>
                    ))}
                </div>
                <br/>
                <div>끝</div>
            </div>

        </div>

    )

}

export default PostDetailBottom;