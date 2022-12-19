import {RotatingLines} from 'react-loader-spinner'
import { memo } from 'react';

const LoadingSong = ({width}) =>{
    return(
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width={width}
            visible={true}
        />
    )
}

export default memo(LoadingSong) ;