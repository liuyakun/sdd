package com.hpe.article.util;

import com.hpe.article.InfoArticleShow;
import com.hpe.article.entity.InfoArticle;

/**
 * Created by chenhao on 2017/1/17.
 */
public class InfoArticleUtil {

    public static InfoArticle show2InfoArticle(InfoArticleShow show){
        InfoArticle infoArticle = new InfoArticle();
        infoArticle.setId(show.getId());
        infoArticle.setInfoId(show.getInfoId());
        infoArticle.setTitle(show.getTitle());
        infoArticle.setBigTitle(show.getBigTitle());
        infoArticle.setName(show.getName());
        infoArticle.setContent(show.getContent());
        infoArticle.setTdkDescription(show.getTdkDescription());
        infoArticle.setTdkKeyword(show.getTdkKeyword());
        infoArticle.setTdkTitle(show.getTdkTitle());
        infoArticle.setCreateDate(show.getCreateDate());
        infoArticle.setCreateUser(show.getCreateUser());
        infoArticle.setModifyDate(show.getModifyDate());
        infoArticle.setModifyUser(show.getModifyUser());
        infoArticle.setIsEnable(show.getIsEnable());
        return infoArticle;
    }

    public static InfoArticleShow infoArticle2Show(InfoArticle infoArticle){
        InfoArticleShow show = new InfoArticleShow();
        show.setId(infoArticle.getId());
        show.setInfoId(infoArticle.getInfoId());
        show.setTitle(infoArticle.getTitle());
        show.setBigTitle(infoArticle.getBigTitle());
        show.setName(infoArticle.getName());
        show.setContent(infoArticle.getContent());
        show.setTdkDescription(infoArticle.getTdkDescription());
        show.setTdkKeyword(infoArticle.getTdkKeyword());
        show.setTdkTitle(infoArticle.getTdkTitle());
        show.setCreateDate(infoArticle.getCreateDate());
        show.setCreateUser(infoArticle.getCreateUser());
        show.setModifyDate(infoArticle.getModifyDate());
        show.setModifyUser(infoArticle.getModifyUser());
        show.setIsEnable(infoArticle.getIsEnable());
        return show;
    }
}
