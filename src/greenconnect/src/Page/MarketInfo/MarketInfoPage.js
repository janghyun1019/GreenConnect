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
    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        fetch("/market/getMarketData") // 백엔드 API 호출
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
                    const latestData = data.filter(item => item.getDate === latestDate);
                    setDisplayData(latestData);
                }
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (searchDate) {
            const filteredData = data.filter(item => item.getDate.includes(searchDate) && 
                (searchItem === "" || item.pumNm.includes(searchItem))
            );
            setDisplayData(filteredData);
        } else {
            const latestDate = data.reduce((latest, item) => item.getDate > latest ? item.getDate : latest, "");
            setDisplayData(data.filter(item => item.getDate === latestDate));
        }
    }, [searchDate, searchItem, data]);

    // 안전한 데이터 변환 함수 (null 또는 undefined 방지)
    const formatNumber = (num) => (num !== null && num !== undefined ? num.toLocaleString() : "-");

    if (loading) {
        return <div className="p-6 text-center text-lg">데이터 로딩 중...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">오류 발생: {error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">가락시장 농산물 도매가격</h1>
            
            {/* 최신 날짜의 데이터만 그래프로 표시 */}
            <div className="grid grid-cols-2 gap-4 my-4">
                <Card>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={displayData.map(item => ({
                                ...item,
                                label: `${item.pumNm} ${item.gName}` // 품명 + 등급을 X축 레이블로 설정
                            }))}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" /> {/* X축에 [품명 등급] 표시 */}
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
            {displayData.length > 0 && (
                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead>거래날짜</TableHead>
                            <TableHead>품목</TableHead>
                            <TableHead>등급</TableHead>
                            <TableHead>평균가</TableHead>
                            <TableHead>최저가</TableHead>
                            <TableHead>최고가</TableHead>
                            <TableHead>전일 평균</TableHead>
                            <TableHead>등락</TableHead>
                            <TableHead>거래단위</TableHead>
                            <TableHead>전일대비(%)</TableHead>
                            <TableHead>전7일 평균</TableHead>
                            <TableHead>전7일 대비(%)</TableHead>
                            <TableHead>시장</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.getDate}</TableCell>
                                <TableCell>{item.pumNm}</TableCell>
                                <TableCell>{item.gName}</TableCell>
                                <TableCell>{formatNumber(item.avP)} 원</TableCell>
                                <TableCell>{formatNumber(item.miP)} 원</TableCell>
                                <TableCell>{formatNumber(item.maP)} 원</TableCell>
                                <TableCell>{formatNumber(item.pavP)} 원</TableCell>
                                <TableCell>{formatNumber(item.fluc)} 원</TableCell>
                                <TableCell>{item.uName || "-"}</TableCell>
                                <TableCell>{formatNumber(item.dMark)} %</TableCell>
                                <TableCell>{formatNumber(item.j7)} 원</TableCell>
                                <TableCell>{formatNumber(item.j7Mark)} %</TableCell>
                                <TableCell>{item.sPosGubun || "-"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
