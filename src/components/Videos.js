import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { useVideoList } from '../Hooks/useVideoList';
import Video from './Video';

export default function Videos() {
    const [page, setPage] = useState(1);
    const { videos, loading, error, hasMore } = useVideoList(page);

    return (
        <div>
            {videos.length > 0 && (
                <InfiniteScroll
                    dataLength={videos.length}
                    hasMore={hasMore}
                    next={() => setPage(page + 6)}
                    loader='Loading.....'
                >
                    {videos.map((video) =>
                        video.noq > 0 ? (
                            <Link
                                to={`/quiz/${video.youtubeID}`}
                                state={video.title}
                                key={video.youtubeID}
                            >
                                <Video title={video.title} id={video.youtubeID} noq={video.noq} />
                            </Link>
                        ) : (
                            <Video
                                title={video.title}
                                noq={video.noq}
                                id={video.youtubeID}
                                key={video.youtubeID}
                            />
                        )
                    )}
                </InfiniteScroll>
            )}
            {!loading && videos.length === 0 && <div>No Data Found !</div>}
            {error && <div>There was an error !</div>}
            {loading && <div>Loading...</div>}
        </div>
    );
}
