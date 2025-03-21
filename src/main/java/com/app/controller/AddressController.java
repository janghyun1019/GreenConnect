package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.app.dto.address.Address;
import com.app.service.address.AddressService;

@Controller
@RequestMapping("/mypage/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Address>> getAddressesByUserId(@PathVariable String userId) {
        System.out.println("Received userId: " + userId);
        List<Address> addresses = addressService.findAllByUserId(userId);
        System.out.println("Returning addresses: " + addresses);
        return ResponseEntity.ok(addresses);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Address> getAddressById(@PathVariable int id) {
        Address address = addressService.findById(id);
        return ResponseEntity.ok(address);
    }

    @PostMapping
    public ResponseEntity<String> addAddress(@RequestBody Address address) {
        addressService.saveAddress(address);
        return ResponseEntity.ok("주소가 성공적으로 등록되었습니다.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateAddress(@PathVariable int id, @RequestBody Address address) {
        address.setAddrseeId(id);
        addressService.updateAddress(address);
        return ResponseEntity.ok("주소가 성공적으로 수정되었습니다.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable int id) {
        addressService.deleteAddress(id);
        return ResponseEntity.ok("주소가 성공적으로 삭제되었습니다.");
    }

    @PutMapping("/{userId}/default/{id}")
    public ResponseEntity<String> setDefaultAddress(@PathVariable String userId, @PathVariable int id) {
        addressService.updateAllSetDefaultFalse(userId, id);
        return ResponseEntity.ok("기본 주소가 변경되었습니다.");
    }
}