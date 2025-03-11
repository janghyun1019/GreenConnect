package com.app.service.address.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.address.AddressDAO;
import com.app.dto.address.Address;
import com.app.service.address.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	AddressDAO addressDAO;

	@Override
	public List<Address> findAllByUserId(String userId) {
		List<Address> addressList = addressDAO.findAllByUserId(userId);
		return addressList;
	}

	@Override
	public Address findById(int id) {
		Address address = addressDAO.findById(id);
		return address;
	}

	@Override
	public int saveAddress(Address address) {
		int result = addressDAO.saveAddress(address);
		return result;
	}

	@Override
	public int updateAddress(Address address) {
		int result = addressDAO.updateAddress(address);
		return result;
	}

	@Override
	public int deleteAddress(int id) {
		int result = addressDAO.deleteAddress(id);
		return result;
	}

	@Override
	@Transactional
	public int updateAllSetDefaultFalse(String userId, int ExcludeAddressId) {
		int result = addressDAO.updateAllSetDefaultFalse(userId, ExcludeAddressId);
		Address address = addressDAO.findById(ExcludeAddressId);
		if (address != null) {
			address.setDefault(true);
			return addressDAO.updateAddress(address);
		}
		return result;
	}

}
