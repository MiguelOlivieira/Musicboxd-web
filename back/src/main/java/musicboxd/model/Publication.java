package musicboxd.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "publications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int publicationID;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;
    
    private int avaliacao;

    @Column(name = "is_like") 
    private boolean like;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "musica_id")
    private Music music;
}
