package com.sdd.controller;

import com.sdd.controller.controller.ObjectResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;

/**
 * 文件上传下载
 */

@RestController
@RequestMapping(value = "/api")
public class FileController {

    /**
     * 上传项目
     * @param id 项目信息ID
     * @param file 上传文件
     * @param request 客户对请求对象
     * @return ObjectResult对象
     */
    @RequestMapping(value = "/project/{id}/file", method= RequestMethod.POST)
    public ObjectResult uploadFile(@PathVariable("id") int id,
                            @RequestParam (value="file",required = false) MultipartFile file,
                            HttpServletRequest request) {
        //设置相对路径
        String realPath = request.getSession().getServletContext().getRealPath("/upload");
        //获取文件的格式
        String extention = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
        File f = new File(realPath);
        String fileName = file.getOriginalFilename();
        String uploadPath = realPath + File.separator + fileName;
        if(!f.exists()) {
            f.mkdir();
        }
        try{
            file.transferTo(new File(uploadPath));
            return  new ObjectResult("true","上传成功");
        }catch (Exception e){
            return  new ObjectResult("false","上传失败");
        }

        /*Upload upload = new Upload();
        upload.setFileName(fileName);
        upload.setFileLength(String.valueOf(file.getSize()));
        upload.setFileOwner(super.getLoginUser(request).getLoginId());
        upload.setFilePath("/upload/" + fileName);
        fileQueryService.saveFile(upload);*/
    }

}
