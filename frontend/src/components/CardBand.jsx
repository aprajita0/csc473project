
const CardBand = ({ groupName, image }) => {
    return (
        <div className="CardBand p-4 bg-neutral-100 border-black rounded-md drop-shadow-lg 
                        hover:brightness-90 hover:scale-105 ease-in-out duration-200
                        flex justify-center align-center">
            <a href="" className="drop-shadow-md">
                <img
                    src={image}
                    alt={groupName}
                    className="rounded-xl opacity-80"
                />
                <span className="absolute inset-0 flex items-center justify-center
                                font-black text-2xl text-neutral-100 
                                hover:underline">{groupName}</span>
            </a>
        </div>
    )
}

export default CardBand