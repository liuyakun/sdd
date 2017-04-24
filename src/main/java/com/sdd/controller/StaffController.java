package com.sdd.controller;

import com.sdd.controller.controller.BaseController;
import com.sdd.controller.controller.ObjectResult;
import com.sdd.entityShow.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Ryuak on 2017/4/24.
 */
@RestController
@RequestMapping("/api")
public class StaffController extends BaseController {
    private IStaffService staffService = null;
    @Autowired
    public void setStaffService(IStaffService staffService){this.staffService = staffService;}

    private IStaffTokenService staffTokenService;
    @Autowired
    public void setStaffTokenService(IStaffTokenService staffTokenService){ this.staffTokenService = staffTokenService;}

    private IUserService userService = null;
    @Autowired
    public void setUserService(IUserService userService){ this.userService = userService ;}


    /**
     * 通过用户名和密码登陆
     * @param staffValidate 登录信息（包括userName，password等）
     * @param response response请求
     * @return 登录信息
     */
    @RequestMapping(value="/staff/login",method = RequestMethod.POST)
    public ObjectResult login(@RequestBody StaffValidate staffValidate,
                              HttpServletResponse response){

        String username = staffValidate.getUsername();
        String password = staffValidate.getPassword();
        int flag = staffService.login(username, password);

        if(flag == 0){
            String token = staffService.generateToken(username);
            UserShow staffUserShow = userService.findByUserName(username);


            Cookie cookie = new Cookie("token_staff", token);
            int seconds = 60*60*24;  //1天的秒数
            cookie.setMaxAge(seconds);  //cookie默认保存1天
            cookie.setPath("/"); //设置路径，这个路径即该工程下都可以访问该cookie  // 如果不设置路径，那么只有设置该cookie路径及其子路径可以访问
            response.addCookie(cookie);
            staffTokenService.saveToken(token, staffUserShow, seconds);
            return  new ObjectResult("true",staffUserShow);
        }
        if(flag == 1){
            return new ObjectResult("false","用户名不存在");
        }
        if(flag == 2){
            return new ObjectResult("false","密码错误");
        }
        if(flag == 3){
            return new ObjectResult("false","用户已失效");
        }

        return new ObjectResult("false","登陆失败");
    }


    /**
     * 通过token登陆
     * @param token 登陆令牌
     */
    @RequestMapping(value="/staff/login/{token_staff}", method = RequestMethod.GET)
    public ObjectResult loginInfo(@PathVariable("token_staff") String token){
        UserShow userShow =  staffTokenService.loadToken(token);
        if(userShow != null){
            return  new ObjectResult("true",userShow);
        }
        return new ObjectResult("false","登陆失败（密码错误或用户已失效）");
    }

    /**
     * 通过token注销
     * @param token 登陆令牌
     * @return LoginResult对象
     */
    @RequestMapping(value="/staff/logout", method = RequestMethod.DELETE)
    public ObjectResult logout(HttpServletResponse response,@CookieValue(value="token_staff",required = false) String token){

        int flag = staffService.logout(token);
        if(flag == 0){
            Cookie cookie_token = new Cookie("token_staff", null);
            cookie_token.setMaxAge(0);
            cookie_token.setPath("/");
            response.addCookie(cookie_token);     // 清除cookie
            return new ObjectResult("true","注销成功");
        }
        return new ObjectResult("false","注销失败");
    }

    /**
     * 修改密码
     * @param sid 员工sid
     * @return
     */
    @RequestMapping(value="/staff/{sid}/pwd",method = RequestMethod.PUT)
    public ObjectResult modifyPasswordOfStaff(@PathVariable("sid")int sid,@RequestBody StaffValidate staffValidate,@CookieValue(value="token_staff",required = false) String token,
                                              HttpServletResponse response){

        UserShow loginInfo = staffTokenService.loadToken(token);
        if(loginInfo == null) {
            return new ObjectResult("false","token已过期，请重新登陆");
        }
        String modifyUserName = loginInfo.getName();

        int res = staffService.modifyPassword(staffValidate.getUsername(), staffValidate.getPassword(),modifyUserName);

        if(res == 1){
            return new ObjectResult("false","修改失败");
        }
        return new ObjectResult("true","修改成功");
    }

}
