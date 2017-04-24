package com.sdd.entityShow;


import org.springframework.data.domain.Page;

public interface IUserService {


    /**
     * 通过条件查询用户
     * @param id 用户id
     * @param name 名称
     * @param address 真实姓名
     * @param phone 用户手机号
     * @return 用户集合
     */
    Page<UserShow> findByKeys(Integer id, String name, String address, String phone, Integer currentPage, Integer pageSize)throws Exception;

    /**
     * 通过userName查询员工
     * @param userName 用户名
     * @return StaffUserShow对象
     */
    UserShow findByUserName(String userName);
}
