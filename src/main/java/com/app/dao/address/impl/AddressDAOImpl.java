package com.app.dao.address.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.address.AddressDAO;
import com.app.dto.address.Address;
@Repository
public class AddressDAOImpl implements AddressDAO{
	@Autowired
	SqlSessionTemplate sqlSessionTemplate;
	
	@Override
	public List<Address> findAllByUserId(String userId) {
		List<Address> addressList = sqlSessionTemplate.selectList("Address_mapper.findAllByUserId");
		return addressList;
	}

	@Override
	public Address findById(int id) {
		Address address=sqlSessionTemplate.selectOne("Address_mapper.findId");
		return address;
	}

	@Override
	public int saveAddress(Address address) {
		int result = sqlSessionTemplate.insert("Address_mapper.saveAddress",address);
		return result;
	}

	@Override
	public int updateAddress(Address address) {
		int result = sqlSessionTemplate.update("Address_mapper.updateAddress",address);
		return result;
	}

	@Override
	public int deleteAddress(int id) {
		int result = sqlSessionTemplate.delete("Address_mapper.deleteAddress",id);
		return result;
	}

	@Override
	public int updateAllSetDefaultFalse(String userId, int ExcludeAddressId) {
		Map<String,Object> params = new HashMap<>();
		params.put("userId", userId);
		params.put("ExcludeAddressId", ExcludeAddressId);
		return sqlSessionTemplate.update("Address_mapper.updateAllSetDefaultFalse",params);
	}

}
