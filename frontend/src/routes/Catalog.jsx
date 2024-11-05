import IconBand from "../components/IconBand"
import IconArtist from "../components/IconArtist"
import CardBand from "../components/CardBand"

const Catalog = () => {
  const repeatCount = 20;

  return (
    <div className="catalog h-dvh flex">
      <div className="catalog-side-bar bg-neutral-100 place-content-center p-4 space-y-4">
        <IconBand title={'All Groups'} />
        <IconBand title={'Girl Groups'} />
        <IconBand title={'Boy Groups'} />
        <IconArtist title={'All Artists'} />
        <IconArtist title={'Solo Artists'} />
      </div>

      <div className="catalog-main">
        <div className="CatalogFilterBar">
          <input type="search" placeholder="Search (artist/band)" />
        </div>
        <div className="catalog-content p-4 grid grid-cols-5 gap-4">
          {Array.from({ length: repeatCount }).map((_, index) => (
            <CardBand
              key={index}
              band="BTS"
              image="https://assets.teenvogue.com/photos/5a0b5dad0709a85e4898eec7/4:3/w_4552,h_3414,c_limit/Gettyimgs-688759646.jpg"
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Catalog