package com.app.dao.address;

import java.util.List;

import com.app.dto.address.Address;

public interface AddressDAO {
	List<Address> findAllByUserId(String userId);
	Address findById(int id);
	int saveAddress(Address address);
	int updateAddress(Address address);
	int deleteAddress(int id);
	int updateAllSetDefaultFalse(String userId, int ExcludeAddressId);
}
