import Alert from "@mui/material/Alert";

const AlertError = (props)=> {
    const {status,message,errors} = props;
    if(status==false)
    {
        if(errors)
            {
                 return errors.map((error)=>{
                    return <Alert variant="outlined" severity="error" className="margin-top-2">
          {error}
        </Alert>
                })
            }
            
        return <Alert variant="outlined" severity="error" className="margin-top-2">
          {message}
        </Alert>
    }
    else
    return null;
}

export default AlertError;