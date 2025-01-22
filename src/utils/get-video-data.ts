interface VideoData {
  provider: 'youtube' | 'vimeo' | 'shortcode';
  id: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export function parseVimeoUrl(vimeoStr: string): VideoData | null {
  const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/;
  const match = vimeoStr.match(vimeoRegex);
  return match ? { 
    provider: 'vimeo', 
    id: match[1] 
  } : null;
}

export function parseYouTubeUrl(youtubeStr: string): VideoData | null {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = youtubeStr.match(youtubeRegex);
  return match ? { 
    provider: 'youtube', 
    id: match[1] 
  } : null;
}

export default function getVideoData(videoUrl: string): VideoData | null {
    let videoData: VideoData | null = null;

    if (/youtube|youtu\.be|y2u\.be|i.ytimg\./.test(videoUrl)) {
        videoData = parseYouTubeUrl(videoUrl);
    } else if (/vimeo/.test(videoUrl)) {
        videoData = parseVimeoUrl(videoUrl);
    } else if (/\.mp4/.test(videoUrl)) {
        videoData = {
            provider: 'shortcode',
            id: videoUrl,
        };
    }
    return videoData;
}
