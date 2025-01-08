function Manifest() {}

export async function getServerSideProps({ res }) {
  res.write(
    JSON.stringify({
      name: 'PunkgaMe',
      short_name: 'PunkgaMe',
      description:
        'Read Manga online free, fast updated, officially licensed with high-quality translated chapters. Start reading now!',
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
      start_url: '/',
      display: 'standalone',
      theme_color: '#000',
      background_color: '#000',
    })
  )
  res.end()

  return {
    props: {},
  }
}

export default Manifest
