import IconBandArtist from "../components/IconBandArtist"
import CardBand from "../components/CardBand"

const Catalog = () => {
  const repeatCount = 20;

  return (
    <div className="Catalog h-max flex flex-col">

      <div className="CatalogSearchFilter bg-neutral-100 flex justify-center">
        <div className="CatalogFilterBar p-4">
          <input type="search" placeholder="Search (artist/band)" />
        </div>
        <div className="flex space-x-6">
          <IconBandArtist type='band' title='All Groups' />
          <IconBandArtist type='band' title='Girl Groups' />
          <IconBandArtist type='band' title='Boy Groups' />
          <IconBandArtist type='artist' title='All Artists' />
          <IconBandArtist type='artist' title='Solo Artists' />
        </div>
      </div>

      <div className="CatalogMain flex-grow p-8">
        <div className="CatalogContent gap-4 grid grid-flow-row auto-rows-max" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
          {Array.from({ length: repeatCount }).map((_, index) => (
            <CardBand
              key={index}
              band="BTS"
              image="https://assets.teenvogue.com/photos/5a0b5dad0709a85e4898eec7/4:3/w_4552,h_3414,c_limit/Gettyimgs-688759646.jpg"
            />
          ))}
          {Array.from({ length: repeatCount }).map((_, index) => (
            <CardBand
              key={index}
              band="NewJeans"
              image="https://www.billboard.com/wp-content/uploads/2024/02/cover-new-jeans-billboard-2024-bb3-ssam-kim-group-3-1548.jpg"
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Catalog