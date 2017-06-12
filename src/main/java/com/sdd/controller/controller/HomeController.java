package com.sdd.controller.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    /**
     * 静态页面处理程序
     * 主页面
     * @return 返回HTML静态页面
     */
    @RequestMapping(path={"/"}, method = RequestMethod.GET)
    public String forwardMain() {
        return "forward:/main.html";
    }

    /**
     * 静态页面处理程序
     * 主页面(内页面)
     * @return 返回HTML静态页面
     */
    @RequestMapping(path={"/web", "/web/**"}, method = RequestMethod.GET)
    public String forwardIndex() {
        return "forward:/index.html";
    }


    /**
     * 静态页面处理程序
     * 管理主页面
     * @return 返回HTML静态页面
     */
    @RequestMapping(path={"/mge/**"}, method = RequestMethod.GET)
    public String forwardMge() {
        return "forward:/indexMge.html";
    }

    /**
     * 静态页面处理程序
     * 管理主页面
     * @return 返回HTML静态页面
     */
    @RequestMapping(path={"/mge/login"}, method = RequestMethod.GET)
    public String loginMge() {
        return "forward:/viewMge/login.html";
    }
}
