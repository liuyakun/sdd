package com.sdd.entityShow;

public interface IStaffService {

    /**
     * 员工登陆
     * @param username  用户名
     * @param password  密码
     * @return  状态码 0 成功  1 用户名不存在  2 密码错误
     */
    int login(String username, String password);


    /**
     * 员工注销
     * @param token  登陆令牌
     * @return 状态码 0 成功  1 失败
     */
    int logout(String token);


    /**
     * 通过username 生成一个唯一的token（用户验证登陆状态，注销）
     * @param username 用户名
     * @return  加密后的唯一码（token）
     */
    String generateToken(String username);


    /**
     * 通过员工Id删除员工
     * @param id 员工id
     * @return 是否删除成功：0成功，1失败
     */
    int removeStaff(Integer id);


    /**
     * 新增员工账号
     * @param StaffValidate
     * @return
     */
    int addStaff(StaffValidate StaffValidate);


    /**
     * 修改密码
     * @param userName 员工用户名
     * @param password 新密码
     * @return 修改后的StaffShow对象
     */
    int modifyPassword(String userName, String password, String modifyUserName);

    /**
     * 通过员工Id删除员工
     * @param userName 员工用户名
     * @return 是否删除成功：0成功，1失败
     */
    int removeStaff(String userName);


    int addStaff(String username, String password, String createName);

}
