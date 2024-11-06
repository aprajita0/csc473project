
const CardBand = ({ band, image }) => {
    return (
        <div className="CardBand bg-neutral-100 border-black border-1 rounded-md relative drop-shadow-lg 
                        hover:scale-105 hover:drop-shadow-2xl
                        flex justify-center align-center w-full h-full">
            <a href="#">
                <img
                    src={image}
                    alt={band}
                    className="rounded-xl w-full h-full object-contain opacity-80"
                />
                <span className="absolute inset-0 flex items-center justify-center
                                font-black text-2xl text-neutral-100">{band}</span>
            </a>
        </div>
    )
}

export default CardBand