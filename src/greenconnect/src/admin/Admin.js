import { Link } from 'react-router-dom';
function Admin() {

    return(
        <div class="adminContainer">
        <h1>관리자</h1>
            <div className="adminAside">
                <ul>
                    <li><Link to="/Admin">관리자 홈</Link></li>
                    <li><Link to="/Customer">사용자관리</Link></li>
                    <li><Link to="/Trade">거래관리</Link></li>
                    <li><Link to="/Quality">품질관리</Link></li>
                    <li><Link to="/System">시스템설정</Link></li>
                    <li><Link to="/CuSupport">고객지원</Link></li>
                </ul>
            </div>
        </div>
    )
}
export default Admin;