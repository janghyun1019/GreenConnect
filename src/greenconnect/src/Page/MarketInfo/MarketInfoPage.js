import { useState, useEffect } from "react";
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

            {/* 가격 변화 차트 */}
            {filteredData.length > 0 ? (
                <Card>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={filteredData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="getDate" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="avP" stroke="#8884d8" />
                                <Line type="monotone" dataKey="miP" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="maP" stroke="#ff7300" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            ) : (
                <div className="text-center text-gray-500">해당 조건에 맞는 데이터가 없습니다.</div>
            )}

            {/* 거래량 차트 */}
            {filteredData.length > 0 && (
                <Card className="mt-6">
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={filteredData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="getDate" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="avP" fill="#8884d8" />
                                <Bar dataKey="miP" fill="#82ca9d" />
                                <Bar dataKey="maP" fill="#ff7300" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}

            {/* 테이블 데이터 */}
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
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.getDate}</TableCell>
                                <TableCell>{item.pumNm}</TableCell>
                                <TableCell>{item.gName}</TableCell>
                                <TableCell>{item.avP.toLocaleString()} 원</TableCell>
                                <TableCell>{item.miP.toLocaleString()} 원</TableCell>
                                <TableCell>{item.maP.toLocaleString()} 원</TableCell>
                                <TableCell>{item.sPosGubun}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500">데이터가 없습니다.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
