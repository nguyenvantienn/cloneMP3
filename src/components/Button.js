import { memo } from "react";


const Button = ({text , style}) =>{
    return (
        <button
            type='button'
            className={style ? style: 'py-1 px-4 rounede-l-full rounded-r-full border bg-transparent'}
        >
            {text}
        </button>
    )
}

export default memo(Button);