const asynchandler = (requestedHandler) => {
    (req , res , next) => { Promise.resolve(requestedHandler(req , res , next)).catch((err) => next(err));}
}

export default asynchandler;
//const asynchandler = () => {}
// const asynchandler = (fun) => () => {}
// const asynchandler = (fun) => async () => {}
/*
const asyncehandler = (fun) => async (req , res , next) => {

    try{
await fun(req , res , next);
    }catch(error)
    {
error.status(error.status || 500).json({message : error.message , success : false});
    }


}


*/