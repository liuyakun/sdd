package com.sdd.util;

import java.util.Random;

/**
 * Random string
 */
public class RandX {
    public static String getRandom(int length){

        /**
         * 生成随机数(包含数字和字母)
         * @param length 随机数长度
         * @return 随机数
         */
        StringBuffer buffer = new StringBuffer("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
        StringBuffer saltStr = new StringBuffer();
        Random random = new Random();
        int range = buffer.length();

        for(int i = 0;i < length;i++){
            saltStr.append(buffer.charAt(random.nextInt(range)));
        }

        return saltStr.toString();
    }

    /**
     * 生成随机数(纯数字)
     * @param length 随机数长度
     * @return 随机数
     */
    public static String getRandomNum(int length){

        StringBuffer buffer = new StringBuffer("0123456789");
        StringBuffer saltStr = new StringBuffer();
        Random random = new Random();
        int range = buffer.length();

        for(int i = 0;i < length;i++){
            saltStr.append(buffer.charAt(random.nextInt(range)));
        }

        return saltStr.toString();
    }
}
