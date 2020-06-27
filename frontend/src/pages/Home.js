import React from "react";
import useInput from "../hooks/useInput";

const BASE_URL = 'http://localhost:5000/api/nearby-outlet/';

const Home = () => {

    const [location, InputLocationField] = useInput({ type: "text", extraprops : { parentClass : 'inputfield', placeHolder : 'Enter your location'}});
    
    const [locationButtonEnable, setLocationButtonEnable] = React.useState(false);
    
    const [messageContainer, setMessageContainer] = React.useState(null);

    const formValidation = (location) => {
        return location && location.length && (/\S/.test(location));
    }

    const handleLocationButtonClick = async () => {
        setLocationButtonEnable(false);
        try{
            const { status, data } = await (await fetch(BASE_URL.concat(encodeURI(location)))).json();
            setMessageContainer({msg : data.message, status });
        }catch(error){
            console.error(error);
        }finally{
            setLocationButtonEnable(true);
        }
    }

    React.useEffect(() => {
        setLocationButtonEnable(formValidation(location));
        setMessageContainer(null);
    }, [location]);

    return (
        <>
            <h1>Find Your Nearby Stores</h1>
            <center>
                {InputLocationField}
            </center>

            <button 
                disabled={!locationButtonEnable} 
                onClick = {handleLocationButtonClick}> 
                Get Nearby Store 
            </button>

            
            {messageContainer && 
                <div className = "m-10">
                    <span className = { messageContainer.status === 200 ? 'success' : 'error'}> {messageContainer.msg} </span>
                </div>
            }
            
        </>
    );
}

export default Home;