package com.api.dto;



public class ErrorDTO {

    private String msg;
    private Boolean flag;
    private int httpStatus;


    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Boolean getFlag() {
        return flag;
    }

    public void setFlag(Boolean flag) {
        this.flag = flag;
    }

    public int getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(int httpStatus) {
        this.httpStatus = httpStatus;
    }


    @Override
    public String toString() {
        return "ErrorDTO{" +
                "msg='" + msg + '\'' +
                ", flag=" + flag +
                ", httpStatus=" + httpStatus +
                '}';
    }
}
