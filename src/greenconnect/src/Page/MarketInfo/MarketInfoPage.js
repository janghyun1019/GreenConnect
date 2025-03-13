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
    const [latestDate, setLatestDate] = useState("");

    useEffect(() => {
        fetch("/market/getMarketData") // 백엔드 API 호출
            .then(response => {
                if (!response.ok) {
                    throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched Data from API:", data); // 데이터 확인용 로그
                setData(data);
                if (data.length > 0) {
                    const latestDate = data.reduce((latest, item) => (item.getDate && item.getDate > latest ? item.getDate : latest), "");
                    setLatestDate(latestDate);
                    setDisplayData(
                        data.filter(item => item.getDate === latestDate).slice(0, 4) // 최신 데이터 4행만 로딩
                    );
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        if (!data.length) return;
        
        const filteredData = data.filter(item => 
            (searchDate === "" || (item.getDate && item.getDate.includes(searchDate))) && 
            (searchItem === "" || (item.pumNm && item.pumNm.includes(searchItem)))
        );
        
        setDisplayData(filteredData.length > 0 ? filteredData : data.filter(item => item.getDate === latestDate).slice(0, 4));
    };

    const formatNumber = (num) => (num !== null && num !== undefined ? num.toLocaleString() : "-");

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">가락시장 농산물 도매가격</h1>
            
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
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSearch}>
                    검색
                </button>
            </div>

            {loading ? (
                <div className="p-6 text-center text-lg">데이터 로딩 중...</div>
            ) : error ? (
                <div className="p-6 text-center text-red-500">오류 발생: {error}</div>
            ) : (
                <>
                    {/* 그래프 추가 */}
                    {displayData.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 my-4">
                            <Card>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={displayData.map(item => {
                                            console.log("Graph Data Item:", item); // 그래프에 들어가는 데이터 확인
                                            return {
                                                label: `${item.pumNm ?? "-"} (${item.gName ?? "등급 없음"})`,
                                                avP: item.avP ?? 0,
                                                miP: item.miP ?? 0,
                                                maP: item.maP ?? 0
                                            };
                                        })}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="label" />
                                            <YAxis />
                                            <Tooltip formatter={(value, name, props) => [`${formatNumber(value)} 원`, props.payload.label]} />
                                            <Legend />
                                            <Bar dataKey="avP" fill="#8884d8" />
                                            <Bar dataKey="miP" fill="#82ca9d" />
                                            <Bar dataKey="maP" fill="#ffdc39" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* 검색 결과 테이블 */}
                    {displayData.length > 0 ? (
                        <Table className="mt-6">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>거래날짜</TableHead>
                                    <TableHead>품목</TableHead>
                                    <TableHead>등급</TableHead>
                                    <TableHead>평균가</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {displayData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.getDate || "-"}</TableCell>
                                        <TableCell>{item.pumNm || "-"}</TableCell>
                                        <TableCell>{item.gName || "등급 없음"}</TableCell>
                                        <TableCell>{formatNumber(item.avP)} 원</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center text-gray-500">검색 결과가 없습니다.</div>
                    )}
                </>
            )}
        </div>
    );
}
