package com.app.dto.admin;

import lombok.Data;

@Data
public class Admin {
	int userCount;
	double dailySales;
	double weeklySales;
	double monthlySales;
	int newUsers;
	int pendingReports;
	int transactionCount;
	String systemStatus;
}
