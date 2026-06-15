package musicboxd.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import musicboxd.dto.response.MusicResponseDTO;
import musicboxd.dto.response.PlaylistResponseDTO;
import musicboxd.model.Playlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-15T04:35:28-0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class PlaylistMapperImpl implements PlaylistMapper {

    @Autowired
    private MusicMapper musicMapper;

    @Override
    public PlaylistResponseDTO toResponse(Playlist playlist) {
        if ( playlist == null ) {
            return null;
        }

        int playlistID = 0;
        String nomePlaylist = null;
        List<MusicResponseDTO> playlist1 = null;

        playlistID = playlist.getPlaylistID();
        nomePlaylist = playlist.getNomePlaylist();
        playlist1 = musicMapper.toResponseList( playlist.getPlaylist() );

        PlaylistResponseDTO playlistResponseDTO = new PlaylistResponseDTO( playlistID, nomePlaylist, playlist1 );

        return playlistResponseDTO;
    }

    @Override
    public List<PlaylistResponseDTO> toResponseList(List<Playlist> playlists) {
        if ( playlists == null ) {
            return null;
        }

        List<PlaylistResponseDTO> list = new ArrayList<PlaylistResponseDTO>( playlists.size() );
        for ( Playlist playlist : playlists ) {
            list.add( toResponse( playlist ) );
        }

        return list;
    }
}
