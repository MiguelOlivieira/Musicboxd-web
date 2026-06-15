package musicboxd.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import musicboxd.dto.response.MusicResponseDTO;
import musicboxd.dto.response.PublicationResponseDTO;
import musicboxd.dto.response.UserResponseDTO;
import musicboxd.model.Publication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-15T04:35:29-0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class PublicationMapperImpl implements PublicationMapper {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private MusicMapper musicMapper;

    @Override
    public PublicationResponseDTO toResponse(Publication publication) {
        if ( publication == null ) {
            return null;
        }

        MusicResponseDTO album = null;
        int rating = 0;
        String review = null;
        int likes = 0;
        UserResponseDTO user = null;

        album = musicMapper.toResponse( publication.getMusic() );
        rating = publication.getAvaliacao();
        review = publication.getDescricao();
        likes = booleanToInt( publication.isLike() );
        user = userMapper.toResponse( publication.getUser() );

        String id = String.valueOf(publication.getPublicationID());
        int comments = 0;
        String timestamp = getCurrentTimestamp();

        PublicationResponseDTO publicationResponseDTO = new PublicationResponseDTO( id, user, album, rating, timestamp, review, likes, comments );

        return publicationResponseDTO;
    }

    @Override
    public List<PublicationResponseDTO> toResponseList(List<Publication> publications) {
        if ( publications == null ) {
            return null;
        }

        List<PublicationResponseDTO> list = new ArrayList<PublicationResponseDTO>( publications.size() );
        for ( Publication publication : publications ) {
            list.add( toResponse( publication ) );
        }

        return list;
    }
}
