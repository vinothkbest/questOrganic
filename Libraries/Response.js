class Response{
    static success(response, code, data="", message=""){
        return  response.status(code).json({
            data,message, status: true
        })
    }
    static failure(response, code, errors="", message=""){
        return  response.status(code).json({
            errors,message, status: false
        })
    }
    static checker(response, status){
        return  response.status(200).json({
            message, status
        })
    }
}

module.exports = Response;