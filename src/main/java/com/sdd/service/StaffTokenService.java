package com.sdd.service;

import com.sdd.entityShow.IStaffTokenService;
import com.sdd.entityShow.UserShow;
import com.sdd.util.MD5;
import com.sdd.util.RandX;
import com.sdd.util.SessionRedis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffTokenService implements IStaffTokenService {

    private SessionRedis sessionRedis = null;
    @Autowired
    public void setSessionRedis(SessionRedis sessionRedis){ this.sessionRedis = sessionRedis; }


    /**
     * 通过userName 生成一个唯一的token
     * @param userName 用户名
     * @return 加密后的唯一码
     */
    @Override
    public String generateToken(String userName) {
        MD5 md5 = new MD5();
        //手机号码+时间戳+随机数 生成一个唯一的token
        String token = md5.getMD5ofStr(userName + System.currentTimeMillis()+ RandX.getRandom(4));
        return token;
    }

    /**
     * 通过token 解析 loginInfo
     * @param token 登陆令牌
     * @return loginInfo对象
     */
    @Override
    public UserShow loadToken(String token) {
        UserShow staffUserShow = (UserShow)sessionRedis.getSessionOfList(token);
        return staffUserShow;
    }

    /**
     * 保存token 及登陆信息
     * @param token         登陆令牌
     * @param staffUserShow     登陆信息
     * @param expireSeconds 保存时间
     * @return 状态码 0 成功  1 失败
     */
    @Override
    public int saveToken(String token, UserShow staffUserShow, long expireSeconds) {
        sessionRedis.saveSessionOfList(token, staffUserShow, expireSeconds);
        return 0;
    }

    /**
     * 销毁token
     * @param token 登陆令牌
     * @return 状态码  0 成功  1 失败
     */
    @Override
    public int eraseToken(String token) {
        boolean res = sessionRedis.delSessionAllOfList(token);
        if(res){
            return 0;
        }
        return 1;
    }

}
