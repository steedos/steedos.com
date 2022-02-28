import { fetchGraphql } from '@/lib/base'

const QUERY_SITE_VIDEOS = `
{
    _id,
    slug,
    name,
    sort_no,
    description,
    videos: _related_site_videos_collection(sort: "sort_no"){
        _id,
        slug,
        name,
        sort_no,
        thumb_image,
        summary
      }
    
  }
`

export async function getVideos(){
    const query = `
        {
            site_videos_collections(sort: "sort_no")${QUERY_SITE_VIDEOS}
        }
    `
    const result = await fetchGraphql(query);
    let videos = null;

    if(result.data && result.data.site_videos_collections && result.data.site_videos_collections.length > 0){
        videos = result.data.site_videos_collections;
    }
    return videos;
}

export async function getVideo(slug){
    const query = `
        {
            site_videos(sort: "sort_no", filters:["slug","=", "${slug}"])
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
        }
    `
    const result = await fetchGraphql(query);

    let video = null;

    if(result.data && result.data.site_videos && result.data.site_videos.length > 0){
        video = result.data.site_videos[0];
    }
    return video;
}