package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.app.dto.address.Address;
import com.app.service.address.AddressService;

@Controller
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/{userId}")
    public List<Address> getAddressesByUserId(@PathVariable String userId) {
        return addressService.findAllByUserId(userId);
    }

    @GetMapping("/detail/{id}")
    public Address getAddressById(@PathVariable int id) {
        return addressService.findById(id);
    }

    @PostMapping
    public String addAddress(@RequestBody Address address) {
        addressService.saveAddress(address);
        return "주소가 성공적으로 등록되었습니다.";
    }

    @PutMapping("/{id}")
    public String updateAddress(@PathVariable int id, @RequestBody Address address) {
        address.setAddrseeId(id);
        addressService.updateAddress(address);
        return "주소가 성공적으로 수정되었습니다.";
    }

    @DeleteMapping("/{id}")
    public String deleteAddress(@PathVariable int id) {
        addressService.deleteAddress(id);
        return "주소가 성공적으로 삭제되었습니다.";
    }

    @PutMapping("/{userId}/default/{id}")
    public String setDefaultAddress(@PathVariable String userId, @PathVariable int id) {
        addressService.updateAllSetDefaultFalse(userId, id);
        return "기본 주소가 변경되었습니다.";
    }
}
