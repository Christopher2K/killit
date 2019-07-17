import PrismicDom from 'prismic-dom'

export enum ProjectType {
  IDENTITY = 'Identité visuelle',
  EDITION = 'Édition',
  DIGITAL = 'Digital',
  PHOTO = 'Photo'
}

export type Project = {
  uid: string
  title: string
  type: ProjectType
  order: string
  year: string
  description: {
    fr: string
    en: string
  }
  mainImage: string
  images: string[]
  miniatures: string[]
  embededVideos: string[]
}

export function fromDocumentToProject (rawData: any): Project {
  const { uid, data } = rawData
  return {
    uid,
    title: data.title[0].text,
    type: data.type,
    order: data.classement,
    description: {
      fr: PrismicDom.RichText.asHtml(data.description_fr),
      en: PrismicDom.RichText.asHtml(data.description_en)
    },
    year: data.date.split('-')[0],
    mainImage: data.image_principale.url,
    images: data.images.map((img: any) => img.image.url),
    miniatures: data.miniatures.map((img: any) => img.miniature.url),
    embededVideos: data.videos_links.map((video: any) => video.video_link.url)
  }
}
