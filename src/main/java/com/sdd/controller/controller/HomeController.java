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
    @RequestMapping(path={"/", "/web/**"}, method = RequestMethod.GET)
    public String forwardIndex() {
        return "forward:/index.html";
    }

}
