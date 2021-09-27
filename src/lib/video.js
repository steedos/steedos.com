import { fetchGraphql } from '@/lib/base'

const QUERY_SITE_VIDEOS = `
{
    _id,
    body,
    download_url,
    duration,
    hls_url,
    is_free,
    name,
    owner,
    published_at,
    site,
    summary,
    slug,
    subtitles_url,
    thumb_image,
    owner__expand{
        name
    }
  }
`

export async function getVideos(){
    const query = `
        {
            site_videos ${QUERY_SITE_VIDEOS}
        }
    `
    const result = await fetchGraphql(query);

    let videos = null;

    if(result.data && result.data.site_videos){
        videos = result.data.site_videos;
    }
    return videos;
}

export async function getVideo(slug){
    const query = `
        {
            site_videos(filters:["slug","=", "${slug}"])${QUERY_SITE_VIDEOS}
        }
    `
    const result = await fetchGraphql(query);

    let video = null;

    if(result.data && result.data.site_videos && result.data.site_videos.length > 0){
        video = result.data.site_videos[0];
    }
    return video;
}