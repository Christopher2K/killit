import PrismicDom from 'prismic-dom'

export enum ProjectType {
  IDENTITY = 'Identité visuelle',
  EDITION = 'Édition',
  DIGITAL = 'Digital',
  PHOTO = 'Photo'
}

export enum MainImageAlignment {
  top = 'top',
  center = 'center',
  bottom = 'bottom'
}

export type Project = {
  uid: string
  title: string
  type: ProjectType
  order: number
  year: string
  description: {
    fr: string
    en: string
  }
  mainImage: {
    url: string
    alignment: MainImageAlignment
  }
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
    mainImage: {
      url: data.image_principale.url,
      alignment: data.image_principale_alignement
    },
    images: data.images.map((img: any) => img.image.url),
    miniatures: data.miniatures.map((img: any) => img.miniature.url),
    embededVideos: data.videos_links.map((video: any) => video.video_link.url)
  }
}

export function byClassment (a: Project, b: Project): number {
  if (a.order < b.order) {
    return 1
  } if (a.order > b.order) {
    return -1
  } else {
    return 0
  }
}
