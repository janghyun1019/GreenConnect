import { useState, useEffect } from "react";
import './MarketInfoPage.css';
import { Card, CardContent } from "../../components/card";
import { Input } from "../../components/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function MarketInfoPage() {
    const [data, setData] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [searchItem, setSearchItem] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recentData, setRecentData] = useState([]);

    useEffect(() => {
        fetch("/getMarketData") // 백엔드 API 호출
            .then(response => {
                if (!response.ok) {
                    throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
                if (data.length > 0) {
                    const latestDate = data.reduce((latest, item) => item.getDate > latest ? item.getDate : latest, "");
                    const latestData = data.filter(item => item.getDate === latestDate).slice(0, 4);
                    setRecentData(latestData);
                }
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const filteredData = data.filter(item => 
        (searchDate === "" || item.getDate.includes(searchDate)) &&
        (searchItem === "" || item.pumNm.includes(searchItem))
    );

    if (loading) {
        return <div className="p-6 text-center text-lg">데이터 로딩 중...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">오류 발생: {error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">가락시장 농산물 도매가격</h1>
            
            {/* 최신 날짜의 4개 데이터만 그래프로 표시 */}
            <div className="grid grid-cols-2 gap-4 my-4">
                <Card>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={recentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="getDate" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="avP" stroke="#8884d8" />
                                <Line type="monotone" dataKey="miP" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="maP" stroke="#ffdc39" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={recentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="getDate" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="avP" fill="#8884d8" />
                                <Bar dataKey="miP" fill="#82ca9d" />
                                <Bar dataKey="maP" fill="#ffdc39" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* 검색 필터 */}
            <div className="flex space-x-4 my-4">
                <Input 
                    placeholder="날짜 입력 (예: 20240310)" 
                    value={searchDate} 
                    onChange={e => setSearchDate(e.target.value)}
                />
                <Input 
                    placeholder="품목 입력 (예: 양파)" 
                    value={searchItem} 
                    onChange={e => setSearchItem(e.target.value)}
                />
            </div>

            {/* 검색 결과 테이블 */}
            {filteredData.length > 0 && (
                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead>거래날짜</TableHead>
                            <TableHead>품목</TableHead>
                            <TableHead>등급</TableHead>
                            <TableHead>평균가</TableHead>
                            <TableHead>최저가</TableHead>
                            <TableHead>최고가</TableHead>
                            <TableHead>시장</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.getDate}</TableCell>
                                <TableCell>{item.pumNm}</TableCell>
                                <TableCell>{item.gName}</TableCell>
                                <TableCell>{item.avP.toLocaleString()} 원</TableCell>
                                <TableCell>{item.miP.toLocaleString()} 원</TableCell>
                                <TableCell>{item.maP.toLocaleString()} 원</TableCell>
                                <TableCell>{item.sPosGubun}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
