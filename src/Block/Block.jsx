import './block.css'

const colorPick = (num) => {
    if(num > 4)
        return "white";
    else
        return "grey";
}

const colorDrop = (num) =>{
    switch (num) {
        case 0: return "rgb(212, 204, 204)";
        case 2: return "rgb(239, 236, 236)";
        case 4: return "wheat";
        case 8: return "rgb(232, 175, 88)";
        case 16: return "coral";
        case 32: return "rgb(243, 95, 95)";
        case 64: return "rgb(223, 38, 38)";
        case 128: return "cornflowerblue";
        case 256: return "rgb(16, 225, 16)";
        case 512: return "rgb(24, 179, 24)";
        case 1024: return "rgb(16, 225, 141)";
        case 2048: return "rgb(17, 237, 226)";
    }
}

const Block = ({num}) =>{
    return(
        <div className='Block' style={{backgroundColor: colorDrop(num), color: colorPick(num)}}>
            {num !== 0 ? num : "" } 
        </div>
    )
}
export default Block;