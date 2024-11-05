
const CardBand = ({ band, image }) => {
    return (
        <div className="CardBand w-32 h-24 border-black border-1 rounded-md relative drop-shadow-lg 
                        hover:scale-125 hover:drop-shadow-2xl">
            <a href="#">
                <img
                    src={image}
                    alt={band}
                    className="rounded-xl w-full h-full object-contain opacity-80"
                />
                <span className="absolute inset-0 flex items-center justify-center font-bold text-2xl text">{band}</span>
            </a>
        </div>
    )
}

export default CardBand