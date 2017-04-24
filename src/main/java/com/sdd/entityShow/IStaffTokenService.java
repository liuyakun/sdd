package com.sdd.entityShow;


/**
 * Created by wh on 2016/3/11.
 */
public interface IStaffTokenService {

    /**
     * 通过userName 生成一个唯一的token
     * @param userName 用户名称
     * @return  加密后的唯一码
     */
    String generateToken(String userName);


    /**
     * 通过token 解析 StaffUserShow
     * @param token  登陆令牌
     * @return  StaffUserShow对象
     */
    UserShow loadToken(String token);

    /**
     * 保存token 及登陆信息
     * @param token 登陆令牌
     * @param staffUserShow  登陆信息
     * @param expireSeconds 保存时间
     * @return  状态码 0 成功  1 失败
     */
    int saveToken(String token, UserShow staffUserShow, long expireSeconds);


    /**
     * 销毁token
     * @param token  登陆令牌
     * @return  状态码  0 成功  1 失败
     */
    int eraseToken(String token);



}
