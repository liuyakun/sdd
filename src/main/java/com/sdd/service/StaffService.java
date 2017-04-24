package com.sdd.service;

import com.sdd.entity.StaffAccount;
import com.sdd.entityShow.IStaffService;
import com.sdd.entityShow.StaffValidate;
import com.sdd.repository.StaffAccountRepository;
import com.sdd.util.MD5;
import com.sdd.util.RandX;
import com.sdd.util.SessionRedis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Created by Ryuak on 2017/4/24.
 */
@Service
public class StaffService implements IStaffService {
    private SessionRedis sessionRedis = null;
    @Autowired
    public  void setSessionRedis(SessionRedis sessionRedis){this.sessionRedis = sessionRedis;}

    private StaffAccountRepository staffAccountRepository = null;
    @Autowired
    public void setStaffAccountRepository(StaffAccountRepository staffAccountRepository){this.staffAccountRepository = staffAccountRepository;}

    /**
     * 验证账号密码
     * @param username 用户名
     * @param password 密码
     * @return  状态码 0：验证成功   1，用户名不存在  2，密码错误 3，用户已失效
     */
    @Override
    public int login(String username, String password) {
        StaffAccount staffaccount = staffAccountRepository.findByUsername(username);
        if(staffaccount == null){
            return 1;
        }

        if(staffaccount.getIsEnable() == '0'){
            return 3;
        }

        MD5 md5 = new MD5();
        if(staffaccount.getSalt() == null) staffaccount.setSalt("");
        String md5Password = md5.getMD5ofStr(password + staffaccount.getSalt());
        if(staffaccount.getPassword().equals(md5Password)){
            return 0;
        }

        return 2;
    }

    /**
     * 销毁token
     * @param token 登陆令牌
     * @return 状态码  0 成功  1 失败
     */
    @Override
    public int logout(String token) {
        boolean res = sessionRedis.delSessionAllOfList(token);
        if(res){
            return 0;
        }
        return 1;
    }

    /**
     * 通过userName 生成一个唯一的token
     *
     * @param userName 手机号
     * @return 加密后的唯一码
     */
    @Override
    public String generateToken(String userName) {
        MD5 md5 = new MD5();
        //手机号码+时间戳+随机数 生成一个唯一的token
        String token = md5.getMD5ofStr(userName + System.currentTimeMillis() + RandX.getRandom(4));

        return token;
    }

    /**
     *
     * @param id 员工id
     * @return 是否删除成功：0成功，1失败
     */
    @Override
    public int removeStaff(Integer id) {
        StaffAccount staffAccount = staffAccountRepository.findOne(id);
        if(staffAccount == null){
            return 1;
        }
        staffAccountRepository.delete(id);
        return 0;
    }

    /**
     * 添加员工
     *
     * @param StaffValidate 员工信息
     * @return 是否添加成功：0添加成功，1添加失败，-1员工已存在
     */
    @Override
    public int addStaff(StaffValidate StaffValidate) {
        try {
            StaffAccount curStaffAccount = staffAccountRepository.findByUsername(StaffValidate.getUsername());
            if (curStaffAccount != null) {
                return -1;
            }
            MD5 md5 = new MD5();
            String salt = RandX.getRandom(4);
            String md5Password = md5.getMD5ofStr(StaffValidate.getPassword() + salt);

            StaffAccount staffAccount = new StaffAccount();
            staffAccount.setUsername(StaffValidate.getUsername());
            staffAccount.setPassword(md5Password);
            staffAccount.setSalt(salt);
            staffAccount.setRegistTime(new Date());
            staffAccount.setIsEnable('1');
            staffAccountRepository.save(staffAccount);

            return 0;
        }catch (Exception e){
            return 1;
        }
    }

    /**
     * 修改密码
     *
     * @param userName 员工用户名
     * @param password 新密码
     * @return 是否修改成功：0成功，1失败
     */
    @Override
    public int modifyPassword(String userName, String password, String modifyUserName) {
        StaffAccount curStaffAccount = staffAccountRepository.findByUsername(userName);
        if(curStaffAccount == null){
            return 1;
        }
        MD5 md5 = new MD5();
        String salt = RandX.getRandom(4);
        String md5Password = md5.getMD5ofStr(password+salt);

        curStaffAccount.setPassword(md5Password);
        curStaffAccount.setModifyDate(new Date());
        curStaffAccount.setModifyUser(modifyUserName);
        curStaffAccount.setSalt(salt);
        StaffAccount resStaffAccount = staffAccountRepository.save(curStaffAccount);
        if(resStaffAccount != null){
            return 0;
        }
        return 1;
    }

    @Override
    public int removeStaff(String userName) {
        return 0;
    }

    @Override
    public int addStaff(String username, String password, String createName) {
        return 0;
    }
}
