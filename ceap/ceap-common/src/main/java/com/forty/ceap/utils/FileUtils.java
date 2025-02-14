package com.forty.ceap.utils;

public class FileUtils {
    public static String getFileExtension(String fileName) {
        String[] fileTypeSplit = fileName.split("\\.");
        return fileTypeSplit[fileTypeSplit.length - 1].toLowerCase();
    }

    public static String convertFileSize(long size) {
        if (size <= 0) {
            return "0 B";
        }

        String[] units = new String[]{"B", "KB", "MB", "GB", "TB"};
        int unitIndex = 0;

        double fileSize = (double) size;

        // 逐级转换，直到文件大小小于1024
        while (fileSize >= 1024 && unitIndex < units.length - 1) {
            fileSize /= 1024;
            unitIndex++;
        }

        // 格式化输出，一般保留两位小数
        return String.format("%.2f %s", fileSize, units[unitIndex]);
    }

}
