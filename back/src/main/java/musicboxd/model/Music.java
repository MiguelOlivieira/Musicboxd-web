package musicboxd.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "musicas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Music {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int musicaID;
    
    @Column(nullable = false)
    private String nomeMusica;
    
    @Column(nullable = false)
    private String artista;
    
    private String genero;
    
    private String album;

    @OneToMany(mappedBy = "music", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Publication> publications;

    @ManyToMany(mappedBy = "playlist", fetch = FetchType.LAZY)
    private List<Playlist> playlistsQueContemEstaMusica;
}
