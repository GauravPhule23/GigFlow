class apiError extends Error { // structuring errors
  constructor(statusCode, message = "Something went wrong",errors=[]) {
   super(message)
   this.statusCode=statusCode
   this.errors = errors
   this.message=message
   this.data=null
   this.success=false
      
  }
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message, // This forces message to be included
      errors: this.errors,
      data: this.data,
      success: this.success
    }
  }
}

module.exports=apiError