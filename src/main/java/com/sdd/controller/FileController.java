package com.sdd.controller;

import com.sdd.controller.controller.ObjectResult;
import com.sdd.entity.InfoArticle;
import com.sdd.repository.InfoArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Date;
import java.util.Random;

/**
 * 文件上传下载
 */

@RestController
@RequestMapping(value = "/api")
public class FileController {

    @Autowired
    private InfoArticleRepository infoArticleRepository;

    /**
     * 上传项目
     * @param id 项目信息ID
     * @param files 上传文件集合
     * @param request 客户对请求对象
     * @return ObjectResult对象
     */
    @RequestMapping(value = "/project/{id}/file", method= RequestMethod.POST)
    public ObjectResult uploadFile(@PathVariable("id") int id,
                                   @RequestParam(value = "file", required = false) MultipartFile[] files,
                                   HttpServletRequest request) {
        //设置相对路径
        String realPath = request.getSession().getServletContext().getRealPath("/upload");
        File f = new File(realPath);
        String filePath = "";
        try{
            if(null != files && files.length > 0){
                //遍历并保存文件
                for(MultipartFile file : files){
                    String fileName = file.getOriginalFilename();
                    String currentData = String.valueOf(new Date().getTime());
                    String radomInt = String.valueOf(new Random().nextInt(999999));
                    String fileType=fileName.substring(fileName.indexOf(".")+1, fileName.length());
                    String fileNameRandom = currentData + radomInt + "." + fileType;
                    String uploadPath = realPath + File.separator + fileNameRandom;
                    if(filePath.equals("")){
                        filePath = fileNameRandom;
                    }else{
                        filePath = filePath + "&" + fileNameRandom;
                    }

                    if(!f.exists()) {
                        f.mkdir();
                    }
                    file.transferTo(new File(uploadPath));
                }
            }else{
                return  new ObjectResult("false","上传失败");
            }

            InfoArticle infoArticle = infoArticleRepository.findOne(id);
            if (infoArticle == null) {
                return  new ObjectResult("false","上传失败");
            }
            infoArticle.setFilePath(filePath);
            infoArticleRepository.save(infoArticle);
            return  new ObjectResult("true","上传成功");
        }catch (Exception e){
            return  new ObjectResult("false","上传失败");
        }
    }



}
