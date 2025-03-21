import { useState, useEffect } from "react";
import "./mainAPIGraph.css";
import {
	ResponsiveContainer,
	ComposedChart,
	Bar,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";
import Img01 from "../mainAPIGraph/images/mainS01.jpg";

export default function MainAPIGraph() {
	const [activeTab, setActiveTab] = useState("가락시장");
	const tabs = ["가락시장", "전국도매시장", "산지공판장"];
	const [graphData, setGraphData] = useState({
		"가락시장": [
			{ date: "03/13", price: 220, volume: 240 },
			{ date: "03/14", price: 210, volume: 60 },
			{ date: "03/15", price: 230, volume: 80 },
			{ date: "03/17", price: 245, volume: 50 },
			{ date: "03/18", price: 250, volume: 70 },
		],
		"전국도매시장": [
			{ date: "03/13", price: 225, volume: 220 },
			{ date: "03/14", price: 215, volume: 70 },
			{ date: "03/15", price: 235, volume: 90 },
			{ date: "03/17", price: 250, volume: 60 },
			{ date: "03/18", price: 260, volume: 80 },
		],
		"산지공판장": [
			{ date: "03/13", price: 215, volume: 200 },
			{ date: "03/14", price: 205, volume: 50 },
			{ date: "03/15", price: 225, volume: 70 },
			{ date: "03/17", price: 240, volume: 40 },
			{ date: "03/18", price: 245, volume: 60 },
		],
	});

	return (
		<div className="main-container">
			<div className="content-wrapper" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
				{/* 메인 영역 */}
				<div className="apimain-content">
					<div className="header-container">
						<div className="tab-container">
							{tabs.map((tab) => (
								<button
									key={tab}
									className={activeTab === tab ? "active-tab" : "tab"}
									onClick={() => setActiveTab(tab)}
								>
									{tab}
								</button>
							))}
						</div>
					</div>

					<div className="chart-wrapper">
						<div className="info-container left-info">
							<h2 className="title">배추</h2>
							<p className="price">15,875 원</p>
							<p className="description">10kg 로망대 / 상품 평균가</p>
						</div>

						<div className="chart-container">
							<ResponsiveContainer width="100%" height={150}>
								<ComposedChart data={graphData[activeTab]}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="date" />
									<YAxis yAxisId="left" orientation="left" />
									<YAxis yAxisId="right" orientation="right" />
									<Tooltip />
									<Legend />
									<Bar yAxisId="left" dataKey="volume" fill="#4CAF50" barSize={20} />
									<Line yAxisId="right" type="monotone" dataKey="price" stroke="#007BFF" strokeWidth={1} />
								</ComposedChart>
							</ResponsiveContainer>
						</div>

						<div className="info-container right-info">
							<p className="change-label">전일대비</p>
							<p className="change-value positive">+30 원</p>
							<p className="change-percentage positive">▲2%</p>
						</div>
					</div>
				</div>
				{/* 로그인 영역 */}
				<div className="apilogin-section">
					<img src={Img01} alt="mainS01" />
					<button className="signup-button">회원가입</button>
					<button className="login-button">로그인</button>
					
				</div>
			</div>
		</div>
	);
}