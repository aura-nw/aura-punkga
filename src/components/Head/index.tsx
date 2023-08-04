import Head from 'next/head'

export default function HeadComponent({ title }: { title?: string }) {
  return (
    <Head>
      <title>{title || 'Punkga.me'}</title>
      <meta
        name='description'
        content="PUNKGA is a project with a focus on establishing a professional playground for Cyberpunk comic artists. Manga artists create NFTs and encourage community participation through sharing and engagement in the story. Users will have the opportunity to own unique digital artworks and actively contribute to the story's development in a positive manner."></meta>

      <meta itemProp='name' content={title || 'Punkga.me'}></meta>
      <meta
        itemProp='description'
        content="PUNKGA is a project with a focus on establishing a professional playground for Cyberpunk comic artists. Manga artists create NFTs and encourage community participation through sharing and engagement in the story. Users will have the opportunity to own unique digital artworks and actively contribute to the story's development in a positive manner."></meta>
      <meta itemProp='image' content='/assets/images/thumb.png'></meta>

      <meta property='og:url' content='https://docs.halotrade.zone'></meta>
      <meta property='og:type' content='website'></meta>
      <meta property='og:title' content={title || 'Punkga.me'}></meta>
      <meta
        property='og:description'
        content="PUNKGA is a project with a focus on establishing a professional playground for Cyberpunk comic artists. Manga artists create NFTs and encourage community participation through sharing and engagement in the story. Users will have the opportunity to own unique digital artworks and actively contribute to the story's development in a positive manner."></meta>
      <meta property='og:image' content='/assets/images/thumb.png'></meta>

      <meta name='twitter:card' content='summary_large_image'></meta>
      <meta name='twitter:title' content={title || 'Punkga.me'}></meta>
      <meta
        name='twitter:description'
        content="PUNKGA is a project with a focus on establishing a professional playground for Cyberpunk comic artists. Manga artists create NFTs and encourage community participation through sharing and engagement in the story. Users will have the opportunity to own unique digital artworks and actively contribute to the story's development in a positive manner."></meta>
      <meta name='twitter:image' content='/assets/images/thumb.png'></meta>
    </Head>
  )
}
