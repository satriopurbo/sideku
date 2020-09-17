module.exports = (err, req, res, next) => {
    let status
    let message
    switch(err.name){
      case 'JsonWebTokenError':
        status = 400
        message = err.message
        break;
      default: 
        status = err.status || 500
        message = err.message || err.msg || 'Internal Server Error'
        break;
    }
    res.status(status).json({ code: status, message })
  }