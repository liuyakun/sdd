package com.sdd.entityShow;

import java.io.Serializable;

public class UserShow implements Serializable {
    private Integer id;
    private String name;
    private String address;
    private String phone;
    private Integer staffId;

    public UserShow() {
    }

    public UserShow(String name, String address, String phone,Integer staffId) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.staffId = staffId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getStaffId() {
        return staffId;
    }

    public void setStaffId(int staffId) {
        this.staffId = staffId;
    }
}
