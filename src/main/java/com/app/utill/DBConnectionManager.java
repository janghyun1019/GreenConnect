package com.app.utill;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBConnectionManager {

    private static final String DB_URL = "jdbc:oracle:thin:@localhost:1521:orcl";
    private static final String DB_USER = "scott";
    private static final String DB_PASSWORD = "tiger";

    // DB 연결 메서드
    public static Connection connectDB() {
        Connection conn = null;
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            conn.setAutoCommit(false); // 자동 커밋 해제 (트랜잭션 관리)
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }

    // DB 연결 해제 메서드 (트랜잭션 처리 포함)
    public static void disconnectDB(Connection conn, PreparedStatement psmt, ResultSet rs, boolean isCommit) {
        try {
            if (conn != null) {
                if (isCommit) {
                    conn.commit(); // 정상 실행 시 커밋
                } else {
                    conn.rollback(); // 오류 발생 시 롤백
                }
            }

            if (rs != null) rs.close();
            if (psmt != null) psmt.close();
            if (conn != null) conn.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
