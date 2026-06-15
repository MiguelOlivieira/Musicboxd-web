package musicboxd.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import musicboxd.dto.response.UserResponseDTO;
import musicboxd.model.User;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-15T03:51:02-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.19 (Microsoft)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponseDTO toResponse(User user) {
        if ( user == null ) {
            return null;
        }

        String name = null;
        String username = null;

        name = user.getNome();
        username = user.getEmail();

        String id = String.valueOf(user.getUsuarioID());
        String avatar = "";
        Integer followers = 0;
        Integer following = 0;
        Boolean isFollowing = false;

        UserResponseDTO userResponseDTO = new UserResponseDTO( id, name, username, avatar, followers, following, isFollowing );

        return userResponseDTO;
    }

    @Override
    public List<UserResponseDTO> toResponseList(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserResponseDTO> list = new ArrayList<UserResponseDTO>( users.size() );
        for ( User user : users ) {
            list.add( toResponse( user ) );
        }

        return list;
    }
}
