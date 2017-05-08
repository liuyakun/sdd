package com.sdd.entityVo;

import com.sdd.entity.User;
import com.sdd.entityShow.UserShow;

public class UserShowEx extends UserShow {
    public UserShowEx(User user){
        this.setId(user.getId());
        this.setName(user.getName());
        this.setAddress(user.getAddress());
        this.setPhone(user.getPhone());
        this.setStaffId(user.getStaffId());
    }
}
