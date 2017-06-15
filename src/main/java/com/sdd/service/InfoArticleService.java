package com.sdd.service;


import com.sdd.entity.InfoArticle;
import com.sdd.entityShow.IInfoArticleService;
import com.sdd.entityShow.InfoArticleShow;
import com.sdd.entityVo.InfoArticleUtil;
import com.sdd.repository.InfoArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by chenhao on 2017/1/17.
 */
@Service
public class InfoArticleService implements IInfoArticleService {

    @Autowired
    private InfoArticleRepository infoArticleRepository;

    /**
     * 新增
     * @param show
     * @return 0失败
     */
    @Override
    public int add(InfoArticleShow show){
        InfoArticle infoArticle = InfoArticleUtil.show2InfoArticle(show);
        infoArticle.setCreateDate(new Date());
        Integer infoId = show.getInfoId();
        infoArticle.setIsEnable("1");

        try{
            InfoArticle save = infoArticleRepository.save(infoArticle);
            return save.getId();
        }catch (Exception e){
            return 0;
        }


    }

    /**
     * 更新
     * @param show
     * @return  1：成功  2  不存在
     */
    @Override
    public int update(InfoArticleShow show){
        InfoArticle one = infoArticleRepository.findOne(show.getId());
        if(one==null){
            return  2;
        }
        InfoArticle infoArticle = InfoArticleUtil.show2InfoArticle(show);
        infoArticle.setModifyDate(new Date());
        infoArticle.setCreateDate(one.getCreateDate());
        infoArticle.setCreateUser(one.getCreateUser());
        InfoArticle save = infoArticleRepository.save(infoArticle);
        return  1;
    }


    /**
     * 删除文章
     * @param id
     * @return  1成功  2 失败
     */
    @Override
    public int delete(Integer id){
        InfoArticle one = infoArticleRepository.findOne(id);
        if(one==null){
            return  2;
        }
        infoArticleRepository.delete(id);
        return 1;
    }


    /**
     * 通过id查询
     * @param id
     * @return
     */
    @Override
    public InfoArticleShow getById(Integer id){
        InfoArticle one = infoArticleRepository.findOne(id);
        if(one==null){
            return  null;
        }

        return InfoArticleUtil.infoArticle2Show(one);
    }


    /**
     * 分页查询
     * @param name
     * @param currentPage
     * @param pageSize
     * @return
     */
    @Override
    public PageImpl<InfoArticleShow> page(String name,Integer infoId,Integer currentPage, Integer pageSize){
        currentPage = (currentPage == null || currentPage <= 0)?1:currentPage;
        pageSize = (pageSize == null || pageSize <= 0)?10:pageSize;
        Pageable pageRequest = new PageRequest(currentPage-1,pageSize);
        Page<InfoArticle> page = infoArticleRepository.page(name,infoId, pageRequest);
        List<InfoArticle> content =    page.getContent();
        List<InfoArticleShow> shows = new ArrayList<>();
        for(InfoArticle infoArticle:content){
            InfoArticleShow show = InfoArticleUtil.infoArticle2Show(infoArticle);
            shows.add(show);
        }
        return new PageImpl<InfoArticleShow>(shows,pageRequest,page.getTotalElements());
    }

}
