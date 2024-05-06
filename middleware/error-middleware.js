//sab error ek hi file me toh smjh ayega error kha se ara he
const errorMiddleware=(err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.message || "BACKEND ERROR";
    const extraDetails=err.extraDetails || "Error from Backend details"
    return res.status(status).json({message,extraDetails});
}
module.exports=errorMiddleware;