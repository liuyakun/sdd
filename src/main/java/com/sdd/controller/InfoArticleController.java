package com.sdd.controller;

import com.sdd.controller.controller.ObjectResult;
import com.sdd.entityShow.IInfoArticleService;
import com.sdd.entityShow.InfoArticleShow;
import com.sdd.entityShow.UserShow;
import com.sdd.util.SessionRedis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 新闻管理
 */
@RestController
@RequestMapping(value = "/api")
public class InfoArticleController {
    @Autowired
    private SessionRedis sessionRedis;

    @Autowired
    private IInfoArticleService iInfoArticleService;


    /**
     * 新增
     *
     * @param show
     * @param token
     * @return
     */
    @RequestMapping(value = "/infoArticle", method = RequestMethod.POST)
    public ObjectResult add(@RequestBody InfoArticleShow show,
                            @CookieValue(value = "token_staff", required = false) String token) {
        UserShow staffUserShow = (UserShow) sessionRedis.getSessionOfList(token);
        String username = "--";
        if (staffUserShow != null) {
            username = staffUserShow.getName();
        }
        show.setCreateUser(username);
        int add = iInfoArticleService.add(show);
        if(add!=0){
            return  new ObjectResult("true",add);
        }
        return  new ObjectResult("false","新增失败");
    }

    /**
     * 修改
     * @param show
     * @param token
     * @return
     */
    @RequestMapping(value = "/infoArticle", method = RequestMethod.PUT)
    public ObjectResult update(@RequestBody InfoArticleShow show,
                            @CookieValue(value = "token_staff", required = false) String token) {
        UserShow staffUserShow = (UserShow) sessionRedis.getSessionOfList(token);
        String username = "--";
        if (staffUserShow != null) {
            username = staffUserShow.getName();
        }
        show.setModifyUser(username);
        int update = iInfoArticleService.update(show);
        if(update==1){
            return  new ObjectResult("true","修改成功");
        }
        return  new ObjectResult("false","修改失败");
    }


    /**
     * 删除
     * @param id
     * @param token
     * @return
     */
    @RequestMapping(value = "/infoArticle/{id}", method = RequestMethod.DELETE)
    public ObjectResult delete(@PathVariable("id")Integer id,
                               @CookieValue(value = "token_staff", required = false) String token,
                                HttpServletRequest request) {
        int delete = iInfoArticleService.delete(id,request);
        if(delete==1){
            return  new ObjectResult("true","删除成功");
        }
        return  new ObjectResult("false","删除失败");
    }

    /**
     * 查询
     * @param id
     * @param token
     * @return
     */
    @RequestMapping(value = "/infoArticle/{id}", method = RequestMethod.GET)
    public ObjectResult getById(@PathVariable("id")Integer id,
                               @CookieValue(value = "token_staff", required = false) String token) {
        InfoArticleShow byId = iInfoArticleService.getById(id);
        return  new ObjectResult("true",byId);
    }


    /**
     * 分页查询
     * @param name  名称
     * @param infoId
     * @param currentPage
     * @param pageSize
     * @param token
     * @param response
     * @return
     */
    @RequestMapping(value = "/infoArticle/page", method = RequestMethod.GET)
    public ObjectResult page(@RequestParam(value = "name", required = false) String name,
                             @RequestParam(value = "infoId", required = false) Integer infoId,
                             @RequestParam(value = "typeId", required = false) Integer typeId,
                             @RequestParam(value = "twoTypeId", required = false) Integer twoTypeId,
                             @RequestParam(value = "currentPage", required = false) Integer currentPage,
                             @RequestParam(value = "pageSize", required = false) Integer pageSize,
                             @CookieValue(value = "token_staff", required = false) String token,
                             HttpServletResponse response) {
        PageImpl<InfoArticleShow> page = iInfoArticleService.page(name,infoId, typeId,twoTypeId,currentPage, pageSize);
        response.addHeader("Page", String.valueOf(page.getNumber() + 1));
        response.addHeader("Page-Count", String.valueOf(page.getTotalPages()));
        return new ObjectResult("true", page.getContent());
    }
}
