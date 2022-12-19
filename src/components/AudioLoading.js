import { Audio } from  'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { memo } from 'react';

const AudioLoading = () =>{
    return(
        <Audio
            height="24"
            width="24"
            color="white"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    )
}

export default memo(AudioLoading);