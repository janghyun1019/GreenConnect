import { useState, useEffect } from "react";
import './MarketInfoPage.css';
import { Card, CardContent } from "../../components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

export default function MarketInfoPage() {
    const [data, setData] = useState([]);
    const [searchDate, setSearchDate] = useState(null);
    const [searchItem, setSearchItem] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayData, setDisplayData] = useState([]);
    const [latestDate, setLatestDate] = useState("");
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    useEffect(() => {
        fetch("/market/getMarketData")
            .then(response => {
                if (!response.ok) {
                    throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                if (data.length > 0) {
                    const latestDateStr = data.reduce((latest, item) => (item.getDate && item.getDate > latest ? item.getDate : latest), "");
                    setLatestDate(latestDateStr);

                    // 최신 거래 날짜를 Date 객체로 변환
                    const latestDateObj = latestDateStr ? new Date(`${latestDateStr.substring(0, 4)}-${latestDateStr.substring(4, 6)}-${latestDateStr.substring(6, 8)}`) : null;
                    setSearchDate(latestDateObj);
                    setDisplayData(data.filter(item => item.getDate === latestDateStr).slice(0, 4));
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
        
        const formattedDate = searchDate ? searchDate.toISOString().split("T")[0].replace(/-/g, "") : "";
        
        const filteredData = data.filter(item => 
            (formattedDate === "" || (item.getDate && item.getDate.includes(formattedDate))) && 
            (searchItem === "" || (item.pumNm && item.pumNm.includes(searchItem)))
        );
        
        setDisplayData(filteredData.length > 0 ? filteredData : []);
    };

    const formatNumber = (num) => (num !== null && num !== undefined ? num.toLocaleString() : "-");

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">가락시장 농산물 도매가격</h1>
            
            {/* 검색 영역 */}
            <div className="flex space-x-4 my-4 items-center">
                {/* 날짜 입력 필드 (달력 아이콘 포함) */}
                <div className="relative flex items-center border rounded w-52 p-2">
                    <DatePicker
                        selected={searchDate}
                        onChange={(date) => setSearchDate(date)}
                        dateFormat="yyyy년 MM월 dd일"
                        placeholderText="날짜 선택"
                        className="w-full text-center focus:outline-none"
                        open={isDatePickerOpen}
                        onClickOutside={() => setIsDatePickerOpen(false)}
                    />
                    <FaCalendarAlt className="absolute right-3 text-gray-500 cursor-pointer" onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} />
                </div>

                {/* 품목 입력 */}
                <input 
                    type="text"
                    placeholder="품목 입력 (예: 양파)" 
                    value={searchItem} 
                    onChange={e => setSearchItem(e.target.value)}
                    className="border p-2 rounded w-48"
                />

                {/* 검색 버튼 */}
                <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded min-w-[80px]"
                    onClick={handleSearch}
                >
                    검색
                </button>
            </div>

            {/* 로딩 중 */}
            {loading ? (
                <div className="p-6 text-center text-lg">데이터 로딩 중...</div>
            ) : error ? (
                <div className="p-6 text-center text-red-500">오류 발생: {error}</div>
            ) : (
                <>
                    {/* 그래프 추가 */}
                    {displayData.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 gap-4 my-4">
                                <Card>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <BarChart data={displayData
                                                .filter(item => ["특", "상", "중", "하"].includes(item.gName))
                                                .sort((a, b) => ["특", "상", "중", "하"].indexOf(a.gName) - ["특", "상", "중", "하"].indexOf(b.gName))
                                                .map(item => {
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

                            {/* 검색 결과 테이블 */}
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
                        </>
                    ) : (
                        <div className="text-center text-gray-500">조회된 데이터가 없습니다.<br/>선택하신 검색조건으로 조회된 데이터가 없습니다.<br/>다른 검색조건으로 조회해 주세요.</div>
                    )}
                </>
            )}
        </div>
    );
}
