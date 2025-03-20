import './css/PostDetailBottom.css'


function PostDetailBottom({ post, postImages }) {

    return (

        <div className="PostDetailBottomMainContainer">
            
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